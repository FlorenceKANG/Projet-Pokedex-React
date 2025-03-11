import { Link } from "react-router";
import { IType } from "../../@types";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import pokeball from "../../assets/pokeball.png";

interface HeaderProps {
  types: IType[];
}

export default function Header({ types }: HeaderProps) {
  // Variable d'état qui stock l'onglet sélectionné et actif
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Fonction qui
  const handleIsActive = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <header className="m-4">
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <Link to={"/"}>
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

      <SearchBar types={types} />

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
