import env from "dotenv";
env.config();
import express from "express";
import MongoDbConnection from "./db/connection.js";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import mediaRouter from "./routes/media.routes.js";
import cookieParser from "cookie-parser";
const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// MongoDb Connection
MongoDbConnection(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("MongoDb is connected successfully");
  })
  .catch((error) => {
    console.log(error,"error++++++++++");
  });

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'))

// Routers
app.get("/", (req, res) => {
  res.send("Welcome NGO");
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/gallery", mediaRouter);

// Error Handler
app.use((err, req, res, next) => {
  const {status = 500, message = "Internal Server Error"} = err;
  return res.status(status).json({error: true, success: false, message})
})

// listen PORT
app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
