import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import CreateRecipePage from "./pages/CreateRecipePage";
import ContactPage from "./pages/ContactPage"; // Import ContactPage
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* NavBar on the left */}
        <div style={{ width: "200px", flexShrink: 0 }}>
          <NavBar />
        </div>

        {/* Main content on the right */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/create" element={<CreateRecipePage />} />
            <Route path="/contact" element={<ContactPage />} /> {/* Add Contact Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
