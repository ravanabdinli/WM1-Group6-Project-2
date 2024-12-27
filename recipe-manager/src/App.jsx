import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import CreateRecipe from "./components/CreateRecipe";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div style={{ display: "flex" }}>
          <NavBar /> {/* NavBar is always visible */}
          <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateRecipePage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
