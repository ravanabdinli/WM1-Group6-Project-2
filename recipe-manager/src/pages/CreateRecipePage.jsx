import React from "react";
import CreateRecipe from "../components/CreateRecipe";
import "./CreateRecipePage.css";

const CreateRecipePage = ({ onRecipeAdded }) => {
  return (
    <div className="create-recipe-page">
      <div className="create-recipe-container">
        <h1>📝Create a New Recipe📝</h1>
        <CreateRecipe onRecipeAdded={onRecipeAdded} />
      </div>
    </div>
  );
};

export default CreateRecipePage;
