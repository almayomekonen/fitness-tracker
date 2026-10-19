require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

connectDB();

app.get("/welcome", (req, res) => {
  res.send({ message: "Welcome To Node Js" });
});

app.use("/api/auth", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is running on port!!!!!!! ${PORT}`);
});
