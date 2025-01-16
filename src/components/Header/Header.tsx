import { IType } from "../../@types";
import SearchBar from "../SearchBar/SearchBar";

interface HeaderProps {
  types: IType[]
}

export default function Header({types}: HeaderProps) {
  return (
    <header className='m-4'>
      <div className='is-flex is-justify-content-space-between is-align-items-center'>
        <a href='#'>
          <h1 className='title is-1'>Pokedex</h1>
        </a>
        <div className='is-flex is-justify-content-end'>
          <nav className='buttons'>
            <a href="#">Sign up</a>
            <a href="#" className='button'>Login</a>
          </nav>
        </div>
      </div>

      <SearchBar />
      
      <div className='tabs is-boxed is-scrollbar'>
        <ul>
          <li className='is-active'><a href="">Tous les types</a></li>
          {types.map(type => 
            <li key={type.name}><a href="#">{type.name.toUpperCase()}</a></li>
          )}
        </ul>
      </div>
    </header>
  )
}