import api from "./services/api";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import { IPokemonList, IType } from "./@types";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";
import TypePage from "./pages/TypePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  // Variable d'état qui stock tous les 'types' de pokémons
  const [types, setTypes] = useState<IType[]>([]);

  // Variable d'état qui stock les pokémons
  const [pokemonsList, setPokemonsList] = useState<IPokemonList[]>([]);

  // Récupérer les types par appel API au chargement de la page
  useEffect(() => {
    getTypes();
  }, []);

  // Fonction pour récupérer toutes les types
  async function getTypes() {
    // Appel API : ...results: {name, url}
    const results = await api.getTypes();
    setTypes(results);
  }

  // Variable d'état qui stock le nombre total de pokémons
  const [count, setCount] = useState(0);

  // Variable d'état qui stock la valeur de l'input search
  const [searchTerm, setSearchTerm] = useState("");

  // Variable d'état qui stock les pokémons filtrés
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemonList[]>([]);

  return (
    <>
      <Header
        types={types}
        pokemonsList={pokemonsList}
        setFilteredPokemons={setFilteredPokemons}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCount={setCount}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                pokemonsList={pokemonsList}
                setPokemonsList={setPokemonsList}
                count={count}
                setCount={setCount}
              />
            }
          />
          <Route path="/type/:id" element={<TypePage />} />

          {searchTerm && (
            <Route
              path="/results"
              element={
                <ResultsPage
                  filteredPokemons={filteredPokemons}
                  count={count}
                />
              }
            />
          )}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
