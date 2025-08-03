import { pokemonType } from "../pokemonType";
import { validateId } from "./validateId";
import { conversion } from "./conversiones";
import type { Pokemon } from "../interfaces";

export const renderPokemons = (pokemons: Pokemon[]): void => {
  const containerCard = document.querySelector(".container__pokemon") as HTMLDivElement;
  const fragment = document.createDocumentFragment();

  pokemons.forEach((pokemon) => {
    const type1: string = pokemon.types[0]?.type.name ?? "normal";
    const type2: string = pokemon.types[1]?.type.name ?? null;
    const colorBackground = pokemonType.get(type1) || "#ccc";

    const template = document.getElementById("template__card") as HTMLTemplateElement;
    const cloneTemplate = template.content.cloneNode(true) as DocumentFragment;

    const background = cloneTemplate.querySelector(".background__card") as HTMLDivElement;
    background.style.setProperty("background-image", `radial-gradient(circle, ${colorBackground} 0%, black 80%)`);

    const img = cloneTemplate.querySelector(".img__card") as HTMLImageElement;
    img.setAttribute("src", pokemon.sprites.front_default);
    img.setAttribute("alt", pokemon.name);

    const numeroPokemon = cloneTemplate.querySelector(".id") as HTMLParagraphElement;
    numeroPokemon.textContent = validateId(pokemon.id);

    const namePokemon = cloneTemplate.querySelector(".name") as HTMLParagraphElement;
    namePokemon.textContent = pokemon.name;

    const weightPokemon = cloneTemplate.querySelector(".weight") as HTMLParagraphElement;
    weightPokemon.textContent = `${conversion(pokemon.weight)} kg`;

    const heightPokemon = cloneTemplate.querySelector(".height") as HTMLParagraphElement;
    heightPokemon.textContent = `${conversion(pokemon.height)} M`;

    const TypesPokemon = cloneTemplate.querySelector(".types") as HTMLDivElement;
    TypesPokemon.innerHTML = type2
      ? `<p class="type ${type1}">${type1}</p>
         <p class="type secundary__type ${type2}">${type2}</p>`
      : `<p class="type primary__type ${type1}">${type1}</p>`;

    fragment.appendChild(cloneTemplate);
  });

  containerCard.innerHTML = "";
  containerCard.appendChild(fragment);
};
