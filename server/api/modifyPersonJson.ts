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
const loadJson = (): JsonData => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo JSON não encontrado');
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as JsonData;
};

const loadJsonIfPhoneNumberDoNotExists = (phoneNumber: number) => {
  const personData = loadJson();
  if (personData.data.some((person) => person.phoneNumber == phoneNumber))
    return null
  return personData
}

const getLastId = () => {
  const personData = loadJson()
  if (personData.data.length) {
    const lastId = personData.data[personData.data.length - 1].id
    return lastId + 1
  }
  return 0
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
      const jsonData = loadJson();
      return { success: true, data: jsonData.data };
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