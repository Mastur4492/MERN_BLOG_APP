const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => console.info("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.get("/", (req, res) => {
    res.send("Welcome to the Blog API");
  });

app.use("/api/auth", require("./routes/auth"));
app.use("/api/blogs", require("./routes/blogs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
