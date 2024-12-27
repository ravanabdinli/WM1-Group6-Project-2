import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";

const RecipeCard = ({ recipe, index, moveRecipe }) => {
  const [, ref] = useDrag({
    type: "RECIPE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "RECIPE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRecipe(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        cursor: "move",
      }}
    >
      <h3>
        <Link
          to={`/recipe/${recipe.id}`}
          style={{ textDecoration: "none", color: "#007bff" }}
        >
          {recipe.title}
        </Link>
      </h3>
      <p>{recipe.description}</p>
    </div>
  );
};

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/recipes").then((response) => {
      const sortedRecipes = response.data.sort((a, b) => a.position - b.position);
      setRecipes(sortedRecipes);
    });
  }, []);

  const moveRecipe = (fromIndex, toIndex) => {
    const updatedRecipes = [...recipes];
    const [movedRecipe] = updatedRecipes.splice(fromIndex, 1);
    updatedRecipes.splice(toIndex, 0, movedRecipe);

    // Update the position property
    updatedRecipes.forEach((recipe, index) => {
      recipe.position = index + 1;
    });

    setRecipes(updatedRecipes);
  };

  const saveOrder = () => {
    axios
      .put("http://localhost:3001/recipes", recipes)
      .then(() => alert("Order saved!"))
      .catch((error) => console.error("Failed to save order:", error));
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1>Welcome to Recipe Manager!</h1>
      <p>Your go-to app for managing recipes!</p>

      <div>
        <h2>All Recipes</h2>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            index={index}
            moveRecipe={moveRecipe}
          />
        ))}
        <button
          onClick={saveOrder}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Save Order
        </button>
      </div>
    </div>
  );
};

export default HomePage;
