import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditRecipeForm.css";

const EditRecipeForm = ({ onEditComplete }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [updatedRecipe, setUpdatedRecipe] = useState(location.state?.recipe || null);

  // Refs
  const descriptionRef = useRef(null);
  const ingredientsRef = useRef(null);
  const stepsRef = useRef(null);
  const tagsRef = useRef(null);

  // 1) Fetch if not passed via location.state
  useEffect(() => {
    if (!updatedRecipe) {
      axios
        .get(`http://localhost:3001/recipes/${id}`)
        .then((response) => {
          // Suppose response.data.ingredients, steps, tags are arrays from the server
          setUpdatedRecipe(response.data);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
          alert("Recipe not found. Please try again.");
        });
    }
  }, [id, updatedRecipe]);

  // Adjust textareas on load/update
  useEffect(() => {
    [descriptionRef, ingredientsRef, stepsRef, tagsRef].forEach((ref) => {
      if (ref.current) adjustTextareaHeight(ref.current);
    });
  }, [updatedRecipe]);

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Run after updatedRecipe is set
  useEffect(() => {
    adjustTextareaHeight(descriptionRef.current);
    adjustTextareaHeight(ingredientsRef.current);
    adjustTextareaHeight(stepsRef.current);
    adjustTextareaHeight(tagsRef.current);
  }, [updatedRecipe]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value; // multiline text
    setUpdatedRecipe((prev) => ({ ...prev, [field]: value }));
    adjustTextareaHeight(e.target);
  };

  const handleTagsChange = (e) => {
    const value = e.target.value; // comma-separated
    setUpdatedRecipe((prev) => ({ ...prev, tags: value }));
    adjustTextareaHeight(e.target);
  };

  // 6) Save
  const handleSave = async () => {
    if (!updatedRecipe.title || !updatedRecipe.ingredients || !updatedRecipe.steps) {
      alert("Title, ingredients, and steps are required fields!");
      return;
    }

    // If user changed a field, it is now a string; if not, it remains an array
    const formattedRecipe = {
      ...updatedRecipe,

      ingredients: Array.isArray(updatedRecipe.ingredients)
        ? updatedRecipe.ingredients // keep array
        : updatedRecipe.ingredients
            .split("\n")
            .map((item) => item.trim()),

      steps: Array.isArray(updatedRecipe.steps)
        ? updatedRecipe.steps
        : updatedRecipe.steps
            .split("\n")
            .map((item) => item.trim()),

      tags: Array.isArray(updatedRecipe.tags)
        ? updatedRecipe.tags
        : updatedRecipe.tags
            .split(",")
            .map((tag) => tag.trim()),

      lastUpdated: new Date().toISOString(),
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/recipes/${id}`,
        formattedRecipe
      );

      if (response.status === 200) {
        alert("Recipe updated successfully.");
        navigate(`/recipe/${id}`);
      } else {
        throw new Error("Failed to update the recipe. Please try again.");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("An error occurred while updating the recipe. Please try again.");
    }
  };

  if (!updatedRecipe) return <p>Loading...</p>;

  return (
    <div className="edit-recipe-container">
      <h1>Edit Recipe</h1>

      {/* Title */}
      <input
        type="text"
        name="title"
        value={updatedRecipe.title || ""}
        onChange={handleInputChange}
        className="edit-recipe-input"
        placeholder="Enter recipe title"
      />

      {/* Description */}
      <textarea
        ref={descriptionRef}
        name="description"
        value={updatedRecipe.description || ""}
        onChange={handleInputChange}
        className="edit-recipe-textarea"
        placeholder="Enter recipe description"
      />

      {/* Ingredients */}
      <textarea
        ref={ingredientsRef}
        name="ingredients"
        value={
          Array.isArray(updatedRecipe.ingredients)
            ? updatedRecipe.ingredients.join("\n")
            : (updatedRecipe.ingredients || "")
        }
        onChange={(e) => handleArrayInputChange(e, "ingredients")}
        className="edit-recipe-textarea"
        placeholder="Enter ingredients (one per line)"
      />

      {/* Steps */}
      <textarea
        ref={stepsRef}
        name="steps"
        value={
          Array.isArray(updatedRecipe.steps)
            ? updatedRecipe.steps.join("\n")
            : (updatedRecipe.steps || "")
        }
        onChange={(e) => handleArrayInputChange(e, "steps")}
        className="edit-recipe-textarea"
        placeholder="Enter steps (one per line)"
      />

      {/* Tags */}
      <textarea
        ref={tagsRef}
        name="tags"
        value={
          Array.isArray(updatedRecipe.tags)
            ? updatedRecipe.tags.join(", ")
            : (updatedRecipe.tags || "")
        }
        onChange={handleTagsChange}
        className="edit-recipe-textarea"
        placeholder="Enter tags (comma-separated)"
      />

      {/* Image URL */}
      <input
        type="text"
        name="image"
        value={updatedRecipe.image || ""}
        onChange={handleInputChange}
        className="edit-recipe-input"
        placeholder="Enter image URL"
      />

      {/* Difficulty */}
      <select
        name="difficulty"
        value={updatedRecipe.difficulty || "Easy"}
        onChange={handleInputChange}
        className="edit-recipe-select"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      {/* Buttons */}
      <div className="edit-recipe-buttons">
        <button onClick={handleSave} className="save-button">Save</button>
        <button onClick={() => navigate(-1)} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default EditRecipeForm;
