import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipesOverviewPage from "./pages/RecipesOverviewPage";
import RecipePage from "./pages/RecipePage";
import CreateRecipe from "./components/CreateRecipe";
import EditRecipeForm from "./components/EditRecipeForm";
import CreateRecipePage from "./pages/CreateRecipePage"; 
import ContactPage from "./pages/ContactPage";
import NavBar from "./components/NavBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const handleRecipeAdded = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div style={{ display: "flex", height: "100vh" }}>
          <NavBar />
          <div
            id="scrollable-container"
            style={{ flex: 1, padding: "20px", overflowY: "auto" }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/recipes"
                element={<RecipesOverviewPage recipes={recipes} />}
              />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/recipe/:id/edit" element={<EditRecipeForm />} />
              <Route
                path="/create"
                element={<CreateRecipePage onRecipeAdded={handleRecipeAdded} />}
              />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DndProvider>
  );
};

export default App;
