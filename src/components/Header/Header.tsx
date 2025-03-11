import { Link } from "react-router";
import { IPokemonList, IType } from "../../@types";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import pokeball from "../../assets/pokeball.png";

interface HeaderProps {
  types: IType[];
  pokemonsList: IPokemonList[];
  setFilteredPokemons: (filteredPokemons: IPokemonList[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setCount: (count: number) => void;
}

export default function Header({
  types,
  searchTerm,
  setSearchTerm,
  pokemonsList,
  setFilteredPokemons,
  setCount,
}: HeaderProps) {
  // Variable d'état qui stock l'onglet sélectionné et actif
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    return Number(localStorage.getItem("activeIndex")) || -1; // Lecture de l'index sauvegardé dans le localStorage. Sinon, valeur '-1' par défaut
  });

  // Fonction qui permet d'activer l'onglet
  const handleIsActive = (index: number) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", String(index)); // Sauvegarder dans le localStorage
  };

  return (
    <header className="m-4">
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <Link
          to={"/"}
          onClick={() => {
            setActiveIndex(-1); // Remettre la valeur sur -1 par défaut
            localStorage.removeItem("activeIndex"); // Retirer l'élément du localStorage
          }}
        >
          <h1 className="title is-1">
            P{<img src={pokeball} alt="logo pokemon" />}kedex
          </h1>
        </Link>

        <div className="is-flex is-justify-content-end">
          <nav className="buttons">
            <a href="#">Sign up</a>
            <a href="#" className="button">
              Login
            </a>
          </nav>
        </div>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        pokemonsList={pokemonsList}
        setFilteredPokemons={setFilteredPokemons}
        setCount={setCount}
      />

      {/* Liste des onglets des 'types' pour afficher les pokémons par types  */}
      <div className="tabs is-boxed is-scrollbar">
        <ul>
          <li
            className={activeIndex === -1 ? "is-active" : ""}
            onClick={() => handleIsActive(-1)}
          >
            <Link to="/">All types</Link>
          </li>

          {types.map((type, index) => (
            <li
              key={type.name}
              className={activeIndex === index ? "is-active" : ""}
              onClick={() => handleIsActive(index)}
            >
              <Link to={`/type/${type.name}`} className="is-capitalized">
                {type.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
