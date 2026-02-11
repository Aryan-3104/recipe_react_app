// ============================================
// Storage Utility for Recipe Management
// ============================================
// This utility manages all localStorage operations
// for persisting recipes between sessions.

const STORAGE_KEY = 'recipes';

/**
 * Load all recipes from localStorage
 * @returns {Array} Array of recipe objects
 */
export const loadRecipes = () => {
  try {
    const recipes = localStorage.getItem(STORAGE_KEY);
    return recipes ? JSON.parse(recipes) : [];
  } catch (error) {
    console.error('Error loading recipes:', error);
    return [];
  }
};

/**
 * Save recipes to localStorage
 * @param {Array} recipes - Array of recipe objects to save
 */
export const saveRecipes = (recipes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error('Error saving recipes:', error);
  }
};

/**
 * Seed localStorage with initial sample recipes if it's empty
 * Provides demo data for first-time users
 */
export const seedIfEmpty = () => {
  const recipes = loadRecipes();
  
  // Only seed if no recipes exist
  if (recipes.length === 0) {
    const sampleRecipes = [
      {
        id: '1',
        title: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
        ingredients: [
          '400g spaghetti',
          '200g pancetta or guanciale',
          '4 large eggs',
          '100g Pecorino Romano cheese',
          'Black pepper to taste',
          'Salt for pasta water'
        ],
        steps: [
          'Bring a large pot of salted water to boil',
          'Cut pancetta into small cubes and fry until crispy',
          'Cook spaghetti in boiling water until al dente',
          'Whisk eggs with grated cheese in a bowl',
          'Drain pasta and mix with hot pancetta and fat',
          'Remove from heat and add egg mixture, stirring quickly',
          'Season with black pepper and serve immediately'
        ],
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400'
      },
      {
        id: '2',
        title: 'Chocolate Chip Cookies',
        description: 'Soft and chewy cookies loaded with chocolate chips',
        ingredients: [
          '2 1/4 cups all-purpose flour',
          '1 tsp baking soda',
          '1 tsp salt',
          '1 cup butter, softened',
          '3/4 cup granulated sugar',
          '3/4 cup packed brown sugar',
          '2 large eggs',
          '2 tsp vanilla extract',
          '2 cups chocolate chips'
        ],
        steps: [
          'Preheat oven to 375°F (190°C)',
          'Mix flour, baking soda, and salt in a small bowl',
          'Beat butter and sugars until creamy',
          'Add eggs and vanilla to butter mixture and beat well',
          'Gradually blend in flour mixture',
          'Stir in chocolate chips',
          'Drop rounded tablespoons onto baking sheets',
          'Bake for 9-11 minutes until golden brown',
          'Cool on baking sheets for 2 minutes, then transfer to wire racks'
        ],
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400'
      },
      {
        id: '3',
        title: 'Vegetable Stir Fry',
        description: 'Quick and healthy Asian-inspired vegetable dish',
        ingredients: [
          '2 tbsp vegetable oil',
          '3 cloves garlic, minced',
          '1 onion, sliced',
          '2 cups broccoli florets',
          '1 red bell pepper, sliced',
          '1 cup snap peas',
          '2 carrots, julienned',
          '3 tbsp soy sauce',
          '1 tbsp ginger, minced',
          'Sesame oil for finishing'
        ],
        steps: [
          'Heat oil in a large wok or skillet over high heat',
          'Add garlic and ginger, stir-fry for 30 seconds',
          'Add onions and carrots, stir-fry for 2 minutes',
          'Add broccoli and bell pepper, continue stir-frying',
          'Add snap peas and stir-fry for another 2 minutes',
          'Pour soy sauce and toss everything together',
          'Cook until vegetables are tender-crisp, about 1-2 minutes',
          'Drizzle with sesame oil and serve immediately over rice'
        ],
        image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400'
      }
    ];
    
    saveRecipes(sampleRecipes);
  }
};
