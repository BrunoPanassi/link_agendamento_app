import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';
import { Sallon } from '~/types/sallon';

interface JsonData {
  data: Sallon[];
}

// Caminho para o arquivo JSON
const filePath = path.join(process.cwd(), 'server/db/sallon.json');

// Função para carregar o JSON
const loadJson = (): JsonData => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo JSON não encontrado');
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as JsonData;
};

const loadJsonIfAddressExists = (address: string) => {
    const sallonData = loadJson();
    if (sallonData.data.some((sallon) => sallon.address == address))
      return null
    return sallonData
  }

const loadJsonIfAddressNotExists = (address: string) => {
  const sallonData = loadJson();
  if (sallonData.data.some((sallon) => sallon.address != address))
    return null
  return sallonData
}

const loadSallonDataById = (sallonId: number) => {
  const sallonData = loadJson();
  if (sallonData) {
    return sallonData.data.find((sallon) => sallon.id == sallonId)
  }
  return null
}

const loadSallonDataByPersonId = (personId: number) => {
  const sallonData = loadJson();
  if (sallonData) {
    return sallonData.data.filter((sallon) => sallon.personId == personId)
  }
  return null
}

// Função para salvar o JSON
const saveJson = (data: JsonData) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const getLastId = () => {
  const sallonData = loadJson()
  if (sallonData.data.length) {
    const lastId = sallonData.data[sallonData.data.length - 1].id
    return lastId + 1
  }
  return 0
}

// Define a API para adicionar dados ao JSON
export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  
  switch (method) {
    case 'GET': {
      const query = getQuery(event)
      const address = query.address as string
      const sallonId = query.sallonId as number
      const personId = query.personId as number
      let jsonData = null;
      if (address) {
        jsonData = loadJsonIfAddressExists(address);
      } 

      if (sallonId) {
        jsonData = loadSallonDataById(sallonId)
      }

      if (personId) {
        jsonData = loadSallonDataByPersonId(personId)
      }

      if (jsonData)
        return { status: 200, success: true, data: jsonData, message: null };
      return { status: 400, success: false, data: null, message: "Salão não encontrado"}
    }

    case 'POST': {
      const body = await readBody(event);
      const newItem: Sallon = body.item;

      if (!newItem) {
        throw new Error('Nenhum item fornecido');
      }

      const jsonData = loadJsonIfAddressNotExists(newItem.address);
      if (jsonData) {
        newItem.id = getLastId()
        jsonData.data.push(newItem);
        saveJson(jsonData);
      } else {
        throw new Error('Endereço já existente em outro salão cadastrado')
      }

      return { success: true, data: newItem };
    }

    default:
      throw new Error('Método não suportado');
  }
});
