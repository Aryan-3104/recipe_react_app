import React from 'react';
import { Link } from 'react-router-dom';

/**
 * RecipeCard Component
 * Displays a single recipe in card format on the home page
 * Shows: title, description, image, and action buttons
 * 
 * Props:
 *   - recipe: Recipe object containing id, title, description, image, etc.
 *   - onDelete: Callback function to delete the recipe
 */
const RecipeCard = ({ recipe, onDelete }) => {
  const handleDelete = () => {
    // Show confirmation before deleting
    if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      onDelete(recipe.id);
    }
  };

  return (
    <div className="recipe-card">
      {/* Recipe Image */}
      {recipe.image && (
        <div className="recipe-card-image">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        </div>
      )}
      
      {/* Recipe Info */}
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-description">{recipe.description}</p>
        
        {/* Action Buttons */}
        <div className="recipe-card-actions">
          <Link 
            to={`/recipe/${recipe.id}`} 
            className="btn btn-primary"
          >
            View
          </Link>
          <Link 
            to={`/edit/${recipe.id}`} 
            className="btn btn-secondary"
          >
            Edit
          </Link>
          <button 
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
