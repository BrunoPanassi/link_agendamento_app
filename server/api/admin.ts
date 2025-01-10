import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';
import { Admin } from '~/types/admin';

interface JsonData {
  data: Admin[];
}

// Caminho para o arquivo JSON
const filePath = path.join(process.cwd(), 'server/db/admin.json');

// Função para carregar o JSON
const loadJson = (): JsonData => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo JSON não encontrado');
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as JsonData;
};

const loadJsonIfEmailDoNotExists = (email: string) => {
    const adminData = loadJson();
    if (adminData.data.some((admin) => admin.email == email))
      return null
    return adminData
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
      const newItem: Admin = body.item;

      if (!newItem) {
        throw new Error('Nenhum item fornecido');
      }

      const jsonData = loadJsonIfEmailDoNotExists(newItem.email);
      if (jsonData) {
        jsonData.data.push(newItem);
        saveJson(jsonData);
      } else {
        throw new Error('E-mail já existente')
      }

      return { success: true, data: newItem };
    }

    default:
      throw new Error('Método não suportado');
  }
});
