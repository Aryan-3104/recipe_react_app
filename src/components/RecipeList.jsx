import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { loadRecipes, saveRecipes } from '../utils/storage';

/**
 * RecipeList Component
 * Displays all recipes on the homepage
 * 
 * Uses:
 *   - useState: Manage recipes state
 *   - useEffect: Load recipes from localStorage on mount
 */
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  // Load recipes from localStorage when component mounts
  useEffect(() => {
    const loadedRecipes = loadRecipes();
    setRecipes(loadedRecipes);
  }, []);

  /**
   * Handle recipe deletion
   * Removes recipe from state and saves to localStorage
   */
  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    saveRecipes(updatedRecipes);
  };

  return (
    <main className="recipe-list-container">
      {/* Page Header */}
      <div className="page-header">
        <h1>All Recipes</h1>
        <p>Explore our collection of delicious recipes</p>
      </div>

      {/* Recipes Display */}
      {recipes.length > 0 ? (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        // Empty State Message
        <div className="empty-state">
          <p>No recipes yet. Create your first recipe!</p>
        </div>
      )}
    </main>
  );
};

export default RecipeList;
