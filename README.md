# Recipe Book

A modern, user-friendly React application for managing and organizing your favorite recipes. Store, view, edit, and delete recipes with ease, all while keeping your data locally on your device.

## Features

- **View Recipes**: Browse through your collection of recipes with beautiful card layouts
- **Add New Recipes**: Create new recipes with ingredients, steps, and images
- **Edit Recipes**: Modify existing recipes to update ingredients or instructions
- **Delete Recipes**: Remove recipes you no longer need
- **Local Storage**: All data is stored locally in your browser - no account required
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Sample Data**: Comes pre-loaded with sample recipes to get you started

## Technologies Used

- **React**: Frontend framework for building the user interface
- **React Router**: Client-side routing for navigation
- **localStorage**: Browser-based data persistence
- **CSS**: Custom styling for a polished look

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd reactApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Viewing Recipes
- On the homepage, you'll see all your recipes displayed in cards
- Each card shows the recipe title, description, and image
- Click "View" to see full recipe details

### Adding a Recipe
- Click the "Add Recipe" button in the navigation
- Fill in the recipe title, description, ingredients, and steps
- Optionally add an image URL
- Click "Save Recipe" to add it to your collection

### Editing a Recipe
- From the recipe card, click "Edit"
- Make your changes and save

### Deleting a Recipe
- Click the "Delete" button on any recipe card
- Confirm the deletion when prompted

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar
│   ├── RecipeList.jsx      # Homepage with recipe grid
│   ├── RecipeCard.jsx      # Individual recipe card
│   ├── RecipeForm.jsx      # Form for adding/editing recipes
│   └── RecipeDetail.jsx    # Detailed recipe view
├── utils/
│   └── storage.js          # localStorage utilities
├── App.js                  # Main app component with routing
├── index.js                # App entry point
└── index.css               # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- Sample recipe images from Unsplash
- Icons and styling inspired by modern web design trends
