export interface PokemonDetail {
  id: number;
  base_experience: number;
  name: string;
  height: number;
  weight: number;
  is_default: boolean;
  sprites: {
    back_default: string;
  };
}
