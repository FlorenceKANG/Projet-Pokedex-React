export default function Header() {
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

      <div className='is-flex is-justify-content-center mb-6'>
        <form className='is-flex is-justify-content-center form'>
          <div className='select'>
            <select name="type" id="search-select">
              <option value="">Tous les types</option>
              <option value="">Eau</option>
              <option value="">Feu</option>
            </select>
          </div>
      
          <label htmlFor="search-pokemons" className='sr-only'>Barre de recherche des pokémons</label>
          <input type="text" id='search-pokemons' placeholder='Taper pour rechercher des pokémons' className='input'/>
          <button className='button is-medium' aria-labelledby='Rechercher'><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </div>
      
      <div className='tabs is-boxed is-scrollbar'>
        <ul>
          <li className='is-active'><a href="">Tous les types</a></li>
          <li><a href="">Type 1</a></li>
          <li><a href="">Type 2</a></li>
          <li><a href="">Type 3</a></li>
          <li><a href="">Type 4</a></li>
          <li><a href="">Type 5</a></li>
          <li><a href="">Type 6</a></li>
          <li><a href="">Type 7</a></li>
          <li><a href="">Type 8</a></li>
        </ul>
      </div>
    </header>
  )
}