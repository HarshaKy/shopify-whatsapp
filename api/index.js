import axios from 'axios'
import { reject } from 'lodash'

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

export const getShop = (shopHost) => {
    return new Promise(async (resolve, reject) => {
        try {
            api.get(`shops?shopHost=${shopHost}`).then((res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

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

export const setTemplateChoices = (shop, templateChoicesFromClient) => {
    return new Promise(async (resolve, reject) => {
        try {
            api.post('/templateChoices', {
                templateChoicesFromClient,
                shop
            }).then((res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getTemplateVariables = (templateText) => {
    return new Promise(async (resolve, reject) => {
        try {
            api.post('/templateText', {
                templateText
            }).then((res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const setEventTemplate = (data, shopId) => {
    return new Promise(async (resolve, reject) => {
        try {
            api.post('/eventTemplate', {
                data,
                shopId
            }).then((res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
        } catch (err) {
            reject(err)
        }
    })
}

const apis = {
    getHello,
    setWhatsappInfo,
    getShop,
    createShop,
    setTemplateChoices,
    getTemplateVariables,
    setEventTemplate
}

export default apis