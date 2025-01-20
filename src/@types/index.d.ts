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

export interface ITypeWithPokemons {
  dramage_relations: any;
  game_indices: any;
  generation: any;
  id: number;
  move_damage_class: any;
  moves: any;
  name: string;
  names: any;
  past_damage_relations: any;
  pokemon: [{ pokemon: IPokemon[], slot: number }];
  sprites: any
}
