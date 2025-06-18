import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/dbConnection";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";

dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
