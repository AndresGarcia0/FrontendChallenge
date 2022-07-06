import axios from './axios'

export const fetchShipment = (id) => axios.get(`/shipments/${id}`)

export const fetchShipments = () => axios.get('/shipments')

export const createShipment = (body) => axios.post('/shipments', body)

export const updateShipment = (id, body) => axios.put(`/shipments/${id}`, body)

export const deleteShipment = (id) => axios.delete(`/shipments/${id}`)
