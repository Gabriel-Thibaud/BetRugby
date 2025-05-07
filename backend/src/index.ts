import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route"

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use('/api/users', userRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});



