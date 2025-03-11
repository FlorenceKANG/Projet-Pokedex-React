// Détail du pokémon
export interface IPokemon {
  id?: number;
  name: string;
  url: string;
  image?: string;
  types?: { slot: number; type: IType }[];
  stats?: { base_stat: number; stat: IStat }[];
  height?: number;
  weight?: number;
}

export interface IStat {
  name: string;
  url: string;
}

// Liste des pokémons
export interface IPokemonList extends IPokemon {
  counter: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[] | null;
}

export interface IType {
  name: string;
  url: string;
}

// Les pokémons d'un type
export interface ITypeWithPokemons {
  name: string;
  pokemon: { pokemon: IPokemon; slot: number }[];
}
