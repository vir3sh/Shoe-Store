import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import myDB from "./config/myDB.js";
import router from "./routes/productroutes.js";
import path from "path";
import userrouter from "./routes/userRoutes.js";
const app = express();

app.use(express());
const corsoption = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // Replace with your frontend URL
  credentials: true,
};

try {
  await myDB();
} catch (error) {
  console.error("Failed to connect to database:", error);
  process.exit(1);
}

app.use(cors(corsoption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/api/product", router);
app.use("/api/user", userrouter);

app.get("/", (req, res) => {
  res.send("API Working!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
