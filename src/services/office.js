import axios from './axios'

export const fetchOffice = (id) => axios.get(`/offices/${id}`)

export const fetchOffices = () => axios.get('/offices')

export const createOffice = (body) => axios.post('/offices', body)

export const updateOffice = (id, body) => axios.put(`/offices/${id}`, body)

export const deleteOffice = (id) => axios.delete(`/offices/${id}`)
