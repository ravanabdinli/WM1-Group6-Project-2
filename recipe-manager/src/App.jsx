import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import CreateRecipePage from "./pages/CreateRecipePage";
import NavBar from "./components/NavBar";

function App() {
  return (
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
  );
}

export default App;
  