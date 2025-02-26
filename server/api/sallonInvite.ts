import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';
import { Sallon } from '~/types/sallon';
import { SallonInvite } from '~/types/sallonInvite';

interface JsonData {
  data: SallonInvite[];
}

// Caminho para o arquivo JSON
const filePath = path.join(process.cwd(), 'server/db/sallonInvite.json');

// Função para carregar o JSON
const loadJson = (): JsonData => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo JSON não encontrado');
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as JsonData;
};

const saveJson = (data: JsonData) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const loadDataBySallon = (sallonId: number) => {
  const data = loadJson();
  if (data) {
    return data.data.find((invite) => invite.sallonId == sallonId)
  }
  return null
}

const loadDataByProfessional = (professionalId: number) => {
  const data = loadJson();
  if (data) {
    return data.data.find((invite) => invite.professionalIds.includes(professionalId))
  }
  return null
}

const loadJsonIfSallonNotExists = (sallonId: number) => {
  const data = loadJson();
  if (data.data.some((invite) => invite.sallonId != sallonId))
    return null
  return data
}

const getIndexById = (sallonId: number) => {
  const invite = loadJson()
  const index = invite.data.findIndex((s) => s.sallonId == sallonId)
  if (index === -1) {
    return { success: false, data: null, message: 'Registro não encontrado' };
  }
  return { success: true, data: index, message: 'Registro encontrado' };
}

  export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    
    switch (method) {
      case 'GET': {
        const query = getQuery(event)
        const sallonId = query.sallonId as number
        
        let jsonData = null;
        if (sallonId) {
          jsonData = loadDataBySallon(sallonId);
        }

        const professionalId = query.professionalId as number
        if (professionalId) {
          jsonData = loadDataByProfessional(professionalId)
        }
  
        if (jsonData)
          return { status: 200, success: true, data: jsonData, message: null };
        return { status: 400, success: false, data: null, message: "Salão não encontrado"}
      }
  
      case 'POST': {
        const body = await readBody(event);
        const newItem: SallonInvite = body.item;
  
        if (!newItem) {
          throw new Error('Nenhum item fornecido');
        }
  
        const jsonData = loadJsonIfSallonNotExists(newItem.sallonId); //TODO: if sallon exists, then add the professional
        if (jsonData) {
          jsonData.data.push(newItem);
          saveJson(jsonData);
        } else {
          throw new Error('Salão já cadastrado')
        }
  
        return { success: true, data: newItem };
      }
  
      case 'PUT': {
            const query = getQuery(event)
            const body = await readBody(event);
            const sallonId = query.sallonId as number
            const index = getIndexById(sallonId)
            if (index.success && index.data !== null) {
              let invite = loadJson()
              let sallonInvite = invite.data.find(i => i.sallonId == sallonId)
              if (sallonInvite) {
                sallonInvite["professionalIds"] = [...body.item.professionalIds ]
                invite.data[index.data] = sallonInvite;
                saveJson(invite)
                return { status: 200, success: true, data: invite.data[index.data], message: "Registro de salão atualizado"}
              }
            }
            return { status: 400, success: false, data: null, message: "Registro de salão não encontrado"}
          }
      
      case 'DELETE': {
            // Remove um item pelo ID
            const query = getQuery(event)
            const sallonId = query.sallonId as number;
            const index = getIndexById(sallonId)
            if (index.success && index.data !== null) {
                const invite = loadJson()
                const deletedItem = invite.data.splice(index.data, 1);
                saveJson(invite);
                return { status: 200, success: true, data: deletedItem[0], message: "Registro de salão atualizado"}
              }
            return { success: false, item: null, message: "Registro de salão não encontrado" };
          }
  
      default:
        throw new Error('Método não suportado');
    }
  })