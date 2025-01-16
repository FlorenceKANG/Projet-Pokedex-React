import axios from 'axios'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { useEffect, useState } from 'react'
import { IPokemonList, IType } from './@types'

function App() {
  const [types, setTypes] = useState<IType[]>([])
  const [pokemonsList, setPokemonsList] = useState<IPokemonList[]>([])
  
  const [currentUrl, setCurrentUrl] = useState(`https://pokeapi.co/api/v2/pokemon?offset=00&limit=20`)
  const [nextUrl, setNextUrl] = useState(currentUrl)
  const [previousUrl, setPreviousUrl] = useState(currentUrl)
  
  useEffect(() => {
    const getPokemonsList = async () => {
      const {data} = await axios.get(currentUrl)
      setPokemonsList(data.results)
      setNextUrl(data.next)
      setPreviousUrl(data.previous)
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

        <div className='container my-6'>
          <div className="pagination is-centered">
            <button 
              className="pagination-previous"
              onClick={() => {
                setCurrentUrl(previousUrl)
              }}
            >
              Previous
            </button>

            <button 
              className="pagination-next"
              onClick={() => {
                setCurrentUrl(nextUrl)
              }}
            >
              Next page
            </button>

            <ul className="pagination-list">
              <li><button className="pagination-link">1</button></li>
              <li><span className="pagination-ellipsis">&hellip;</span></li>
              <li><button className="pagination-link">45</button></li>
              <li><button className="pagination-link is-current">46</button></li>
              <li><button className="pagination-link">47</button></li>
              <li><span className="pagination-ellipsis">&hellip;</span></li>
              <li><button className="pagination-link">86</button></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
