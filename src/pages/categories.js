import { fetchMeals } from "../util/api.js";

export const loadCategories = async (root) => {
  const data = await fetchMeals("categories.php");
  if (!data || !data.categories) {
    root.innerHTML = "<p>Error loading categories.</p>";
    return;
  }

  const categoriesHtml = data.categories
    .map(
      (category) => `
        <div class="grid-card category-card" data-category="${category.strCategory}">
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="category-image">
            <h3>${category.strCategory}</h3>
        </div>`
    )
    .join("");

  root.innerHTML = `<div class="grid-container">${categoriesHtml}</div>`;

  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      const selectedCategory = card.dataset.category;
      window.dispatchEvent(
        new CustomEvent("categorySelected", { detail: selectedCategory })
      );
    });
  });
};
