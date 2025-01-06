import React, { useState } from "react";
import axios from "axios";

const CreateRecipe = ({ onRecipeAdded }) => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    tags: "",
    difficulty: "Easy",
    image: "", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if image field is empty and notify the user
    if (!newRecipe.image.trim()) {
      alert(
        "The submitted recipe will be demonstrated without a picture. You may later change it by simply using the Edit Recipe feature of the app!"
      );
    }

    // Format ingredients, steps, and tags
    const formattedRecipe = {
      ...newRecipe,
      ingredients: newRecipe.ingredients.split(",").map((item) => item.trim()),
      steps: newRecipe.steps.split(".").map((item) => item.trim()),
      tags: newRecipe.tags.split(",").map((item) => item.trim()),
      lastUpdated: new Date().toISOString(),
    };

    // POST new recipe to JSON server
    axios
      .post("http://localhost:3001/recipes", formattedRecipe)
      .then((response) => {
        console.log("Recipe added:", response.data);
        alert("Recipe has been successfully submitted!"); // Popup alert
        onRecipeAdded(response.data);
        setNewRecipe({
          title: "",
          description: "",
          ingredients: "",
          steps: "",
          tags: "",
          difficulty: "Easy",
          image: "", // Reset image field
        });
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
        alert("Failed to submit the recipe. Please try again."); // Error popup
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={newRecipe.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Recipe Description"
        value={newRecipe.description}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="ingredients"
        placeholder="Enter ingredients (comma-separated)"
        value={newRecipe.ingredients}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="steps"
        placeholder="Enter Steps (one per line, end each step with a full stop)"
        value={newRecipe.steps}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={newRecipe.tags}
        onChange={handleInputChange}
      />
      <select name="difficulty" value={newRecipe.difficulty} onChange={handleInputChange}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newRecipe.image}
        onChange={handleInputChange}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default CreateRecipe;
