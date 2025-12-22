import { IPokemonList } from "../@types";
import PokemonCard from "../components/PokemonCard/PokemonCard";

interface ResultsPageProps {
  filteredPokemons: IPokemonList[];
  count: number;
}

export default function ResultsPage({
  filteredPokemons,
  count,
}: ResultsPageProps) {
  return (
    <>
      {/* Nombre de pokémons trouvés */}
      <h2 className="title">{count} pokémons trouvés</h2>

      {/* Liste de pokémons */}
      <ul className="grid">
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.name} style={{ maxWidth: "200px" }}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </>
  );
}
