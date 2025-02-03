const postRequest = async (url: string, payload: Object) => {
    try {
        const response = await $fetch(url, {
          method: 'POST',
          body: {
            item: payload
          },
        });
    
        return response;
      } catch (error) {
        let message = "Erro no pŕocesso ao salvar"
        if (error instanceof Error)
            message = error.message
        throw new Error(message)
      }
}

const getRequest = async (url: string) => {
    try {
        const response = await $fetch(url);
    
        return response;
      } catch (error) {
        let message = "Erro no pŕocesso ao consultar"
        if (error instanceof Error)
            message = error.message
        throw new Error(message)
      }
}

const putRequest = async (url: string, payload: Object) => {
    try {
        const response = await $fetch(url, {
          method: 'PUT',
          body: {
            item: payload
          },
        });
    
        return response;
      } catch (error) {
        let message = "Erro no pŕocesso ao atualizar"
        if (error instanceof Error)
            message = error.message
        throw new Error(message)
      }
}

const deleteRequest = async (url: string) => {
    try {
        const response = await $fetch(url, {
            method: 'DELETE'
        });
    
        return response;
      } catch (error) {
        let message = "Erro no pŕocesso ao consultar"
        if (error instanceof Error)
            message = error.message
        throw new Error(message)
      }
}

export { postRequest, getRequest, putRequest, deleteRequest }