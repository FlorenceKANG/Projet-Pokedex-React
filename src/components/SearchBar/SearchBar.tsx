import { useNavigate } from "react-router";
import { IPokemonList } from "../../@types/index.d";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  pokemonsList: IPokemonList[];
  setFilteredPokemons: (pokemonsList: IPokemonList[]) => void;
  setCount: (count: number) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  pokemonsList,
  setFilteredPokemons,
  setCount,
}: SearchBarProps) {
  const navigate = useNavigate();

  // Filtrer les pokemons
  const filteredPokemons = pokemonsList.filter((pokemon) => {
    // Si le searchTerm est vide
    if (searchTerm === "") {
      return false;
    }

    if (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
  });
  return (
    <div className="is-flex is-justify-content-center mb-6">
      <div className="is-flex is-justify-content-center form">
        <label htmlFor="search-pokemons" className="sr-only">
          Barre de recherche des pokémons
        </label>
        <input
          type="text"
          id="search-pokemons"
          placeholder="Type what you want to search for ..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          className="input"
        />
        <button
          className="button is-medium"
          aria-labelledby="Rechercher"
          onClick={() => {
            navigate("/results");
            setFilteredPokemons(filteredPokemons);
            setCount(filteredPokemons.length);
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
}
