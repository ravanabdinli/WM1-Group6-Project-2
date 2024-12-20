import React from "react";
import CreateRecipe from "../components/CreateRecipe";

const CreateRecipePage = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Create a New Recipe</h1>
      <CreateRecipe />
    </div>
  );
};

export default CreateRecipePage;
