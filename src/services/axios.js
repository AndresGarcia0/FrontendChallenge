import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5001/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5002' }
})

export default client
