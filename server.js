const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const http = require('http'); // ✅ Add this to create an HTTP server
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27017/test_moviesdb"
    : process.env.MONGO_URI || "your_default_mongo_uri_here";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start the Server
const PORT = process.env.PORT || 8001;

// ✅ Create an HTTP server and export it
const server = http.createServer(app);

// Prevent starting the server in test mode
if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// ✅ Export both `app` and `server` for testing
module.exports = { app, server };
