import { useState } from "react";
import { IPokemon } from "../../@types";
import PokemonModal from "../PokemonModal/PokemonModal";

interface PokemonCardProps {
  pokemon: IPokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {/* Carte du pokemon */}
      <article
        className="card"
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={pokemon.image} alt={`Illustration of ${pokemon.name}`} />
          </figure>
        </div>
        <div className="card-content">
          <p className="content is-capitalized has-text-weight-semibold">
            {pokemon.name}
          </p>
        </div>
      </article>

      {/* Modal de détail du pokémon */}
      <PokemonModal
        pokemon={pokemon}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
