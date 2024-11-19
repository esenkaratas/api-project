import { loadCategories } from "./pages/categories.js";
import { loadRecipeList } from "./pages/recipeList.js";
import { loadRecipeDetails } from "./pages/recipeDetails.js";
import { loadSearchResults } from "./pages/searchResults.js";
import { addSearchEvent } from "./views/navbar.js";
import { fetchMeals } from "./util/api.js";

const root = document.getElementById("app-root");

const init = () => {
  addSearchEvent(root);

  loadCategories(root);

  window.addEventListener("recipeListBackButton", () => {
    loadCategories(root);
  });

  window.addEventListener("searchResultsBackButton", () => {
    loadCategories(root);
  });

  window.addEventListener("recipeDetailsBackButton", () => {
    loadCategories(root);
  });

  window.addEventListener("categorySelected", (e) => {
    loadRecipeList(root, e.detail);
  });

  window.addEventListener("mealSelected", (e) => {
    const mealId = e.detail;
    root.innerHTML = "";
    loadRecipeDetails(root, mealId);
  });

  window.addEventListener("searchQuery", (e) => {
    loadSearchResults(root, e.detail);
  });

  window.addEventListener("randomMeal", async () => {
    const data = await fetchMeals("random.php");
    if (data && data.meals) {
      const mealId = data.meals[0].idMeal;
      loadRecipeDetails(root, mealId);
    }
  });
};

init();
