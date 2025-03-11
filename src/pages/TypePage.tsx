import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ITypeWithPokemons } from "../@types";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import api from "../services/api";

export default function TypePage() {
  // Récupérer l'ID du type dans les params
  const { id } = useParams();

  // Variable d'état qui stock les pokémons du 'type' correspondant
  const [typeWithPokemons, setTypeWithPokemons] =
    useState<ITypeWithPokemons | null>(null);

  // Récupérer les pokémons d'un type par appel API au chargement de la page
  useEffect(() => {
    if (id) {
      getPokemonsByTypeWithDetails(id);
    }
  }, [id]);

  // Fonction pour récupérer les pokémons par type
  async function getPokemonsByTypeWithDetails(id: string) {
    // Appel API pour récupérer les pokémons d'un type [damage_relations: {}, game_indices: [{}], generation: {}, id, move_damage_class: {}, moves: {}, name, names: {}, past_damage_relations, pokemon: [{},{},{}], sprites: {}]
    const pokemonsList = await api.getPokemonsByType(id);

    // Récupérer le détail d'un pokémon
    const detailedPokemons = await api.getPokemonDetailsbyType(pokemonsList);
    setTypeWithPokemons({
      name: pokemonsList.name,
      pokemon: detailedPokemons.map((pokemon) => ({ pokemon })) as any,
    });
  }

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
