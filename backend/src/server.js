import express from 'express';
import dotenv from 'dotenv';
import habitsRoutes from 'routes/habitsRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/habits", habitsRoutes);

app.listen(5001, () => {
  console.log(`Server is running on port ${PORT}`);
  });
