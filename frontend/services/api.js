import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'casehelpsvp.token': token } = parseCookies()

const api = axios.create({
  baseURL: 'http://localhost:443',
})

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api
