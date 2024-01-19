import axios from 'axios';

export const pokemonApi = axios.create({
  baseURL: 'http://localhost:3200'
})