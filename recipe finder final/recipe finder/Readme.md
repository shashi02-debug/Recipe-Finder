#Recipe Finder
📖 Overview

Deciding what to cook with the ingredients on hand can be time-consuming. Recipe Finder solves this by letting users type in the ingredients they have, then instantly fetching matching recipes — complete with images, titles, and full cooking instructions — using the Spoonacular API.

Key Features

-> 🔎 Ingredient-based search — enter ingredients (comma-separated) and get matching recipes
-> ⌨️ Press Enter to trigger a search (no need to click the button)
-> 🖼️ Dynamic recipe cards with images and titles
-> 📋 Click a recipe to view full details: servings, ingredients list, and step-by-step instructions
-> 🍛 A curated "Famous Recipes in India" page
-> 📰 Blog, About, Contact, and Settings pages
-> 📱 Responsive design for desktop and mobile

🗂️ Project Structure

recipe finder/
├── index.html              # Home page — ingredient search & recipe results
├── recipes.html            # Famous Recipes in India page
├── blog.html                # Blog page
├── about.html                # About Us page
├── contact.html              # Contact Us page
├── settings.html              # Settings page
├── styles.css                # Global stylesheet
├── script.js                 # Core logic — Spoonacular API calls & rendering
├── food.jpeg / food1.jpg      # Images used across the site
└── new text document.txt      # Scratch/notes file

🛠️ Tech Stack

Layer                  	    Technology
Structure	                    HTML5
Styling	           CSS3 (custom styles + Google Fonts — Poppins)
Interactivity	      Vanilla JavaScript (Fetch API)
Recipe Data	              Spoonacular API
Storage	Browser    localStorage (for passing recipe IDs between views)

There is no custom backend — the frontend calls the Spoonacular API directly, which keeps the app lightweight and easy to run with no server setup.

⚙️ How It Works

1. Search — The user types ingredients into the input box on the home page and hits Enter or clicks search.
2. Fetch — script.js calls the Spoonacular findByIngredients endpoint with the input.
3. Display — Matching recipes are rendered as cards (image + title) in the results area.
4. Details — Clicking a recipe card calls the Spoonacular /recipes/{id}/information endpoint and renders the full recipe: image, servings, ingredient list, and instructions.
5. Navigation — A "Back to Recipes" button returns the user to the search view.

js
// Simplified core flow (script.js)
const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${input}&number=50&apiKey=${API_KEY}`;
const response = await fetch(apiUrl);
const data = await response.json();
displayResults(data);

🚀 Getting Started

This is a static site — no build step or server required.

1. Clone or download the repository.
2. Get a free API key from Spoonacular.
3. Open script.js and replace the API_KEY value with your own key:
js
   const API_KEY = "YOUR_SPOONACULAR_API_KEY";
4. Open index.html directly in your browser, or serve the folder with a simple local server (recommended, to avoid any CORS/file:// quirks):
bash
   # Python 3
   python -m http.server 8000
5. Visit http://localhost:8000 and start searching for recipes!

⚠️ Security note: The current code has the Spoonacular API key hardcoded directly in script.js. For any public or production deployment, move the key to a backend proxy or environment variable instead of committing it to the repo, since anyone viewing the page source can see it.

🔮 Future Enhancements

🎙️ Voice search for ingredients (Web Speech API)
🥫 Real-time pantry/inventory tracking
🛒 Integration with grocery delivery apps for missing ingredients
🌐 Multilingual and regional recipe support
🧠 Deep learning–based taste-profile personalization
🔐 A lightweight backend (Node.js + Express) to proxy API requests and hide the API key

📚 References

Key references include Ricci, Rokach & Shapira's Recommender Systems Handbook, Trattner & Elsweiler's work on food recommender systems, and the official Spoonacular API documentation.
