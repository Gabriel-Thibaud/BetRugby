import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
