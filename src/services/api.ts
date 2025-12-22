import axios from "axios";
import { IPokemonList, IPokemon } from "../@types/index";

const apiUrl = "https://pokeapi.co/api/v2";

// GET : types
async function getTypes() {
  const { data } = await axios.get(`${apiUrl}/type`);
  return data.results;
}

// GET : pokemons by page
async function getPokemonsForPage(currentUrl: string) {
  const { data } = await axios.get(`${currentUrl}`);
  return data;
}

// GET : pokemon details by page
async function getPokemonDetailsForPage(pokemonsList: any) {
  // Promise.all => méthode qui permet d'exécuter plusieurs promesses en parallèle et d'attendre qu'elles soient toutes résolues avant de continuer
  const detailedPokemons = await Promise.all(
    pokemonsList.results.map(async (pokemon: IPokemonList) => {
      const pokemonData = await axios.get(pokemon.url); // Appel sur l'url pour obtenir le détail d'un pokémon
      return {
        ...pokemon,
        id: pokemonData.data.id, // l'ID du pokemon
        image:
          pokemonData.data.sprites.other.home.front_default ||
          pokemonData.data.sprites.other.dream_world.front_default ||
          pokemonData.data.sprites.front_default, // Ajouter l'url de l'image
        types: pokemonData.data.types, // Ajouter les types du pokemon
        stats: pokemonData.data.stats, // Ajouter les valeurs statistiques du pokemon
        height: pokemonData.data.height, // Ajouter la taille du pokemon
        weight: pokemonData.data.weight, // Ajouter le poids du pokemon
      };
    })
  );
  return detailedPokemons;
}

// GET : pokemons by type
async function getPokemonsByType(typeId: string) {
  const { data } = await axios.get(`${apiUrl}/type/${typeId}`);
  return data;
}

// GET : pokemon details by type
async function getPokemonDetailsbyType(pokemonsList: any) {
  // Promise.all => méthode qui permet d'exécuter plusieurs promesses en parallèle et d'attendre qu'elles soient toutes résolues avant de continuer
  const detailedPokemons = await Promise.all(
    pokemonsList.pokemon.map(async ({ pokemon }: { pokemon: IPokemon }) => {
      const pokemonData = await axios.get(pokemon.url); // Appel sur l'url pour obtenir le détail d'un pokémon
      return {
        ...pokemon,
        id: pokemonData.data.id, // l'ID du pokemon
        image:
          pokemonData.data.sprites.other.home.front_default ||
          pokemonData.data.sprites.other.dream_world.front_default ||
          pokemonData.data.sprites.front_default, // Ajouter l'url de l'image
        types: pokemonData.data.types, // Ajouter les types du pokemon
        stats: pokemonData.data.stats, // Ajouter les valeurs statistiques du pokemon
        height: pokemonData.data.height, // Ajouter la taille du pokemon
        weight: pokemonData.data.weight, // Ajouter le poids du pokemon
      };
    })
  );
  return detailedPokemons;
}

export default {
  getTypes,
  getPokemonsForPage,
  getPokemonDetailsForPage,
  getPokemonsByType,
  getPokemonDetailsbyType,
};
