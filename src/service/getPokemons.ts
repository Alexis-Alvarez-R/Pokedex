import type { Pokemon, PokemonResponse } from "../interfaces";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemons = async (page: number, limit: number): Promise<Pokemon[]> => {
  try {
    const offset = (page - 1) * limit;
    const url = `${BASE_URL}?limit=${limit}&offset=${offset}`;

    const res = await fetch(url);
    const data: PokemonResponse = await res.json();

    const details = await Promise.all(
      data.results.map(async (poke) => {
        const res = await fetch(poke.url);
        return res.json() as Promise<Pokemon>;
      })
    );

    return details;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};

export const getTotalPokemonsByType = async (type: string): Promise<number> => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!res.ok) return 0;

  const data = await res.json();
  return data.pokemon.length;
};
