export default function Footer() {
  return (
    <footer className='footer has-text-centered'>
      <div className='mb-4'>
        <a href='' className='button'>Retour en haut</a>
      </div>

      <div>
        <nav className='breadcrumb is-centered'>
          <ul>
            <li><a href="#">Conditions générales de vente</a></li>
            <li><a href="#">Vos informations personnelles</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Annonces basées sur vos centres d'intérêt</a></li>
          </ul>
        </nav>

        <p>© 2024 Pokedex</p>
      </div>
    </footer>
  )
}