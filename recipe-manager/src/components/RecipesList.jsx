import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import "./RecipesList.css";

const ItemTypes = {
  RECIPE: "RECIPE",
};

/**
 * Sub-component for a single "draggable" card.
 */
function DraggableRecipeCard({
  recipe,
  index,
  moveCardInMemory,    // Called repeatedly on hover for immediate reorder
  finalizeReorder,     // Called once on drop to patch the server
  handleDeleteRecipe,
  selectedRecipes,
  handleSelectRecipe,
  navigate,
}) {
  const ref = useRef(null);

  // A) DRAG LOGIC
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.RECIPE,
    item: { type: ItemTypes.RECIPE, index },
    // "end" is called when the user finishes the drag (drops or cancels)
    end: (item, monitor) => {
      // If the user didn't actually drop on a valid target, do nothing
      if (!monitor.didDrop()) return;

      // We can read the final hovered index from the item if we update it in "hover"
      const { index: finalIndex } = item;
      // Now call "finalizeReorder" to do the PATCH calls in the parent
      finalizeReorder(item.index, finalIndex);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // B) DROP LOGIC
  const [, drop] = useDrop({
    accept: ItemTypes.RECIPE,
    hover(draggedItem, monitor) {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      // Don’t do anything if the item is hovering over itself
      if (dragIndex === hoverIndex) return;

      // Reorder in memory so the UI updates:
      moveCardInMemory(dragIndex, hoverIndex);

      // Update the "draggedItem.index" so subsequent hovers know the new position
      draggedItem.index = hoverIndex;
    },
    drop(droppedItem, monitor) {
      // This sets up a "drop result" for the end() callback
      return { droppedIndex: index };
    },
  });

  // Link our ref to drag + drop
  drag(drop(ref));

  // C) Render your exact existing card markup
  return (
    <div
      ref={ref}
      className="recipe-card-link"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      <div
        className="recipe-card"
        style={{
          backgroundImage: `url(${recipe.image || "default-placeholder.jpg"})`,
        }}
      >
        <div className="card-buttons">
          <button
            className="edit-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevent navigation
              navigate(`/recipe/${recipe.id}/edit`, { state: { recipe } });
            }}
          >
            ✏️
          </button>
          <button
            className="delete-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDeleteRecipe(recipe.id);
            }}
          >
            🗑️
          </button>
        </div>

        <input
          type="checkbox"
          className="select-recipe-checkbox"
          checked={selectedRecipes.includes(recipe.id)}
          onClick={(e) => e.stopPropagation()}
          onChange={() => handleSelectRecipe(recipe.id)}
        />

        {/* Title + Description */}
        <div className="recipe-card-content">
          <h3>
            {recipe.title.length > 30
              ? `${recipe.title.substring(0, 30)}...`
              : recipe.title}
          </h3>
          <p>
            {recipe.description.length > 120
              ? `${recipe.description.substring(0, 120)}...`
              : recipe.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Main list component: 
 * - Reorders in memory on hover
 * - Finalizes reorder on drop
 */
const RecipesList = ({
  recipes,
  handleDeleteRecipe,
  selectedRecipes,
  handleSelectRecipe,
  onReorder, // The parent's callback that does final reorder + patch
}) => {
  const navigate = useNavigate();

  // 1) Just reorder in memory (no patch)
  const moveCardInMemory = (dragIndex, hoverIndex) => {
    // We'll reorder the array in the parent as well so the UI updates immediately
    // Or we can do it locally if the parent passes a function. Let’s do this:
    if (onReorder) {
      onReorder(dragIndex, hoverIndex, { inMemoryOnly: true });
    }
  };

  // 2) Actually patch to server once the item is dropped
  const finalizeReorder = (dragIndex, dropIndex) => {
    if (onReorder) {
      onReorder(dragIndex, dropIndex, { patchServer: true });
    }
  };

  return (
    <div className="recipe-list-container">
      <div className="recipe-grid-container">
        {recipes.length === 0 ? (
          <p className="no-recipes-message">
            No recipes found. Try adjusting your search or filters.
          </p>
        ) : (
          recipes.map((recipe, index) => (
            <DraggableRecipeCard
              key={recipe.id}
              recipe={recipe}
              index={index}
              moveCardInMemory={moveCardInMemory}
              finalizeReorder={finalizeReorder}
              handleDeleteRecipe={handleDeleteRecipe}
              selectedRecipes={selectedRecipes}
              handleSelectRecipe={handleSelectRecipe}
              navigate={navigate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecipesList;
