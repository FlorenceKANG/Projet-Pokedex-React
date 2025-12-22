import { useEffect, useState } from "react";
import api from "../services/api";
import Pagination from "../components/Pagination/Pagination";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import { IPokemonList } from "../@types";

interface HomePageProps {
  pokemonsList: IPokemonList[];
  setPokemonsList: (pokemonsList: IPokemonList[]) => void;
  count: number;
  setCount: (count: number) => void;
}

export default function HomePage({
  pokemonsList,
  setPokemonsList,
  count,
  setCount,
}: HomePageProps) {
  // Variable d'état qui stock l'URL actuel
  const [currentUrl, setCurrentUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=50`
  );

  // Variable d'état qui stock l'URL suivant
  const [nextUrl, setNextUrl] = useState(currentUrl);

  // Variable d'état qui stock l'URL précédent
  const [previousUrl, setPreviousUrl] = useState(currentUrl);

  // Variable d'état qui stock le numéro de la page actuel
  const [currentPage, setCurrentPage] = useState(1);

  // Variable qui stock la limite de pokémons par page
  const limit = 50;

  // Variable qui stock le calcul dynamique du nombre total de pages
  const totalPages = Math.ceil(count / limit);

  // Selon currentUrl, récupérer les pokémons correspondants
  useEffect(() => {
    getPokemonsWithDetailsForPage(currentUrl);
  }, [currentUrl]);

  // Fonction pour récupérer les pokémons par page avec ses détails
  async function getPokemonsWithDetailsForPage(currentUrl: string) {
    // Appel API : { count, next, previous, results: { name, url } }
    const pokemonsList = await api.getPokemonsForPage(currentUrl);
    setCount(pokemonsList.count);
    setNextUrl(pokemonsList.next);
    setPreviousUrl(pokemonsList.previous);

    // Appel API : { ...pokemon, id, image, types, stats, height, weight }
    const detailedPokemons = await api.getPokemonDetailsForPage(pokemonsList);
    setPokemonsList(detailedPokemons);
  }

  return (
    <>
      {/* Nombre total de pokémons */}
      <h2 className="title">{count} pokémons</h2>

      {/* Liste des 50 pokémons de l'URL actuel */}
      <ul className="grid">
        {pokemonsList.map((pokemon) => (
          <li key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>

      {/* Pagination dynamique  */}
      <Pagination
        setCurrentUrl={setCurrentUrl}
        previousUrl={previousUrl}
        nextUrl={nextUrl}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
