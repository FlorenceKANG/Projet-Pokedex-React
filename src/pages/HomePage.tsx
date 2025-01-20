import { useEffect, useState } from "react"
import { IPokemonList } from "../@types"
import axios from "axios"
import Pagination from "../components/Pagination/Pagination"

export default function HomePage() {
  const [pokemonsList, setPokemonsList] = useState<IPokemonList[]>([])
  
  const [currentUrl, setCurrentUrl] = useState(`https://pokeapi.co/api/v2/pokemon`)
  const [nextUrl, setNextUrl] = useState(currentUrl)
  const [previousUrl, setPreviousUrl] = useState(currentUrl)
  
  useEffect(() => {
    const getPokemonsList = async () => {
      const {data} = await axios.get(currentUrl)
      setNextUrl(data.next)
      setPreviousUrl(data.previous)
      setPokemonsList(data.results)
    }
    
    getPokemonsList()
  }, [currentUrl])

  return (
    <>
      <ul>
        {pokemonsList.map(pokemon => 
          <li key={pokemon.name}>
            <article className='card'>
              <p className='card-content'>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}
              </p>
            </article>
          </li>
        )}
      </ul>
      
      <Pagination setCurrentUrl={setCurrentUrl} previousUrl={previousUrl} nextUrl={nextUrl} />
    </>
  )
}