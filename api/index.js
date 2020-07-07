import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000'
})

export const getHello = () => api.get('/')
export const setWhatsappInfo = (number, apiKey, shopId) => {
    return new Promise(async (resolve, reject) => {
        try {
            api.post('/whatsappInfo', {
                shopId: shopId,
                whatsappNumber: number,
                whatsappApiKey: apiKey
            }).then((response) => {
                resolve(response)
            }, (err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getShop = (shopHost) => api.get(`shops?shopHost=${shopHost}`)

export const createShop = (shop) => {
    return new Promise(async (resolve, reject) => {
        try {
            api.post('/shop', {
                shop
            }).then((response) => {
                resolve(response)
            }, (err) => {
                reject(err)
            })
        } catch (error) {
            reject(err)
        }
    })
}


const apis = {
    getHello,
    setWhatsappInfo,
    getShop,
    createShop
}

export default apis