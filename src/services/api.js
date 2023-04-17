import axios from "axios";

const baseUrl = 'https://pokemapa-api.vercel.app/api'

export const getAllPokestops = async () => {
  const response = await axios.get(`${baseUrl}/pokestops`)
  return response.data
}

export const getOnePokestop = async (id) => {
  const response = await axios.get(`${baseUrl}/pokestops/${id}`)
  return response.data
}

export const addPokestop = async (pokestop) => {
  const response = await axios.post(`${baseUrl}/pokestops`, pokestop)
  return response.data
}