import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';
import { Service } from '~/types/service';

interface JsonData {
  data: Service[];
}

// Caminho para o arquivo JSON
const filePath = path.join(process.cwd(), 'server/db/service.json');

// Função para carregar o JSON
const loadJson = (): JsonData => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo JSON não encontrado');
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as JsonData;
};

const loadJsonIfTitleDoNotExists = (title: string) => {
    const data = loadJson();
    if (data.data.some((service) => service.title == title))
      return null
    return data
  }

const loadJsonByTitle = (title: string) => {
    const data = loadJson();
    return data.data.filter((s) => s.title == title)
}

const loadJsonByIds = (ids: number[]) => {
    const data = loadJson()
    return data.data.filter((s) => ids.includes(s.id))
}

const getIndexById = (id: number) => {
  const data = loadJson();
  const index = data.data.findIndex((d) => d.id == id);
  if (index === -1) {
    return { success: false, data: null, message: 'Registro não encontrado' };
  }
  return { success: true, data: index, message: 'Registro encontrado' };
}

// Função para salvar o JSON
const saveJson = (data: JsonData) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const getLastId = () => {
    const data = loadJson()
    if (data.data.length) {
      const lastId = data.data[data.data.length - 1].id
      return lastId + 1
    }
    return 1
  }

// Define a API para adicionar dados ao JSON
export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  
  switch (method) {
    case 'GET': {
      const query = getQuery(event)
      const title = query.title as string
      const ids = query.ids as number[]

      let jsonData: Service[] = [];
      if (title)
        jsonData = loadJsonByTitle(title);
      if (ids)
        jsonData = loadJsonByIds(ids)
      if (jsonData)
        return { status: 200, success: true, data: jsonData, message: null };
      return { status: 400, success: false, data: null, message: "Usuário não encontrado"}
    }

    case 'POST': {
      const body = await readBody(event);
      const newItem: Service = body.item;

      if (!newItem) {
        throw new Error('Nenhum item fornecido');
      }

      const jsonData = loadJsonIfTitleDoNotExists(newItem.title);
      if (jsonData) {
        newItem.id = getLastId()
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
      const id = query.id as number
      const index = getIndexById(id)
      if (index.success && index.data) {
        const data = loadJson()
        data.data[index.data] = { ...data.data[index.data], ...body.item };
        saveJson(data)
        return { status: 200, success: false, data: data.data[index.data], message: "Registro de administrador atualizado"}
      }
      return { status: 400, success: true, data: null, message: "Registro de administrador não encontrado"}
    }

    case 'DELETE': {
      // Remove um item pelo ID
      const query = getQuery(event)
      const id = query.id as number;
      const data = loadJson()
      const dataById = getIndexById(id)
      let index = null
      if (!dataById.success) {
        return { success: false, message: 'Registro não encontrado' };
      } else {
        index = dataById.data as number
      }
      const deletedItem = data.data.splice(index, 1);
      saveJson(data);
      return { success: true, item: deletedItem[0] };
    }


    default:
      throw new Error('Método não suportado');
  }
});
