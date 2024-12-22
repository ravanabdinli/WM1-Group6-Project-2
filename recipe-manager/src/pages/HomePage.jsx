import React from "react";
import RecipesList from "../components/RecipesList";
import FeaturedRecipe from "../components/FeaturedRecipe";

const HomePage = () => {
  const featuredRecipe = {
    title: "Spaghetti Bolognese",
    ingredients: ["spaghetti", "ground beef", "tomato sauce"],
    steps: ["Boil water", "Cook pasta", "Prepare sauce", "Serve"]
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Recipe Manager!</h1>
      <FeaturedRecipe recipe={featuredRecipe} />
      <RecipesList />
    </div>
  );
};

export default HomePage;
