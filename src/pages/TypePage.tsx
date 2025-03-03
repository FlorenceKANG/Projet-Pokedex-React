import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ITypeWithPokemons } from "../@types";
import axios from "axios";
import { IPokemon } from "../@types/index.d";
import PokemonCard from "../components/PokemonCard/PokemonCard";

export default function TypePage() {
  // Récupérer l'ID dans les params
  const { id } = useParams();

  // Variable d'état qui stock les pokémons du 'type' correspondant
  const [typeWithPokemons, setTypeWithPokemons] =
    useState<ITypeWithPokemons | null>(null);

  // Récupérer les pokémons d'un type par appel API au chargement de la page
  useEffect(() => {
    // Appel API pour récupérer les pokémons d'un type [damage_relations: {}, game_indices: [{}], generation: {}, id, move_damage_class: {}, moves: {}, name, names: {}, past_damage_relations, pokemon: [{},{},{}], sprites: {}]
    const getTypeWithPokemons = async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);

      // Récupérer le détail d'un pokémon
      // Promise.all => méthode qui permet d'exécuter plusieurs promesses en parallèle et d'attendre qu'elles soient toutes résolues avant de continuer
      const detailedPokemons = await Promise.all(
        data.pokemon.map(async ({ pokemon }: { pokemon: IPokemon }) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            ...pokemon,
            image:
              pokemonDetails.data.sprites.other.dream_world.front_default ||
              pokemonDetails.data.sprites.front_default,
          };
        })
      );

      setTypeWithPokemons({
        name: data.name,
        pokemon: detailedPokemons.map((pokemon) => ({ pokemon })) as any,
      });
    };

    getTypeWithPokemons();
  }, [id]);

  return (
    <>
      {/* Nombre total de pokémons d'un type */}
      <h2 className="title">{typeWithPokemons?.pokemon.length} pokémons</h2>

      {/* Liste des pokémons d'un type */}
      <ul className="grid is-5">
        {typeWithPokemons?.pokemon.map(({ pokemon }) => (
          <li key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </>
  );
}
