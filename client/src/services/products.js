import axios from 'axios'
const baseUrl = '/api/products'

let token = null
const setToken = newToken => {
  token = newToken ? `Bearer ${newToken}` : null
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  // ensure each product has `id` (some APIs return _id)
  return response.data.map(p => ({ ...p, id: p.id || p._id }))
}

const get = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newObj => {
  const config = token ? { headers: { Authorization: token } } : {}
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const edit = async (id, data) => {
  const response = await axios.put(`${baseUrl}/${id}`, data)
  return response.data
}



const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}


export default { setToken, getAll, get, create, edit, remove }
