import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecipePage.css"; 

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        alert("Recipe not found. Please try again.");
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value.split("\n").map((item) => item.trim());
    setRecipe((prevRecipe) => ({ ...prevRecipe, [field]: value }));
  };

  const handleSave = () => {
    const updatedRecipe = {
      ...recipe,
      lastUpdated: new Date().toISOString(),
    };

    axios
      .put(`http://localhost:3001/recipes/${id}`, updatedRecipe)
      .then((response) => {
        setRecipe(response.data);
        setIsEditing(false);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/recipes/${id}`)
      .then(() => {
        navigate("/recipes"); // Redirect to overview after deletion
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
        alert("An error occurred while deleting the recipe. Please try again.");
      });
  };

  if (!recipe) return <p>Loading...</p>;

  const formattedLastUpdated = new Date(recipe.lastUpdated).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );

  return (
    <div className="recipe-container">
      {isEditing ? (
        <div>
          <h1>
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              className="recipe-title-input"
            />
          </h1>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleInputChange}
            className="recipe-textarea"
          />
          <p>
            <strong>Image URL: </strong>
            <input
              type="text"
              name="image"
              value={recipe.image || ""}
              onChange={handleInputChange}
              className="recipe-input"
            />
          </p>
          <p>
            <strong>Difficulty Level: </strong>
            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleInputChange}
              className="recipe-select"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </p>
          <p>
            <strong>Ingredients: </strong>
            <textarea
              value={recipe.ingredients.join("\n")}
              onChange={(e) => handleArrayInputChange(e, "ingredients")}
              className="recipe-textarea"
            />
          </p>
          <p>
            <strong>Preparation Steps: </strong>
            <textarea
              value={recipe.steps.join("\n")}
              onChange={(e) => handleArrayInputChange(e, "steps")}
              className="recipe-textarea"
            />
          </p>
          <p>
            <strong>Tags: </strong>
            <textarea
              value={recipe.tags.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "tags")}
              className="recipe-textarea"
            />
          </p>
          <button onClick={handleSave} className="button-save">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="button-cancel">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
            />
          )}
          <h1 className="recipe-title">{recipe.title}</h1>
          <p>
            <strong>Description:</strong> {recipe.description}
          </p>
          <p>
            <strong>Difficulty Level:</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Last Updated:</strong> {formattedLastUpdated}
          </p>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3>Preparation Steps</h3>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <h3>Tags</h3>
          <p>{recipe.tags.join(", ")}</p>
          
          <button
            onClick={() => navigate(-1)}
            className="button-back"
          >
            ↩ <br />
            Go Back 
          </button>
          <button
            onClick={() => navigate(`/recipe/${id}/edit`, { state: { recipe } })}
            className="button-edit"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="button-delete"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipePage;
