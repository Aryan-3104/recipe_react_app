import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import { seedIfEmpty } from './utils/storage';

/**
 * App Component - Main Application Root
 * 
 * Responsibilities:
 *   1. Set up React Router with all routes
 *   2. Initialize localStorage with sample recipes if empty
 *   3. Render Navbar and route content
 * 
 * Routes:
 *   - / : RecipeList (show all recipes)
 *   - /add : RecipeForm (create new recipe)
 *   - /edit/:id : RecipeForm (edit existing recipe)
 *   - /recipe/:id : RecipeDetail (view recipe details)
 */
const App = () => {
  // Initialize app data on first load
  useEffect(() => {
    seedIfEmpty();
  }, []);

  return (
    <Router>
      <div className="app">
        {/* Navigation Bar - visible on all pages */}
        <Navbar />

        {/* Route Configuration */}
        <Routes>
          {/* Home Page - List all recipes */}
          <Route path="/" element={<RecipeList />} />

          {/* Add Recipe Page */}
          <Route path="/add" element={<RecipeForm />} />

          {/* Edit Recipe Page - Dynamic route with recipe ID */}
          <Route path="/edit/:id" element={<RecipeForm />} />

          {/* Recipe Detail Page - Dynamic route with recipe ID */}
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
