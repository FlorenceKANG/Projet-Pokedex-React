import { useEffect, useState } from "react"
import { IPokemonList } from "../@types"
import axios from "axios"
import Pagination from "../components/Pagination/Pagination"

export default function HomePage() {
  const [pokemonsList, setPokemonsList] = useState<IPokemonList[]>([])
  
  const [currentUrl, setCurrentUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=50`)
  const [nextUrl, setNextUrl] = useState(currentUrl)
  const [previousUrl, setPreviousUrl] = useState(currentUrl)
  
  useEffect(() => {
    // Appel API pour récupérer la liste des pokémons [count, next, previous, results: { name, url }]
    const getPokemonsList = async () => {
      const {data} = await axios.get(currentUrl)
      setNextUrl(data.next)
      setPreviousUrl(data.previous)

      // Récupérer le détail pour chaque pokémon 
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: IPokemonList) => {
          const pokemonData = await axios.get(pokemon.url); // Appel sur l'url pour obtenir le détail d'un pokémon
          return {
            ...pokemon,
            image: pokemonData.data.sprites.other.dream_world.front_default, // Ajouter l'url de l'image 
          };
        })
      );

      setPokemonsList(detailedPokemons)
    }
    
    getPokemonsList()
  }, [currentUrl])

  return (
    <>
      <ul className="grid">
        {pokemonsList.map(pokemon => 
          <li key={pokemon.name}>
            <article className='card'>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={pokemon.image} alt={`Illustration de ${pokemon.name}`}/>
                </figure>
              </div>
              <div className="card-content">
                <p className='content'>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}
                </p>
              </div>
            </article>
          </li>
        )}
      </ul>
      
      <Pagination setCurrentUrl={setCurrentUrl} previousUrl={previousUrl} nextUrl={nextUrl} />
    </>
  )
}