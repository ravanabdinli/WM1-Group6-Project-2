import React from "react";
import RecipesList from "../components/RecipesList";

const HomePage = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to the Recipe Manager!</h1>
      <p>Explore our collection of delicious recipes below:</p>
      <RecipesList />
    </div>
  );
};

export default HomePage;
