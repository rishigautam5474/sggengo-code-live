import env from "dotenv";
env.config();
import express from "express";
import MongoDbConnection from "./db/connection.js";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import mediaRouter from "./routes/media.routes.js";
import path from "path"
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// port
const PORT = process.env.PORT || 4000;

// mongodb connection
MongoDbConnection(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("MongoDb is connected successfully");
  })
  .catch((error) => {
    console.log(error,"error++++++++++");
  });
  
// middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(morgan('tiny'));

//static files
app.use(express.static(path.join(__dirname, "./sggengo-admin/dist")))

//routers
app.get("/", (req, res) => {
  res.send("Welcome NGO");
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/gallery", mediaRouter);

app.get(/^\/(?!api).*/, function(req, res) {
    res.sendFile(path.join(__dirname, "./sggengo-admin/dist/index.html"))
})

// Error Handler
app.use((err, req, res, next) => {
  const {status = 500, message = "Internal Server Error"} = err;
  return res.status(status).json({error: true, success: false, message})
})

// listen port
app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
