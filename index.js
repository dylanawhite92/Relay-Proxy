const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Set PORT for server to listen on
const PORT = process.env.PORT || 5000;

// Initialize express
const app = express();

// Enable CORS
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));