import React, { useEffect, useState } from "react";
import axios from "axios";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => setError("Failed to load recipes."));
  }, []);

  return (
    <div>
      <h2>All Recipes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            <p>Steps: {recipe.steps.join(" → ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesList;
