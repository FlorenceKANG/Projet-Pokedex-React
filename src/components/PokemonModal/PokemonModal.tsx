import { IPokemon } from "../../@types";

interface PokemonModalProps {
  pokemon: IPokemon;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function PokemonModal({
  pokemon,
  isModalOpen,
  setIsModalOpen,
}: PokemonModalProps) {
  return (
    <>
      <div className={isModalOpen ? "modal is-active" : "modal"}>
        <div
          className="modal-background"
          onClick={() => {
            setIsModalOpen(false);
          }}
        ></div>
        <div className="modal-card">
          {/* En tête du modal */}
          <header className="modal-card-head is-align-items-center">
            <h2 className="modal-card-title is-size-3 has-text-weight-bold is-capitalized">
              {pokemon.name}
            </h2>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                setIsModalOpen(false);
              }}
            ></button>
          </header>

          {/* Contenu du modal */}
          <section className="modal-card-body">
            {/* Illustration et caractéristiques */}
            <div className="mr-6 mb-6 is-flex is-flex-direction-row is-gap-4">
              <img
                src={pokemon.image}
                alt={`Illustration of ${pokemon.name}`}
                className="image is-128x128"
              />
              <div className="is-flex is-flex-direction-column is-gap-2">
                <p>N° {pokemon.id}</p>
                <p>Height : {pokemon.height} dm</p>
                <p>Weight : {pokemon.weight} hg</p>
                <div className="tags">
                  {pokemon.types?.map((type) => (
                    <span
                      key={type.slot}
                      className="tag is-info is-medium is-hoverable is-capitalized"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Partie statistique */}
            <div className="modal-card-content">
              <h3 className="title is-size-4">Statistics</h3>
              {pokemon.stats?.map((stat) => (
                <div key={stat.stat.name} className="mb-2">
                  <p className="is-capitalized">{stat.stat.name}</p>
                  <progress
                    className="progress is-danger"
                    value={stat.base_stat}
                    max="255"
                  ></progress>
                </div>
              ))}
            </div>
          </section>

          {/* Pied du modal */}
          <footer className="modal-card-foot">
            <div className="buttons">
              <button
                className="button"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
