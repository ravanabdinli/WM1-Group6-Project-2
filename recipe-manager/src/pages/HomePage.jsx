import React from "react";
import RecipesList from "../components/RecipesList";

const HomePage = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Recipe Manager</h1>
      <p>Your go-to app for managing recipes!</p>
      <RecipesList /> {/* Show the list of recipes */}
    </div>
  );
};

export default HomePage;
