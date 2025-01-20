import { Link } from "react-router";
import { IType } from "../../@types";
import SearchBar from "../SearchBar/SearchBar";

interface HeaderProps {
  types: IType[]
}

export default function Header({types}: HeaderProps) {
  return (
    <header className='m-4'>
      <div className='is-flex is-justify-content-space-between is-align-items-center'>
        <Link to={'/'}>
          <h1 className='title is-1'>Pokedex</h1>
        </Link>
        <div className='is-flex is-justify-content-end'>
          <nav className='buttons'>
            <a href="#">Sign up</a>
            <a href="#" className='button'>Login</a>
          </nav>
        </div>
      </div>

      <SearchBar types={types} />
      
      <div className='tabs is-boxed is-scrollbar'>
        <ul>
          <li className='is-active'><a href="">Tous les types</a></li>
          {types.map(type => 
            <li key={type.name}>
              <Link to={`/type/${type.name}`}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1).toLowerCase()}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}