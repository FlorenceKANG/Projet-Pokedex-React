import { IType } from "../../@types"

interface SearchBarProps {
  types: IType[]
}

export default function SearchBar({types}: SearchBarProps) {
  return (
    <div className='is-flex is-justify-content-center mb-6'>
      <form className='is-flex is-justify-content-center form'>
        <div className='select'>
          <select name="type" id="search-select">
            <option value="">Tous les types</option>
            {types.map(type => 
              <option value={type.name} key={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1).toLowerCase()}
              </option>
            )}
          </select>
        </div>
    
        <label htmlFor="search-pokemons" className='sr-only'>Barre de recherche des pokémons</label>
        <input type="text" id='search-pokemons' placeholder='Taper pour rechercher des pokémons' className='input'/>
        <button className='button is-medium' aria-labelledby='Rechercher'><i className="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </div>
  )
}