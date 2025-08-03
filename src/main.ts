import { getPokemons, getPokemonsByType, getTotalPokemonsByType, getPokemonByName } from "./service";
import { renderPokemons } from "./utils/renderPokemon";
import { renderPagination } from "./utils/pagination";

const containerPagination = document.querySelector(".container__pagination") as HTMLDivElement;

const containerButtons = document.querySelectorAll(".button");
const searchInput = document.getElementById("search") as HTMLInputElement;
const searchButton = document.querySelector(".search__button") as HTMLDivElement;

const limit = 20;
const maxButtons = 5;

let currentPage = 1;
let currentType: string | null = null;
let isSearching = false;

const loadPage = async (page: number): Promise<void> => {
  currentPage = page;

  if (isSearching) {
    return;
  }

  if (!currentType) {
    const pokemons = await getPokemons(page, limit);
    renderPokemons(pokemons);

    renderPagination(containerPagination, {
      currentPage,
      totalPages: 50,
      maxButtons,
      onPageChange: loadPage,
    });
  } else {
    const pokemons = await getPokemonsByType(currentType, page, limit);
    renderPokemons(pokemons);

    const totalForType = await getTotalPokemonsByType(currentType);
    const totalPages = Math.ceil(totalForType / limit);

    renderPagination(containerPagination, {
      currentPage,
      totalPages,
      maxButtons,
      onPageChange: (newPage) => loadPage(newPage),
    });
  }
};

containerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.id.toLowerCase();
    currentType = type === "all" ? null : type;
    isSearching = false;
    loadPage(1);
  });
});

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  isSearching = true;
  currentType = null;

  const result = await getPokemonByName(query);

  if (result) {
    renderPokemons([result]);
    containerPagination.innerHTML = ""; // ocultamos paginación
  } else {
    const containerCard = document.querySelector(".container__pokemon") as HTMLDivElement;
    containerCard.innerHTML = "<p>No se encontró el Pokémon</p>";
    containerPagination.innerHTML = "";
  }
});

loadPage(1);
