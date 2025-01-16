import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';
import { json } from 'stream/consumers';
import { Professional } from '~/types/professional';

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
      const personId = query.personId as number
      const password = query.password as string
      const jsonData = loadJsonByPersonIdAndPassword(personId, password)
      if (jsonData)
          return { status: 200, success: true, data: { personId }, message: null };
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