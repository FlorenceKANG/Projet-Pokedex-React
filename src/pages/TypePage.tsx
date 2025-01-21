import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ITypeWithPokemons } from "../@types"
import axios from "axios"

export default function TypePage() {
  const { id } = useParams()

  const [typeWithPokemons, setTypeWithPokemons] = useState<ITypeWithPokemons | null>(null)
  
  useEffect(() => {
    const getTypeWithPokemons = async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${id}`)
      setTypeWithPokemons({
        name: data.name,
        pokemon: data.pokemon
      });
    }

    getTypeWithPokemons()
  }, [id])


  return (
    <>
      <h1 className="title">{typeWithPokemons?.pokemon.length} pokémons</h1>
      <ul className="grid is-5">
        {typeWithPokemons?.pokemon.map(pokemon  => 
          <li key={pokemon.pokemon.name}>
            <article className="card">
              <p className="card-content">
                {pokemon.pokemon.name.charAt(0).toUpperCase() + pokemon.pokemon.name.slice(1).toLowerCase()}
              </p>
            </article>
          </li>
        )}
      </ul>
    </>
  )
}