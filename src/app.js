const express = require("express");
const connectDB = require("./db/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");
const app = express();
connectDB();
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth/", authRoutes)
app.use("/api/posts", postRoutes);
module.exports = app;