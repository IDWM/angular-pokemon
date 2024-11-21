import { Pokemon } from './pokemon';

export interface PokemonData {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
