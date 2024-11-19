import { API_BASE_URL } from "../constants.js";

export const fetchMeals = async (endpoint) => {
    const root = document.getElementById("app-root");
    root.innerHTML = "<p>Loading...</p>";
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error("Failed to fetch meals");
        return await response.json();
    } catch (error) {
        root.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        console.error(error);
        return null;
    }
};
