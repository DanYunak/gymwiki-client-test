import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://gymwiki.onrender.com/',
    withCredentials: true
})