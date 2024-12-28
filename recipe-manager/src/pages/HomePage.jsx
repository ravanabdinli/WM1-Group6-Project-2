import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the backend
    axios.get("http://localhost:3001/recipes").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCheckboxChange = (id) => {
    setSelectedRecipes((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((recipeId) => recipeId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleShare = () => {
    const selectedRecipeData = recipes.filter((recipe) =>
      selectedRecipes.includes(recipe.id)
    );
    const jsonData = JSON.stringify(selectedRecipeData, null, 2);

    // Open the user's default email client with the JSON data
    const emailBody = encodeURIComponent(`Here are the recipes in JSON format:\n\n${jsonData}`);
    window.location.href = `mailto:?subject=Shared Recipes&body=${emailBody}`;
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1>Welcome to Recipe Manager!</h1>
      <p>Your go-to app for managing recipes!</p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Search Recipes</h3>
        <input
          type="text"
          placeholder="Search by title, description, or ingredients..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
      </div>

      <div>
        <h2>All Recipes</h2>
        {recipes
          .filter(
            (recipe) =>
              recipe.title.toLowerCase().includes(searchQuery) ||
              recipe.description.toLowerCase().includes(searchQuery)
          )
          .map((recipe) => (
            <div
              key={recipe.id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <input
                type="checkbox"
                checked={selectedRecipes.includes(recipe.id)}
                onChange={() => handleCheckboxChange(recipe.id)}
                style={{ marginRight: "10px" }}
              />
              <h3>
                <Link
                  to={`/recipe/${recipe.id}`}
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  {recipe.title}
                </Link>
              </h3>
              <p>{recipe.description}</p>
            </div>
          ))}
      </div>

      {selectedRecipes.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleShare}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Share Selected Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
