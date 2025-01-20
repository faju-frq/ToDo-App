import express from "express";
import cors from "cors";
import pg from "pg";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const db = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});
db.connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.get("/api/todos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await db.query(
      "INSERT INTO todos(title,description) VALUES($1 , $2) RETURNING *",
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const { is_completed, taskstatus, updated_at } = req.body;
    console.log(req.body);
    const result = await db.query(
      "UPDATE todos SET is_completed = $1, taskstatus = $2, updated_at = $3, updatedstat = $4 WHERE id = $5 RETURNING *",
      [is_completed, taskstatus, updated_at, "Updated", id]
    );
    console.log(result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM todos WHERE id = $1", [id]);
    res.status(204).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
