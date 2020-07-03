import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000'
})

export const getHello = () => api.get('/')

const apis = {
    getHello
}

export default apis