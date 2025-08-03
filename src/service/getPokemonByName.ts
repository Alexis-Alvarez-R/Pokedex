import type { Pokemon } from "../interfaces";

export const getPokemonByName = async (name: string): Promise<Pokemon | null> => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data as Pokemon;
  } catch {
    return null;
  }
};
