// favorites.js

const favoriteList = document.getElementById('favoriteList');

// Retrieve favorites from localStorage
let storedFavorites = localStorage.getItem('favorites');
let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

// Function to display favorite meals
function displayFavoriteMeals(favorites) {
    favoriteList.innerHTML = '';
    favorites.forEach((meal) => {
        let favoriteItem = document.createElement('li');
        favoriteItem.classList.add('favorite-item');

        // Create an image element for the thumbnail
        let thumbnail = document.createElement('img');
        thumbnail.src = meal.strMealThumb;
        thumbnail.alt = meal.strMeal;
        thumbnail.classList.add('thumbnail');

        // Add the meal name
        let mealName = document.createElement('span');
        mealName.textContent = meal.strMeal;
        mealName.classList.add('meal-name');

        // Add a "Remove" button
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => removeFromFavorites(meal));

        // Append image, meal name, and remove button to the favoriteItem
        favoriteItem.appendChild(thumbnail);
        favoriteItem.appendChild(mealName);
        favoriteItem.appendChild(removeButton);

        favoriteList.appendChild(favoriteItem);
    });
}

// Function to update the favorites list
function updateFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavoriteMeals(favorites); // Update the displayed list of favorites
}

// Function to remove a meal from favorites
function removeFromFavorites(meal) {
    favorites = favorites.filter((favMeal) => favMeal.idMeal !== meal.idMeal);
    updateFavorites();
}

// Display favorite meals
displayFavoriteMeals(favorites);