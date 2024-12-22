import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [sortOption, setSortOption] = useState("lastUpdated");

  useEffect(() => {
    // Fetch recipes from the backend
    axios.get("http://localhost:3001/recipes").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilterTag = (e) => {
    setFilterTag(e.target.value);
  };

  const handleFilterDifficulty = (e) => {
    setFilterDifficulty(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // Filter and sort recipes
  const filteredAndSortedRecipes = recipes
    .filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchQuery) ||
        recipe.description.toLowerCase().includes(searchQuery) ||
        recipe.ingredients.join(" ").toLowerCase().includes(searchQuery)
    )
    .filter((recipe) =>
      filterTag ? recipe.tags.includes(filterTag) : true
    )
    .filter((recipe) =>
      filterDifficulty ? recipe.difficulty === filterDifficulty : true
    )
    .sort((a, b) => {
      if (sortOption === "lastUpdated") {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortOption === "difficulty") {
        return a.difficulty.localeCompare(b.difficulty);
      }
      return 0;
    });

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

      <div>
        <h2>Create Recipe</h2>
        <Link to="/create" style={{ textDecoration: "none", color: "#007bff" }}>
          Create a New Recipe
        </Link>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h3>Search Recipes</h3>
        <input
          type="text"
          placeholder="Search by title, description, or ingredients..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Filter Recipes</h3>
        <div>
          <label>Filter by Tag:</label>
          <input
            type="text"
            placeholder="Enter tag"
            value={filterTag}
            onChange={handleFilterTag}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Filter by Difficulty:</label>
          <select
            value={filterDifficulty}
            onChange={handleFilterDifficulty}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Sort Recipes</h3>
        <select
          value={sortOption}
          onChange={handleSort}
          style={{ padding: "5px" }}
        >
          <option value="lastUpdated">Last Updated</option>
          <option value="title">Title</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>

      <div>
        <h2>All Recipes</h2>
        {filteredAndSortedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <h3>
              <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: "none", color: "#007bff" }}>
                {recipe.title}
              </Link>
            </h3>
            <p>{recipe.description}</p>
            <p>
              <strong>Difficulty:</strong> {recipe.difficulty}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(recipe.lastUpdated).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
