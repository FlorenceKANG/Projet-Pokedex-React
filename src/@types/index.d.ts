export interface IPokemon {
  name: string;
  url: string
}

export interface IPokemonList extends IPokemon {
  counter: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[] | null
}

export interface IType {
  name: string;
  url: string
}
