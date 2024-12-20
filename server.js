// Step 1
import express from "express";
import cors from "cors";
import "dotenv/config";
// Step 2
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
// app.use(cors());

//service connection
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
const allowedOrigins = [
  "https://admin-test-theta.vercel.app",
  "https://admin-test-git-main-bananas-projects-9860d87b.vercel.app/",
  "https://admin-test-jtmtnqk3b-bananas-projects-9860d87b.vercel.app/", 
  "https://user-test-puce.vercel.app", // For local development
  "http://localhost:5173", // For local development
];

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or Authorization headers
  })
);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log("Server started on PORT : " + port + " 🌍 🙌");
});
