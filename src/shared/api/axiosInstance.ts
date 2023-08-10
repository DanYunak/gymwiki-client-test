import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://gymwiki-server.onrender.com/',
    withCredentials: true
})