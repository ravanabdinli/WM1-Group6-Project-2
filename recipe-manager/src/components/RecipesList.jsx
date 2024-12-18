import React, { useEffect, useState } from "react";
import axios from "axios";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]); // State to hold recipe data
  const [error, setError] = useState(null);   // State to handle errors

  useEffect(() => {
    // Fetch data from JSON Server
    axios.get("http://localhost:3000/recipes")
      .then((response) => {
        setRecipes(response.data); // Set recipes to the state
        console.log("Recipes fetched successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch recipes. Please try again.");
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Recipe List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recipes.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              style={{
                margin: "20px 0",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{recipe.title}</h3>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p><strong>Steps:</strong></p>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default RecipesList;
