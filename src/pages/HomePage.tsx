import { useEffect, useState } from "react";
import { IPokemonList } from "../@types";
import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import PokemonCard from "../components/PokemonCard/PokemonCard";

export default function HomePage() {
  // Variable d'état qui stock les pokémons
  const [pokemonsList, setPokemonsList] = useState<IPokemonList[]>([]);

  // Variable d'état qui stock l'URL actuel
  const [currentUrl, setCurrentUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=50`
  );

  // Variable d'état qui stock l'URL suivant
  const [nextUrl, setNextUrl] = useState(currentUrl);

  // Variable d'état qui stock l'URL précédent
  const [previousUrl, setPreviousUrl] = useState(currentUrl);

  // Variable d'état qui stock le nombre total de pokémons
  const [count, setCount] = useState(0);

  // Variable d'état qui stock le numéro de la page actuel
  const [currentPage, setCurrentPage] = useState(1);

  // Variable qui stock la limite de pokémons par page
  const limit = 50;

  // Variable qui stock le calcul dynamique du nombre total de pages
  const totalPages = Math.ceil(count / limit);

  // Selon currentUrl, récupérer les pokémons correspondants
  useEffect(() => {
    // Appel API pour récupérer la liste des pokémons [count, next, previous, results: { name, url }]
    const getPokemonsList = async () => {
      const { data } = await axios.get(currentUrl);
      setCount(data.count);
      setNextUrl(data.next);
      setPreviousUrl(data.previous);

      // Récupérer le détail pour chaque pokémon
      // Promise.all => méthode qui permet d'exécuter plusieurs promesses en parallèle et d'attendre qu'elles soient toutes résolues avant de continuer
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: IPokemonList) => {
          const pokemonData = await axios.get(pokemon.url); // Appel sur l'url pour obtenir le détail d'un pokémon
          return {
            ...pokemon,
            image:
              pokemonData.data.sprites.other.dream_world.front_default ||
              pokemonData.data.sprites.front_default, // Ajouter l'url de l'image
          };
        })
      );

      setPokemonsList(detailedPokemons);
    };

    getPokemonsList();
  }, [currentUrl]);

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
