import React, { useState } from "react";
import axios from "axios";

const EditRecipeForm = ({ recipe, onEditComplete }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/recipes/${recipe.id}`, updatedRecipe).then((response) => {
      onEditComplete(response.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={updatedRecipe.title}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        value={updatedRecipe.description}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditRecipeForm;
