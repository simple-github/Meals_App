const mealDetail = document.getElementById('mealDetail');

// Function to display meal details
function displayMealDetails(meal) {
    mealDetail.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
    `;
}

// Get the meal ID from the URL
let urlParams = new URLSearchParams(window.location.search);
let mealId = urlParams.get('id');

// Fetch meal details by ID and display them
async function fetchAndDisplayMealDetails() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let data = await response.json();
        let meal = data.meals[0];
        displayMealDetails(meal);
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}

// Call the function to fetch and display meal details
fetchAndDisplayMealDetails();
