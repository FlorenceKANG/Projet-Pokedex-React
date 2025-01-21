import { IPokemon } from "../../@types"

interface PokemonCardProps {
  pokemon: IPokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={pokemon.image} alt={`Illustration de ${pokemon.name}`} />
        </figure>
      </div>
      <div className="card-content">
        <p className="content">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}
        </p>
      </div>
    </article>
  )
}