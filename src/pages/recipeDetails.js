import { fetchMeals } from "../util/api.js";
import { backButton } from "../views/backButton.js";

export const loadRecipeDetails = async (root, mealId) => {
  const data = await fetchMeals(`lookup.php?i=${mealId}`);
  if (!data || !data.meals) {
    root.innerHTML = "<p>Error loading meal details.</p>";
    return;
  }

  const meal = data.meals[0];

  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key])
    .map((key, index) => {
      const measure = meal[`strMeasure${index + 1}`] || "";
      return `<li>${measure} ${meal[key]}</li>`;
    })
    .join("");

  root.innerHTML = `
    ${backButton()}
    <div class="recipe-details">
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${
    meal.strMeal
  }" class="meal-detail-image">
        <div class="details-content">
            <div class="ingredients">
                <h3>Ingredients</h3>
                <ul>${ingredients}</ul>
            </div>
            <div class="instructions">
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    </div>
  `;

  document.getElementById("back-button").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("recipeDetailsBackButton"));
  });
};
