import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadRecipes, saveRecipes } from '../utils/storage';

/**
 * RecipeForm Component
 * Used for both creating new recipes and editing existing ones
 * 
 * Uses:
 *   - useState: Manage form fields and validation
 *   - useEffect: Load recipe data if editing
 *   - useParams: Get recipe ID from URL (if editing)
 *   - useNavigate: Navigate to detail page after save
 */
const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEditing);

  // Load recipe data if editing
  useEffect(() => {
    if (isEditing) {
      const recipes = loadRecipes();
      const recipe = recipes.find(r => r.id === id);
      
      if (recipe) {
        setFormData({
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients.join('\n'),
          steps: recipe.steps.join('\n'),
          image: recipe.image || ''
        });
      }
      setLoading(false);
    }
  }, [id, isEditing]);

  /**
   * Handle input field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'At least one ingredient is required';
    }
    if (!formData.steps.trim()) {
      newErrors.steps = 'At least one step is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const recipes = loadRecipes();
    
    // Parse ingredients and steps from textarea (split by newlines)
    const ingredients = formData.ingredients
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');
    
    const steps = formData.steps
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');

    if (isEditing) {
      // Update existing recipe
      const updatedRecipes = recipes.map(recipe => {
        if (recipe.id === id) {
          return {
            ...recipe,
            title: formData.title,
            description: formData.description,
            ingredients,
            steps,
            image: formData.image
          };
        }
        return recipe;
      });
      saveRecipes(updatedRecipes);
      navigate(`/recipe/${id}`);
    } else {
      // Create new recipe
      const newRecipe = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        ingredients,
        steps,
        image: formData.image
      };
      recipes.push(newRecipe);
      saveRecipes(recipes);
      navigate(`/recipe/${newRecipe.id}`);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main className="recipe-form-container">
      <div className="form-wrapper">
        <h1>{isEditing ? 'Edit Recipe' : 'Add New Recipe'}</h1>

        <form onSubmit={handleSubmit} className="recipe-form">
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title">Recipe Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Chocolate Chip Cookies"
              className={errors.title ? 'form-input error' : 'form-input'}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the recipe..."
              rows="3"
              className={errors.description ? 'form-input error' : 'form-input'}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Image URL Field */}
          <div className="form-group">
            <label htmlFor="image">Image URL (optional)</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="form-input"
            />
            <small>Paste a URL to an image of your recipe</small>
          </div>

          {/* Ingredients Field */}
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients * (one per line)</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="2 cups flour&#10;1 tsp salt&#10;1 cup sugar&#10;..."
              rows="6"
              className={errors.ingredients ? 'form-input error' : 'form-input'}
            />
            {errors.ingredients && <span className="error-message">{errors.ingredients}</span>}
          </div>

          {/* Steps Field */}
          <div className="form-group">
            <label htmlFor="steps">Cooking Steps * (one per line)</label>
            <textarea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="Preheat oven to 375°F&#10;Mix dry ingredients&#10;Add wet ingredients&#10;..."
              rows="6"
              className={errors.steps ? 'form-input error' : 'form-input'}
            />
            {errors.steps && <span className="error-message">{errors.steps}</span>}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-large">
              {isEditing ? 'Update Recipe' : 'Add Recipe'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="btn btn-secondary btn-large"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RecipeForm;
