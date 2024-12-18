import React from "react";
import HomePage from "./pages/HomePage";
import RecipesList from "./components/RecipesList.jsx";

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
