import { createSlice } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    count: 0,
    myPokemons: [],
  },
  reducers: {
    setPokemons: (state, actions) => {
      state.pokemons = actions.payload.pokemons;
      state.count = actions.payload.count;
    },
    setMyPokemons: (state, actions) => {
      state.myPokemons = actions.payload.myPokemons;
    }
  },
});

export const { setPokemons, setMyPokemons } = pokemonSlice.actions;