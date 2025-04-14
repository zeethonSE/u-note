import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pool from "./db.js"; // PostgreSQL connection

const app = express();
const PORT = process.env.PORT || 10000;
// app.use(cors({ origin: true, credentials: true }));

// Add this before your routes
// const allowedOrigins = [
//   "https://u-note-umber.vercel.app",
//   "https://u-note-v-zeethons-projects.vercel.app",
//   "https://u-note-zeethonse-zeethons-projects.vercel.app"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));

const allowedOrigins = [
  "https://u-note-umber.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming request from origin:", req.headers.origin);
  next();
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.headers.origin}`);
  next();
});


// ✅ Add one-time SQL
app.get("/init-db", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    res.send("✅ Notes table created!");
  } catch (err) {
    console.error("❌ Error creating table:", err);
    res.status(500).send("Failed to create table.");
  }
});


// Get all notes
app.get("/api/notes", async (req, res) => {
  console.log("🔍 GET /api/notes hit"); // Add this

  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching notes:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Add a new note
app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content cannot be empty" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
