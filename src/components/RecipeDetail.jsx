import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { loadRecipes } from '../utils/storage';

/**
 * RecipeDetail Component
 * Displays the full details of a single recipe
 * Shows: title, description, image, ingredients list, and cooking steps
 * 
 * Uses:
 *   - useState: Manage recipe state
 *   - useEffect: Load recipe from localStorage
 *   - useParams: Get recipe ID from URL
 *   - useNavigate: Navigate back to home if recipe not found
 */
const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load recipe from localStorage when component mounts or ID changes
  useEffect(() => {
    const recipes = loadRecipes();
    const foundRecipe = recipes.find(r => r.id === id);
    
    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      // Recipe not found, redirect to home after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    setLoading(false);
  }, [id, navigate]);

  // Handle loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Handle recipe not found state
  if (!recipe) {
    return (
      <div className="not-found">
        <p>Recipe not found. Redirecting to home...</p>
      </div>
    );
  }

  return (
    <main className="recipe-detail-container">
      {/* Back to Home Button */}
      <Link to="/" className="btn btn-back">
        ← Back to Recipes
      </Link>

      <div className="recipe-detail-content">
        {/* Recipe Header with Image */}
        {recipe.image && (
          <div className="recipe-detail-image">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
              }}
            />
          </div>
        )}

        {/* Recipe Title and Description */}
        <div className="recipe-header">
          <h1>{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>
        </div>

        <div className="recipe-details">
          {/* Ingredients Section */}
          <section className="recipe-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          {/* Instructions Section */}
          <section className="recipe-section">
            <h2>Instructions</h2>
            <ol className="steps-list">
              {recipe.steps.map((step, index) => (
                <li key={index} className="step-item">
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="recipe-detail-actions">
          <Link 
            to={`/edit/${recipe.id}`}
            className="btn btn-secondary btn-large"
          >
            Edit Recipe
          </Link>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetail;
