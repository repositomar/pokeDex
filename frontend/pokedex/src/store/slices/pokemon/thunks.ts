import { pokemonApi } from "../../../api/pokemoApi";
import { setMyPokemons, setPokemons } from "./pokemonSlice"

export const getPaginatedPokemons = (page = 0, limit = 5, search = '') => {
  return async (dispatch: any, getState: any) => {

    const { data } = await pokemonApi.get(`poke-api/pokemon?page=${page}&limit=${limit}&s=${search}`);
    
    dispatch(setPokemons({ count: data.count ,pokemons: data.results }));
  }
}

export const getMyPokemons = () => {
  return async (dispatch: any, getstate: any) => {

    const { data } = await pokemonApi.get(`pokemon`);

    dispatch(setMyPokemons({ myPokemons: data }))
  }
}
