export const addSearchEvent = (root) => {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const randomButton = document.getElementById("random-meal-button");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      window.dispatchEvent(new CustomEvent("searchQuery", { detail: query }));
    }
  });

  randomButton.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("randomMeal"));
  });
};
