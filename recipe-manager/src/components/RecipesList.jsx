import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RecipesList = ({ refreshTrigger }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch recipes.");
        console.error(err);
      });
  }, [refreshTrigger]);

  return (
    <div>
      <h2>All Recipes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} style={{ marginBottom: "20px" }}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesList;
