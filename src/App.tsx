import axios from 'axios'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { useEffect, useState } from 'react'
import { IType } from './@types'
import HomePage from './pages/HomePage'

function App() {
  const [types, setTypes] = useState<IType[]>([])

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
        <HomePage />
      </main>

      <Footer />
    </>
  )
}

export default App
