// src/services/orders.js
import axios from 'axios'

const baseUrl = '/api/orders'
let token = null

// Accept either "eyJ..." or "Bearer eyJ..." and normalize to "Bearer eyJ..."
const setToken = newToken => {
  if (!newToken) {
    token = null
    return
  }
  token = typeof newToken === 'string' && newToken.toLowerCase().startsWith('bearer ')
    ? newToken
    : `Bearer ${newToken}`
}

const getAll = async (type) => {
  const config = {}
  if (token) config.headers = { Authorization: token }
  if (type) config.params = { type }
  const response = await axios.get(baseUrl, config)
  return Array.isArray(response.data) ? response.data.map(o => ({ ...o, id: o.id || o._id })) : response.data
}

const get = async (id) => {
  const config = token ? { headers: { Authorization: token } } : {}
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async (newObj) => {
  const config = token ? { headers: { Authorization: token } } : {}
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const remove = async (id) => {
  const config = token ? { headers: { Authorization: token } } : {}
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, get, create, remove }
