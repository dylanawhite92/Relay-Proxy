const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Set PORT for server to listen on
const PORT = process.env.PORT || 5000;

// Initialize express
const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100
});

app.use(limiter);
app.set("trust proxy", 1);

// Set static folder
app.use(express.static("public"));

// Use routes
app.use("/api", require("./routes"));

// Enable CORS
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));