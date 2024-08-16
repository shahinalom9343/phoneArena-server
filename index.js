const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Phone Arena Server is Running");
});

app.listen(port, (req, res) => {
  console.log(`Phone Arena Server is running on PORT: ${port}`);
});
