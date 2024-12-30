import React, { useState } from "react";
import axios from "axios";

const EditRecipeForm = ({ recipe, onEditComplete, onCancelEdit }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState({
    ...recipe,
    ingredients: recipe.ingredients.join("\n"),
    steps: recipe.steps.join(". "),
    tags: recipe.tags.join(", "),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleStepsChange = (e) => {
    const value = e.target.value;
    const formattedSteps = value
      .split(".")
      .map((step) => step.trim())
      .filter((step) => step !== "")
      .join(". ");
    setUpdatedRecipe((prevRecipe) => ({ ...prevRecipe, steps: formattedSteps }));
  };

  const handleSave = () => {
    const formattedRecipe = {
      ...updatedRecipe,
      ingredients: updatedRecipe.ingredients.split("\n").map((item) => item.trim()),
      steps: updatedRecipe.steps
        .split(".")
        .map((step) => step.trim())
        .filter((step) => step !== ""), // Split steps by period and remove empty ones
      tags: updatedRecipe.tags.split(",").map((tag) => tag.trim()),
      lastUpdated: new Date().toISOString(), // Update timestamp
    };

    axios
      .put(`http://localhost:3001/recipes/${recipe.id}`, formattedRecipe)
      .then((response) => {
        onEditComplete(response.data);
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
        alert("An error occurred while updating the recipe. Please try again.");
      });
  };

  const handleCancel = () => {
    setUpdatedRecipe({
      ...recipe,
      ingredients: recipe.ingredients.join("\n"),
      steps: recipe.steps.join(". "),
      tags: recipe.tags.join(", "),
    });
    onCancelEdit(); // Notify parent to close the edit form
  };

  return (
    <div>
      <h3>Edit Recipe</h3>

      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={updatedRecipe.title}
        onChange={handleInputChange}
        placeholder="Recipe Title"
      />

      <label>Description:</label>
      <textarea
        name="description"
        value={updatedRecipe.description}
        onChange={handleInputChange}
        placeholder="Recipe Description"
      />

      <label>Difficulty Level:</label>
      <select
        name="difficulty"
        value={updatedRecipe.difficulty}
        onChange={handleInputChange}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <label>Ingredients (one per line):</label>
      <textarea
        name="ingredients"
        value={updatedRecipe.ingredients}
        onChange={handleInputChange}
        placeholder="Enter each ingredient on a new line"
      />

      <label>Preparation Steps (end each step with a period):</label>
      <textarea
        name="steps"
        value={updatedRecipe.steps}
        onChange={handleStepsChange}
        placeholder="Enter steps separated by periods (e.g., 'Step 1. Step 2.')"
      />

      <label>Tags (comma-separated):</label>
      <input
        type="text"
        name="tags"
        value={updatedRecipe.tags}
        onChange={handleInputChange}
        placeholder="Tags (comma-separated)"
      />

      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
};

export default EditRecipeForm;
