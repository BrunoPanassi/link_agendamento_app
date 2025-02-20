import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';
import { Professional } from '~/types/professional';
import { getPersonByIds } from '~/services/personManager';

interface JsonData {
  data: Professional[];
}

// Caminho para o arquivo JSON
const filePath = path.join(process.cwd(), 'server/db/professional.json');

// Função para carregar o JSON
const loadJson = (): JsonData => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo JSON não encontrado');
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as JsonData;
};

const loadJsonByIds = async (ids: number[]) => {
  const data = loadJson()
  const personData = await getPersonByIds(ids)
  let professionals;
  if (personData?.data && data) {
    professionals = data.data
    .filter(p => ids.includes(p.personId))
    .map(p => {
      const person = personData.data.find(person => person.id == p.personId)
      return {
        ...p,
        id: person?.id,
        name: person?.name ?? "",
        phoneNumber: person?.phoneNumber ?? ""
      }
    })
  }
  return professionals
}

const loadJsonByPersonIdAndPassword = (personId: number, password: string) => {
    const professionalData = loadJson()
    return professionalData.data.find(p => p.personId == personId && p.password == password)
}

const loadJsonIfPersonIdDoNotExists = (personId: number) => {
  const professionalData = loadJson()
  if (professionalData.data.some(p => p.personId == personId))
    return null
  return professionalData
}

const saveJson = (data: JsonData) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  
  switch (method) {
    case 'GET': {
      const query = getQuery(event)
      let jsonData;
      const personId = query.personId as number
      const password = query.password as string
      if (personId && password) {
        jsonData = loadJsonByPersonIdAndPassword(personId, password)
      }

      const ids = query.ids as number[]
      if (ids) {
        jsonData = loadJsonByIds(ids)
      }

      if (jsonData)
          return { status: 200, success: true, data: jsonData, message: null };
      return { status: 400, success: false, data: null, message: "Profissional não encontrado"}
    }

    case 'POST': {
      const body = await readBody(event);
      const newItem: Professional = body.item;

      if (!newItem) {
        throw new Error('Nenhum item fornecido');
      }

      if (!newItem.personId)
        throw new Error('Necessário a informação da pessoa');

      let jsonData = loadJsonIfPersonIdDoNotExists(newItem.personId)
      if (jsonData && newItem.personId) {
        jsonData.data.push(newItem)
        saveJson(jsonData)
      } else {
        throw new Error('Profissional já existente.')
      }

      return { success: true, data: newItem}
    }

    default:
      throw new Error('Método não suportado');
  }
});