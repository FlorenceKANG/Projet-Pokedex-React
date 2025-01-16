import axios from 'axios'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { useEffect, useState } from 'react'
import { IPokemonList, IType } from './@types'
import Pagination from './components/Pagination/Pagination'

function App() {
  const [types, setTypes] = useState<IType[]>([])
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


  useEffect(() => {
    const getTypes = async () => {
      const {data} = await axios.get("https://pokeapi.co/api/v2/type")
      setTypes(data.results);
    }

    getTypes()
  }, [])

  return (
    <>
      <Header types={types} />
      
      <main>
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
      </main>

      <Footer />
    </>
  )
}

export default App
