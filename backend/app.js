import express from "express";
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import dbconnect from "./db/dbconnect.js";
import privateRoutes from "./privateroute/privateRoutes.js"
import userRoutes from "./routes/userroutes.js"
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true                // allow sending cookies/auth headers
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/private',privateRoutes)
app.use('/api/user', userRoutes);
// Serve uploads folder 
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server after DB connection
try
{
  await dbconnect();
  if(dbconnect) console.log("data base connected")
  
}
catch(e){
  console.log(e.message)
}

// Add this before app.listen
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
