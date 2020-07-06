import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000'
})

export const getHello = () => api.get('/')
export const setWhatsappInfo = (number, apiKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            api.post('/whatsappInfo', {
                whatsappNumber: number,
                whatsappApiKey: apiKey
            }).then((response) => {
                resolve(response)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const apis = {
    getHello,
    setWhatsappInfo
}

export default apis