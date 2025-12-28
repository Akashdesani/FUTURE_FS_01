const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require("dotenv").config();   // MUST BE FIRST LINE

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DEBUG (VERY IMPORTANT)
console.log("Mongo URI:", process.env.MONGO_URI);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// API
app.post("/contact", async (req, res) => {
  try {
    await new Contact(req.body).save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

app.post("/contact", async (req, res) => {
  try {
    await new Contact(req.body).save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
