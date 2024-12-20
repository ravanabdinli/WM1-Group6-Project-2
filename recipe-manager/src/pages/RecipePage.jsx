import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipePage = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the recipe details from the JSON server
    axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((err) => setError("Failed to load recipe details."));
  }, [id]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{recipe.title}</h1>
      <p><strong>Description:</strong> {recipe.description}</p>
      <p><strong>Difficulty Level:</strong> {recipe.difficulty}</p>
      <p><strong>Last Updated:</strong> {recipe.lastUpdated}</p>
      
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Preparation Steps</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <h2>Tags</h2>
      <p>{recipe.tags.join(", ")}</p>
    </div>
  );
};

export default RecipePage;
