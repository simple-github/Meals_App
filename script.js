/// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const favoriteList = document.getElementById('favoriteList');
    
    var favorites = [];
    
    // Function to fetch meals from API
    async function searchMeals(query) {
        // If the query is empty or null, return all meals
        if (!query || query.trim() === '') {
            try {
                let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
                let data = await response.json();
                return data.meals || [];
            } catch (error) {
                alert("TheMealDb API Down");
                console.error('Error fetching data:', error);
                return [];
            }
        } else {
            // Use fetch to get data from TheMeal API with the query provided
            try {
                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
                let data = await response.json();
                return data.meals || [];
            } catch (error) {
                alert("TheMealDb API Down");
                console.error('Error fetching data:', error);
                return [];
            }
        }
    }
    
    // Function to display search results with thumbnails
    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        results.forEach((meal) => {
            let resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
    
            // Creating an image element for the thumbnail
            let thumbnail = document.createElement('img');
            thumbnail.src = meal.strMealThumb;
            thumbnail.alt = meal.strMeal;
            thumbnail.classList.add('thumbnail');
            resultItem.appendChild(thumbnail);
    
            // Creating a div to hold the meal name and "Favorite" button
            let infoContainer = document.createElement('div');
            infoContainer.classList.add('info-container');
    
            // Adding the meal name
            let mealName = document.createElement('div');
            mealName.textContent = meal.strMeal;
            mealName.classList.add('meal-name');
            infoContainer.appendChild(mealName);
    
            // Adding a "Favorite" button
            let favoriteButton = document.createElement('button');
            favoriteButton.textContent = 'Favorite';
            favoriteButton.addEventListener('click', () => addToFavorites(meal));
            infoContainer.appendChild(favoriteButton);
    
            // event listener to open the meal detail page in a new tab
            thumbnail.addEventListener('click', () => openMealDetailPage(meal));
            resultItem.appendChild(infoContainer);
            searchResults.appendChild(resultItem);
        });
    }
    
    // Function to open the meal detail page in a new tab
    function openMealDetailPage(meal) {
        let url = `meal_detail.html?id=${meal.idMeal}`;
        window.open(url, '_blank');
    }
    
// Function to add a meal to favorites
function addToFavorites(meal) {
    if (!favorites.some(favMeal => favMeal.idMeal === meal.idMeal)) {
        favorites.push(meal);
        updateFavorites();
        alert(`${meal.strMeal} added to favorites!`);
        console.log("added");
    } else {
        alert(`${meal.strMeal} is already in your favorites!`);
    }
}  
    // Function to updateFavorites
    function updateFavorites() {
        if (favoriteList) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
            favoriteList.innerHTML = '';
            favorites.forEach((meal) => {
                let favoriteItem = document.createElement('li');
                favoriteItem.classList.add('favorite-item');
                favoriteItem.textContent = meal.strMeal;
            });
        }
    }
    //retrieve favorites from localStorage when app is init. 
    if (localStorage.getItem('favorites')) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
        updateFavorites();
    }
    
    // Event listener for search input
    searchInput.addEventListener('input', async (e) => {
        let query = e.target.value;
        let results = await searchMeals(query);
        displaySearchResults(results);
    });
    // Initial favorites list display
    updateFavorites();
    });
