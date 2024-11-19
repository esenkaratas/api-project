import { fetchMeals } from "../util/api.js";
import { backButton } from "../views/backButton.js";

export const loadRecipeList = async (root, category, page = 1) => {
  try {
    root.innerHTML = "<p>Loading recipes...</p>";

    const data = await fetchMeals(`filter.php?c=${category}`);
    if (!data || !data.meals) {
      root.innerHTML = "<p>Error loading recipes. Please try again later.</p>";
      return;
    }

    const mealsPerPage = 24;
    const totalMeals = data.meals.length;
    const totalPages = Math.ceil(totalMeals / mealsPerPage);

    const start = (page - 1) * mealsPerPage;
    const end = start + mealsPerPage;

    const mealsHtml = data.meals
      .slice(start, end)
      .map(
        (meal) => `
          <div class="grid-card" data-meal-id="${meal.idMeal}">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
              <h3>${meal.strMeal}</h3>
          </div>`
      )
      .join("");

    const paginationHtml = `
      <div class="pagination">
          ${Array.from(
            { length: totalPages },
            (_, i) =>
              `<button class="page-btn ${
                i + 1 === page ? "active" : ""
              }" data-page="${i + 1}">${i + 1}</button>`
          ).join("")}
      </div>
    `;

    root.innerHTML = `
      ${backButton()}
    <div class="grid-container">${mealsHtml}</div>${paginationHtml}`;

    document.getElementById("back-button").addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("recipeListBackButton"));
    });

    document.querySelectorAll(".page-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedPage = parseInt(btn.dataset.page, 10);
        loadRecipeList(root, category, selectedPage);
      });
    });

    document.querySelectorAll(".grid-card").forEach((card) => {
      card.addEventListener("click", () => {
        const mealId = card.dataset.mealId;
        window.dispatchEvent(
          new CustomEvent("mealSelected", { detail: mealId })
        );
      });
    });
  } catch (error) {
    root.innerHTML = `<p>An error occurred: ${error.message}</p>`;
  }
};
