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

const loadDataByPersonId = (personId: number) => {
  const data = loadJson();
  return data.data.find((a) => a.personId = personId)
}

const loadJsonIfEmailAndPasswordChecks = (email: string, password: string) => {
  const adminData = loadJson();
  return adminData.data.find(a => a.email == email && a.password == password)
}

const getAdminIndexByPersonId = (personId: number) => {
  const adminData = loadJson();
  const index = adminData.data.findIndex((d) => d.personId == personId);
  if (index === -1) {
    return { success: false, data: null, message: 'Registro não encontrado' };
  }
  return { success: true, data: index, message: 'Registro encontrado' };
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
      const email = query.email as string
      const password = query.password as string
      const personId = query.personId as number
      let jsonData: any = []
      if (email && password)
        jsonData = loadJsonIfEmailAndPasswordChecks(email, password);

      if (personId)
          jsonData = loadDataByPersonId(personId)
      
      if (jsonData)
        return { status: 200, success: true, data: jsonData, message: null };
      return { status: 400, success: false, data: null, message: "Usuário não encontrado"}
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

    case 'PUT': {
      const query = getQuery(event)
      const body = await readBody(event);
      const personId = query.personId as number
      const index = getAdminIndexByPersonId(personId)
      if (index.success && index.data) {
        const adminData = loadJson()
        adminData.data[index.data] = { ...adminData.data[index.data], ...body.item };
        saveJson(adminData)
        return { status: 200, success: false, data: adminData.data[index.data], message: "Registro de administrador atualizado"}
      }
      return { status: 400, success: true, data: null, message: "Registro de administrador não encontrado"}
    }

    case 'DELETE': {
      // Remove um item pelo ID
      const query = getQuery(event)
      const personId = query.personId as number;
      const adminData = loadJson()
      const adminDataByPersonId = getAdminIndexByPersonId(personId)
      let index = null
      if (!adminDataByPersonId.success) {
        return { success: false, message: 'Registro não encontrado' };
      } else {
        index = adminDataByPersonId.data as number
      }
      const deletedItem = adminData.data.splice(index, 1);
      saveJson(adminData);
      return { success: true, item: deletedItem[0] };
    }


    default:
      throw new Error('Método não suportado');
  }
});
