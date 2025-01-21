import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ITypeWithPokemons } from "../@types"
import axios from "axios"
import { IPokemon } from '../@types/index.d';
import PokemonCard from "../components/PokemonCard/PokemonCard";

export default function TypePage() {
  const { id } = useParams()

  const [typeWithPokemons, setTypeWithPokemons] = useState<ITypeWithPokemons | null>(null)
  
  useEffect(() => {
    // Appel API pour récupérer les pokémons d'un type
    const getTypeWithPokemons = async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${id}`)

      // Récupérer le détail d'un pokémon 
      const detailedPokemons = await Promise.all(
        data.pokemon.map(async ({ pokemon }: { pokemon: IPokemon }) => {
          const pokemonDetails = await axios.get(pokemon.url)
          return {
            ...pokemon,
            image: pokemonDetails.data.sprites.other.dream_world.front_default || pokemonDetails.data.sprites.front_default
          }
        })
      )

      setTypeWithPokemons({
        name: data.name,
        pokemon: detailedPokemons.map((pokemon) => ({ pokemon })) as any
      });
    }

    getTypeWithPokemons()
  }, [id])


  return (
    <>
      <h1 className="title">{typeWithPokemons?.pokemon.length} pokémons</h1>
      <ul className="grid is-5">

        {typeWithPokemons?.pokemon.map(({ pokemon })  => 
          <li key={pokemon.name}>
            <PokemonCard pokemon={pokemon}/>
          </li>
        )}
        
      </ul>
    </>
  )
}