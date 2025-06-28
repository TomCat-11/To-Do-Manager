const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON

const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});



mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
