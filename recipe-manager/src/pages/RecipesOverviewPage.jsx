import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import RecipesList from "../components/RecipesList";
import "./RecipesOverviewPage.css";

const RecipesOverviewPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [filterTags, setFilterTags] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  // Sender & Recipient fields
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("Requested Recipe(s)");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const RECIPES_PER_PAGE = 12;

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes?_sort=order&_order=asc")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch recipes:", err);
      });
  }, []);

  const handleSelectRecipe = (recipeId) => {
    setSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };
  const handleFilterDifficulty = (e) => {
    setFilterDifficulty(e.target.value);
    setCurrentPage(1);
  };
  const handleFilterTags = (e) => {
    setFilterTags(e.target.value.toLowerCase());
    setCurrentPage(1);
  };
  const handleSort = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  // Reorder function for drag-and-drop
  // 'options.inMemoryOnly' => reorder visually (hover), no server patch
  // 'options.patchServer'  => user just dropped, patch the new order
  const handleReorder = (sourceIndex, destinationIndex, options = {}) => {

    const updated = [...recipes];

    const [movedItem] = updated.splice(sourceIndex, 1);

    updated.splice(destinationIndex, 0, movedItem);

    updated.forEach((r, idx) => {
      r.order = idx + 1;
    });

    setRecipes(updated);

    if (options.inMemoryOnly) {
      return;
    }

    if (options.patchServer) {
      updated.forEach((r) => {
        axios
          .patch(`http://localhost:3001/recipes/${r.id}`, { order: r.order })
          .catch((err) => console.error("Failed to patch order:", err));
      });
    }
  };

  const handleDeleteRecipe = (recipeId) => {
    axios
      .delete(`http://localhost:3001/recipes/${recipeId}`)
      .then(() => {
        setRecipes((prevRecipes) => {
          const updated = prevRecipes.filter((r) => r.id !== recipeId);
          const newTotalPages = Math.ceil(updated.length / RECIPES_PER_PAGE);
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
          }
          return updated;
        });
        alert("Recipe deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
        alert("An error occurred while deleting the recipe. Please try again.");
      });
  };

  // Filter + sort (memoized)
  const filteredRecipes = useMemo(() => {
    const difficultyLevels = { Easy: 1, Medium: 2, Hard: 3 };

    return recipes
      .filter((recipe) => {
        const matchesSearch =
          recipe.title?.toLowerCase().includes(searchQuery) ||
          recipe.description?.toLowerCase().includes(searchQuery) ||
          recipe.ingredients?.some((ing) =>
            ing.toLowerCase().includes(searchQuery)
          );

        const matchesDifficulty =
          !filterDifficulty || recipe.difficulty === filterDifficulty;

        const matchesTags =
          !filterTags ||
          recipe.tags?.some((tag) => tag.toLowerCase().includes(filterTags));

        return matchesSearch && matchesDifficulty && matchesTags;
      })
      .sort((a, b) => {
        if (sortOption === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortOption === "createTime") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortOption === "updateTime") {
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        } else if (sortOption === "difficulty") {
          return (
            difficultyLevels[a.difficulty] - difficultyLevels[b.difficulty]
          );
        }
        return 0;
      });
  }, [recipes, searchQuery, filterDifficulty, filterTags, sortOption]);

  // Pagination
  const totalRecipes = filteredRecipes.length;
  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  
    // Now scroll the container to top
    const scrollContainer = document.getElementById("scrollable-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth", // optional, for a nicer animation
      });
    }
  };
  
  // Paginated items
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
    const endIndex = currentPage * RECIPES_PER_PAGE;
    return filteredRecipes.slice(startIndex, endIndex);
  }, [filteredRecipes, currentPage]);

  // Show modal if there are selected recipes; otherwise alert
  const openShareModal = () => {
    if (selectedRecipes.length === 0) {
      alert("No recipes selected!");
      return;
    }
    setIsModalOpen(true);
  };

  // Actually send the email
  const handleShare = () => {
    if (selectedRecipes.length === 0) {
      alert("No recipes selected!");
      return;
    }
    if (
      !senderName ||
      !senderEmail ||
      !recipientName ||
      !recipientEmail ||
      !emailSubject
    ) {
      alert("Please fill all fields (sender & recipient) before sending!");
      return;
    }

    // Gather data
    const selectedDetails = recipes.filter((r) => selectedRecipes.includes(r.id));
    const recipeJSON = JSON.stringify(selectedDetails, null, 2);

    // Prepare EmailJS parameters
    const emailParams = {
      sender_name: senderName,
      sender_email: senderEmail,
      recipient_name: recipientName,
      to_email: recipientEmail,
      message: recipeJSON,
      subject: emailSubject,
    };

    emailjs
      .send(
        "service_uy3kqbb",  
        "template_k053bmp",  
        emailParams,
        "k-B7CRJkdywHyeo-5" 
      )
      .then(() => {
        alert("Recipes shared successfully via email!");
        setSelectedRecipes([]);
        setIsModalOpen(false); 
      })
      .catch((error) => {
        console.error("Failed to share recipes via email:", error);
        alert("Failed to send email. Please try again.");
      });
  };

  return (
    <div className="recipes-overview">
      <div className="recipes-header">
        <h1>🧾All Recipes🧾</h1>
        <p>Discover delicious recipes and get cooking!</p>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearch}
          className="filter-input"
        />
        <select
          value={filterDifficulty}
          onChange={handleFilterDifficulty}
          className="filter-select"
        >
          <option value="">Filter by Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Tags"
          value={filterTags}
          onChange={handleFilterTags}
          className="filter-input"
        />
        <select
          value={sortOption}
          onChange={handleSort}
          className="filter-select"
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="createTime">Create Time</option>
          <option value="updateTime">Last Updated</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>

      {/* Recipes List */}
      <RecipesList
        recipes={paginatedRecipes}
        handleDeleteRecipe={handleDeleteRecipe}
        selectedRecipes={selectedRecipes}
        handleSelectRecipe={handleSelectRecipe}
        onReorder={handleReorder}
      />

      {/* Share Button */}
      <button className="share-button" onClick={openShareModal}>
        ➦ Share Recipe(s)
      </button>

      {/* Pagination */}
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal for Sender/Recipient Info */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Send Selected Recipes</h2>

            <h3>Sender Info</h3>
            <input
              type="text"
              placeholder="Your Full Name (Sender)"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email (Sender Email)"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />

            <h3>Recipient Info</h3>
            <input
              type="text"
              placeholder="Recipient Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Recipient Email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />

            <div className="modal-buttons">
              <button className="send-button" onClick={handleShare}>
                Send Email
              </button>

              <button
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesOverviewPage;
