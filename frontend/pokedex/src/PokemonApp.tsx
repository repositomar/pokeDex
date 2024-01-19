import { useEffect } from "react"
import TabBar from "./components/TabBar"
import { useDispatch, useSelector } from "react-redux"
import { getMyPokemons, getPaginatedPokemons } from "./store/slices/pokemon";

export const PokemonApp = () => {
  const dispatch: any = useDispatch();
  const { count, pokemons, page, limit, search, myPokemons } = useSelector((state: any) => state.pokemon)

  useEffect(() => {
    dispatch(getPaginatedPokemons())
    dispatch(getMyPokemons())
  }, [])
  
  return (
    <>
      <h1>PokeDex</h1>
      <TabBar count={count} pokemons={pokemons} page={page} limit={limit} search={search} myPokemons={myPokemons}/>
    </>
  )
}
