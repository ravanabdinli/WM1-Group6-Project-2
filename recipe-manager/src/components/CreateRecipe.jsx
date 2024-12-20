import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    tags: "",
    difficulty: "Easy",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert ingredients, steps, and tags into arrays
    const formattedRecipe = {
      ...newRecipe,
      ingredients: newRecipe.ingredients.split(",").map((item) => item.trim()),
      steps: newRecipe.steps.split(".").map((item) => item.trim()),
      tags: newRecipe.tags.split(",").map((item) => item.trim()),
      lastUpdated: new Date().toISOString(),
    };

    // POST new recipe to JSON Server
    axios.post("http://localhost:3001/recipes", formattedRecipe).then((response) => {
      console.log("Recipe added:", response.data);
      navigate(`/recipe/${response.data.id}`); // Redirect to the new recipe page
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Create Recipe</h2>
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
        placeholder="Ingredients (comma-separated)"
        value={newRecipe.ingredients}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="steps"
        placeholder="Steps (separate by periods)"
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
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default CreateRecipe;
