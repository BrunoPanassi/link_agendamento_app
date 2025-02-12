import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';
import { Person } from '~/types/person';

interface JsonData {
  data: Person[];
}

// Caminho para o arquivo JSON
const filePath = path.join(process.cwd(), 'server/db/person.json');

// Função para carregar o JSON
const loadPersonData = (): JsonData => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo JSON não encontrado');
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as JsonData;
};

const loadDataByIds = (ids: number[]) => {
  const data = loadPersonData()
  return data.data.filter(p => ids.includes(p.id))
}

const loadJsonIfPhoneNumberDoNotExists = (phoneNumber: number) => {
  const personData = loadPersonData();
  if (personData.data.some((person) => person.phoneNumber == phoneNumber))
    return null
  return personData
}

const loadJsonByPhoneNumber = (phoneNumber: number) => {
  const personData = loadPersonData();
  return personData.data.find((person) => person.phoneNumber == phoneNumber)
}

const getLastId = () => {
  const personData = loadPersonData()
  if (personData.data.length) {
    const lastId = personData.data[personData.data.length - 1].id
    return lastId + 1
  }
  return 1
}

// Função para salvar o JSON
const saveJson = (data: JsonData) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Define a API para adicionar dados ao JSON
export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  switch (method) {
    case 'GET': {
      const query = getQuery(event)
      const phoneNumber = query.phoneNumber as number
      let jsonData;
      if (phoneNumber) {
        jsonData = loadJsonByPhoneNumber(phoneNumber)
      }

      const ids  = query.ids as number[]
      if (ids) {
        jsonData = loadDataByIds(ids)
      }
      if (jsonData)
        return { status: 200, success: true, data: jsonData, message: null };
      return { status: 400, success: false, data: null, message: "Usuário não encontrado"} //TODO: Improve status code response to 400
    }

    case 'POST': {
      const body = await readBody(event);
      const newItem: Person = body.item;

      if (!newItem) {
        throw new Error('Nenhum item fornecido');
      }

      const jsonData = loadJsonIfPhoneNumberDoNotExists(newItem.phoneNumber);
      if (jsonData) {
        newItem.id = getLastId()
        jsonData.data.push(newItem);
        saveJson(jsonData);
      } else {
        throw new Error('Número de telefone já existente')
      }

      return { success: true, data: newItem };
    }

    default:
      throw new Error('Método não suportado');
  }
});
