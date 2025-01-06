import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "./HomePage.css"; // Import the dedicated CSS file for the homepage

const HomePage = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const location = useLocation(); // Get the current route location
  const projectsRef = useRef(null); // Ref for the Projects Section

  useEffect(() => {
    // Scroll to Projects Section if the state contains scrollTo = "projects"
    if (location.state?.scrollTo === "projects" && projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    // Fetch recipes and select three as featured recipes
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        const recipes = response.data;
        if (recipes.length > 0) {
          // Shuffle and take the first three recipes
          const shuffledRecipes = recipes.sort(() => 0.5 - Math.random());
          setFeaturedRecipes(shuffledRecipes.slice(0, 3));
        }
      })
      .catch((err) => console.error("Failed to fetch recipes:", err));
  }, []);

  return (
    <div className="homepage-container">
      <div className="welcome-section">
        <h1>Welcome to Recipe Manager App!</h1>
        <p>
          Thank you for visiting our application! The Recipe Manager App is your
          ultimate companion for organizing and discovering recipes. Whether
          you’re a passionate home cook or a beginner looking to explore the
          culinary world, our app provides a seamless experience for creating,
          viewing, editing, deleting, and organizing your favorite recipes.
        </p>
        <h2>App Highlights</h2>
        <div className="App-highlights">
          <ul>
            <li>
              <b>Discover Recipes:</b> Browse through our collection of recipes,
              including a specially curated "Featured Recipe" section
              showcasing popular or new recipes.
            </li>
            <li>
              <b>Personalized Management:</b> Add your own recipes with
              customizable attributes like ingredients, preparation steps,
              tags, and difficulty levels.
            </li>
            <li>
              <b>Interactive Tools:</b> Edit, delete, and organize your recipes
              effortlessly, and utilize features like search, filter, and sort
              to find exactly what you need.
            </li>
            <li>
              <b>Stay Inspired:</b> Explore recipes created by other users and
              share your own!
            </li>
          </ul>
        </div>
      </div>

      <div className="featured-section">
        <h1>Featured Recipes</h1>
        <div className="recipe-cards-container">
          {featuredRecipes.length > 0 ? (
            featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img
                  src={recipe.image || "default-placeholder.jpg"}
                  alt={recipe.title}
                  className="recipe-card-image"
                />
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
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="view-recipe-link"
                  >
                    ➡Click to View Full Recipe⬅
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Loading featured recipes...</p>
          )}
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* Projects Section */}
      <div className="projects-section" ref={projectsRef}>
        <h1>Our Web and Mobile 1 Project: Chrome Extension for Auto Form Filler</h1>
        <p>
          A Chrome extension designed to simplify the process of filling job
          applications and online forms. This project includes intelligent
          features like data extraction from LinkedIn, customizable profiles,
          automatic form field mapping, and even tailored cover letter
          generation.
        </p>
        <h2>Key Features:</h2>
        <ul>
          <li>
            Customizable data fields for personal summaries, certificates, and
            portfolio links.
          </li>
          <li>
            Switch between multiple profiles for different industries or roles.
          </li>
          <li>
            Form field mapping for accurate and efficient form filling.
          </li>
          <li>
            Job application tracking dashboard to manage submissions.
          </li>
          <li>
            History restoring to reuse filled forms for future applications.
          </li>
        </ul>
        <h2>External Links:</h2>
        <ul>
          <li>
            <a
              href="https://github.com/ravanabdinli/WM1-Project-2-Group-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </li>
          <li>
            <a
              href="https://eu.bbcollab.com/collab/ui/session/playback/load/9c637d08c8e44b40b033c7955bbbea90?authToken=eyJhbGciOiJIUzI1NiJ9..."
              target="_blank"
              rel="noopener noreferrer"
            >
              Our Extension on Demo Day
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
