
# WM1 Project 2 - Group 6

Welcome to the **WM1 Project 2 - Group 6** application! This repository contains a React application and a JSON server. This README will guide you through setting up and running the project, step-by-step, ensuring everything works seamlessly.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up the JSON Server](#setting-up-the-json-server)
- [Starting the React App and JSON Server Concurrently](#starting-the-react-app-and-json-server-concurrently)
- [Features and Dependencies](#features-and-dependencies)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [GitHub Repository](#github-repository)

---

## Project Overview

This project consists of:
- A **React application** for the frontend.
- A **JSON server** to serve mock data via `db.json`.

The app also uses:
- **EmailJS** for email handling.
- **React-DnD (Drag and Drop)** for a seamless drag-and-drop user experience.

---

## Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js) or **yarn** (optional)
- **JSON-Server** (for mock API functionality)

---

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/ravanabdinli/WM1-Project-2-Group-6.git
\`\`\`
Navigate into the project directory:
\`\`\`bash
cd WM1-Project-2-Group-6
\`\`\`

### 2. Install Dependencies
Install all necessary packages for the React application:
\`\`\`bash
npm install
\`\`\`

### 3. Install EmailJS SDK
The app uses **EmailJS** for email functionality. Install the SDK:
\`\`\`bash
npm install --save @emailjs/browser
\`\`\`
Refer to the EmailJS installation documentation for additional details: [EmailJS SDK Installation](https://www.emailjs.com/docs/sdk/installation/).

### 4. Install React-DnD (Drag and Drop)
For drag-and-drop functionality, the app uses **React-DnD**. Install the necessary packages:
\`\`\`bash
npm install react-dnd react-dnd-html5-backend
\`\`\`
Refer to the official documentation for more information: [React-DnD Documentation](https://react-dnd.github.io/react-dnd/about).

---

## Setting Up the JSON Server

The app uses a mock API with **JSON-Server**. Follow these steps to set it up:

### 1. Install JSON-Server
If you don’t already have JSON-Server installed globally:
\`\`\`bash
npm install -g json-server
\`\`\`

### 2. Run the JSON Server
To start the server and serve the `db.json` file:
\`\`\`bash
json-server --watch db.json --port 3001
\`\`\`

**Note**: The server will be accessible at \`http://localhost:3001\`. This URL will act as your backend API endpoint.

---

## Starting the React App and JSON Server Concurrently

To run the React app and JSON server concurrently, install the **concurrently** package:
\`\`\`bash
npm install --save concurrently
\`\`\`


Now, to start both the React app and JSON server, simply run:
\`\`\`bash
npm start
\`\`\`

- The React app will run on \`http://localhost:3000\`.
- The JSON server will run on \`http://localhost:3001\`.

---

## Features and Dependencies

This app includes the following features:
1. **EmailJS Integration**:
   - Handles email functionality using the EmailJS SDK.
   - [Installation Guide](https://www.emailjs.com/docs/sdk/installation/).

2. **Drag-and-Drop Functionality**:
   - Utilizes React-DnD for drag-and-drop interactions.
   - Installation: \`react-dnd\` and \`react-dnd-html5-backend\`.
   - [Documentation](https://react-dnd.github.io/react-dnd/about).

3. **JSON-Server for Mock API**:
   - Serves mock data from the \`db.json\` file.
   - Accessible at \`http://localhost:3001\`.

---

## Usage

Once the React app and JSON server are running:
1. Open \`http://localhost:3000\` in your browser to access the React app.
2. The app will interact with the JSON server running at \`http://localhost:3001\`.

Features such as email sending and drag-and-drop will be functional after proper setup.

---

## Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch: \`git checkout -b feature-name\`.
3. Commit your changes: \`git commit -m "Add feature-name"\`.
4. Push to the branch: \`git push origin feature-name\`.
5. Create a pull request.

---

## License

This project is licensed under the MIT License.

---

## GitHub Repository

[GitHub Repository Link](https://github.com/ravanabdinli/WM1-Project-2-Group-6)

---
