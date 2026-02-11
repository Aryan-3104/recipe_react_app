import React from 'react';
+
/**
 * Navbar Component
 * Displays navigation links for the recipe book app
 * - Home: Shows all recipes
 * - Add Recipe: Navigate to recipe form
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* App Logo/Title */}
        <Link to="/" className="navbar-logo">
          📖 Recipe Book
        </Link>
        
        {/* Navigation Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              + Add Recipe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
