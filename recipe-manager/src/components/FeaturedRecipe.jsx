import React from "react";
import "./FeaturedRecipe.css";

const FeaturedRecipe = ({ recipe }) => {
  return (
    <div className="featured-recipe-card">
      <div className="recipe-image-container">
        <img
          src={recipe.image || "default-placeholder.jpg"}
          alt={recipe.title}
          className="recipe-image"
        />
        <div className="recipe-overlay">
          <h3 className="recipe-title">{recipe.title}</h3>
          <p className="recipe-description">
            {recipe.description || "No description available"}
          </p>
        </div>
      </div>
      <button className="view-recipe-button">View Full Recipe</button>
    </div>
  );
};

export default FeaturedRecipe;
