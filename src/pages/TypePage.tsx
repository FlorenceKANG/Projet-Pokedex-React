import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ITypeWithPokemons } from "../@types"
import axios from "axios"
import { IPokemon } from '../@types/index.d';

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
            <article className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={pokemon.image} alt={`Illustration de ${pokemon.name}`} />
                </figure>
              </div>
              <div className="card-content">
                <p className="content">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}
                </p>
              </div>
            </article>
          </li>
        )}
        
      </ul>
    </>
  )
}