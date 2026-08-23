import express from 'express';
import dotenv from 'dotenv';
import habitsRoutes from './routes/habitsRoutes.js';
import { connectDB } from "./config/db.js";
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/habits", habitsRoutes);

connectDB().then(() =>
{ app.listen(5001, () => {
  console.log(`Server is running on port ${PORT}`);
  });
});
