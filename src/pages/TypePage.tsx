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
      setTypeWithPokemons(data.pokemon)
    }

    getTypeWithPokemons()
  }, [id])


  return (
    <>
      <h1>Type Normal</h1>

      <ul>
        
      </ul>
    
    </>
  )
}