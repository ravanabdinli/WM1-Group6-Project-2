import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/${id}`).then((response) => {
      setRecipe(response.data);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setRecipe((prevRecipe) => ({ ...prevRecipe, [field]: value }));
  };

  const handleSave = () => {
    const updatedRecipe = {
      ...recipe,
      lastUpdated: new Date().toISOString(),
    };

    axios.put(`http://localhost:3001/recipes/${id}`, updatedRecipe).then((response) => {
      setRecipe(response.data);
      setIsEditing(false);
    });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/recipes/${id}`).then(() => {
      navigate("/");
    });
  };

  if (!recipe) return <p>Loading...</p>;

  const formattedLastUpdated = new Date(recipe.lastUpdated).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {isEditing ? (
        <div>
          <h1>
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", fontSize: "1.5em" }}
            />
          </h1>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <p>
            <strong>Difficulty Level: </strong>
            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleInputChange}
              style={{ padding: "10px", margin: "10px 0" }}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </p>
          <p>
            <strong>Ingredients: </strong>
            <textarea
              value={recipe.ingredients.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "ingredients")}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </p>
          <p>
            <strong>Preparation Steps: </strong>
            <textarea
              value={recipe.steps.join(". ")}
              onChange={(e) => handleArrayInputChange(e, "steps")}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </p>
          <p>
            <strong>Tags: </strong>
            <textarea
              value={recipe.tags.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "tags")}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </p>
          <button onClick={handleSave} style={{ padding: "10px", marginRight: "10px" }}>
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{ padding: "10px", background: "#ccc" }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h1>{recipe.title}</h1>
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
            onClick={() => setIsEditing(true)}
            style={{ padding: "10px", marginRight: "10px" }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            style={{ padding: "10px", background: "red", color: "#fff" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipePage;
