interface PaginationProps {
  setCurrentUrl: (currentUrl: string) => void;
  previousUrl: string;
  nextUrl: string;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

export default function Pagination({
  setCurrentUrl,
  previousUrl,
  nextUrl,
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const limit = 50; // Nombre de Pokémons par page

  // Fonction qui permet de mettre à jour l'URL selon la page selectionnée en recalculant 'offset'
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    setCurrentUrl(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
        (page - 1) * limit
      }`
    );
  };

  return (
    <div className="container my-6">
      <div className="pagination is-centered">
        {/* Bouton 'previous' pour retourner à la page précédente */}
        {previousUrl && (
          <button
            className="pagination-previous"
            onClick={() => {
              handlePageClick(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        )}

        {/* bouton 'next' pour passer à la page suivante */}
        {nextUrl && (
          <button
            className="pagination-next"
            onClick={() => {
              handlePageClick(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          >
            Next page
          </button>
        )}

        {/* Dynamiser la liste des numéros de page selon la page sélectionnée */}
        <ul className="pagination-list">
          {/* Un tableau de numéros allant de 1 à totalPages */}
          {/* length: totalPages => créer un tableau vide de longueur totalPages */}
          {/* (_, i) => i + 1) => rempli le tableau avec les nombres de 1 à totalPages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                className={`pagination-link ${
                  currentPage === page ? "is-current" : ""
                }`}
                onClick={() => {
                  handlePageClick(page);
                }}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
