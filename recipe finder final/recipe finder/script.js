const API_KEY = "6c5a25a60ec7455a9dfa4f5f1d653f06"; // Replace with your actual Spoonacular API key

// Allow pressing "Enter" to trigger recipe search
document.getElementById("ingredientInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        findRecipes();
    }
});

async function findRecipes() {
    const input = document.getElementById("ingredientInput").value;
    if (!input) {
        alert("Please enter at least one ingredient.");
        return;
    }

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${input}&number=50&apiKey=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Failed to fetch recipes. Try again later.");
    }
}

function displayResults(recipes) {
    const resultDiv = document.getElementById("recipeResults");
    resultDiv.innerHTML = "";

    if (recipes.length === 0) {
        resultDiv.innerHTML = "<p>No matching recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement("div");
        recipeElement.classList.add("recipe");

        // Ensure the name is shown below the image
        recipeElement.innerHTML = `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" onclick="getRecipeDetails(${recipe.id})">
                <h3 class="recipe-title">${recipe.title}</h3>
            </div>
        `;

        resultDiv.appendChild(recipeElement);
    });
}

async function getRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const recipe = await response.json();

        showRecipeDetails(recipe);
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        alert("Failed to fetch recipe details. Try again later.");
    }
}

function showRecipeDetails(recipe) {
    const resultDiv = document.getElementById("recipeResults");
    resultDiv.innerHTML = `
        <div class="recipe-detail">
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-detail-image">
            <h3>Servings: ${recipe.servings}</h3>
            <h3>Ingredients:</h3>
            <ul>${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}</ul>
            <h3>Instructions:</h3>
            <p>${recipe.instructions || "No instructions available."}</p>
            <button onclick="findRecipes()">Back to Recipes</button>
        </div>
    `;
}
