// Frontend server using Express and EJS.
// It serves the form page and forwards form data to the Flask backend.

const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Use Docker service name `backend` by default so services can talk in Compose.
const BACKEND_URL = process.env.BACKEND_URL || "http://backend:5000/submit";

// Middleware for parsing form data and JSON payloads.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files like CSS from the public directory.
app.use(express.static(path.join(__dirname, "public")));

// Configure EJS view engine.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Render the form page.
app.get("/", (req, res) => {
  res.render("index", { apiResponse: null, error: null, formData: {} });
});

// Handle form submission from the frontend page.
app.post("/submit", async (req, res) => {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };

  try {
    // Send form data to the Flask backend as JSON.
    const backendResponse = await axios.post(BACKEND_URL, formData, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    return res.render("index", {
      apiResponse: backendResponse.data,
      error: null,
      formData,
    });
  } catch (err) {
    // Keep error handling explicit for beginner-friendly debugging.
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Unable to submit form to backend.";

    return res.render("index", {
      apiResponse: null,
      error: errorMessage,
      formData,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
});
