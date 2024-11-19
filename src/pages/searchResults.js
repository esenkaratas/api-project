import { fetchMeals } from "../util/api.js";
import { backButton } from "../views/backButton.js";

export const loadSearchResults = async (root, query) => {
  const data = await fetchMeals(`search.php?s=${query}`);
  if (!data || !data.meals) {
    root.innerHTML = `<p>No results found for "${query}".</p>`;
    return;
  }

  const mealsHtml = data.meals
    .map(
      (meal) => `
        <div class="grid-card" data-meal-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
            <h3>${meal.strMeal}</h3>
        </div>`
    )
    .join("");

  root.innerHTML = `
    ${backButton()}
    <div class="grid-container">${mealsHtml}</div>`;

  document.getElementById("back-button").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("searchResultsBackButton"));
  });

  document.querySelectorAll(".grid-card").forEach((card) => {
    card.addEventListener("click", () => {
      const mealId = card.dataset.mealId;
      window.dispatchEvent(new CustomEvent("mealSelected", { detail: mealId }));
    });
  });
};
