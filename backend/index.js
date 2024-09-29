import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();
const router = express.Router();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/files", express.static("files"));
app.use(
  cors({
    origin: [
      "*",
      "http://localhost:3000",
      "http://localhost:3000/",
      "https://react-first-sepia.vercel.app",
      "https://react-first-sepia.vercel.app/",
    ], // Specify allowed origins
    credentials: true, // Allow sending cookies in requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow specific methods
  })
);
app.options("*", cors());

app.use(
  router.get("/", (req, res) =>
    res.json({ Welcome: "This is Job Connect! Get Ready to Hunt?!" })
  )
);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
