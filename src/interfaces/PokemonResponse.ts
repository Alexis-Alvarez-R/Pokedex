export interface PokemonResponse {
  results: responsePoke[];
}

type responsePoke = {
  name: string;
  url: string;
};
