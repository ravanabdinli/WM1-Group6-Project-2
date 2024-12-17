import React from 'react';
import featuredImage from '../assets/featured-recipe.jpg';

const FeaturedRecipe = () => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px' }}>
      <img
        src={featuredImage}
        alt="Featured Recipe"
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <h3>Spaghetti Carbonara</h3>
      <p>
        A classic Italian pasta dish made with eggs, cheese, pancetta, and
        pepper.
      </p>
      <a
        href="https://example.com/spaghetti-carbonara"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        View Recipe
      </a>
    </div>
  );
};

export default FeaturedRecipe;
