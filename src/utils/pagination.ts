import type { PaginationOptions } from "../interfaces";

export const renderPagination = (
  container: HTMLElement,
  { currentPage, totalPages, maxButtons, onPageChange }: PaginationOptions
): void => {
  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  const prevButton = document.createElement("button");
  prevButton.textContent = "Anterior";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => onPageChange(currentPage - 1));
  fragment.appendChild(prevButton);

  const halfRange = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = String(i);
    pageButton.disabled = i === currentPage;
    pageButton.classList.toggle("active", i === currentPage);

    pageButton.addEventListener("click", () => onPageChange(i));
    fragment.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Siguiente";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => onPageChange(currentPage + 1));
  fragment.appendChild(nextButton);

  container.appendChild(fragment);
};
