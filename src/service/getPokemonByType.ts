import type { Pokemon } from "../interfaces";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonsByType = async (type: string, page: number, limit: number): Promise<Pokemon[]> => {
  const res = await fetch(`${BASE_URL}/type/${type}`);
  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  const offset = (page - 1) * limit;
  const slice = data.pokemon.slice(offset, offset + limit);

  const details = await Promise.all(
    slice.map(async (p: { pokemon: { url: string } }) => {
      const res = await fetch(p.pokemon.url);
      return res.json() as Promise<Pokemon>;
    })
  );

  return details;
};

export const getTotalPokemonsByType = async (type: string): Promise<number> => {
  const res = await fetch(`${BASE_URL}/type/${type}`);
  if (!res.ok) return 0;

  const data = await res.json();
  return data.pokemon.length;
};
