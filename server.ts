import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import { COHORT_DATA } from "./src/data/cohort";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("cohort.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS cohort (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL
  )
`);

const rowCount = db.prepare("SELECT COUNT(*) as count FROM cohort").get() as { count: number };
if (rowCount.count === 0) {
  const insert = db.prepare("INSERT INTO cohort (id, data) VALUES (?, ?)");
  COHORT_DATA.forEach(member => {
    insert.run(member.id, JSON.stringify(member));
  });
  console.log("Database initialized with default cohort data.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.get("/api/cohort", (req, res) => {
    try {
      const rows = db.prepare("SELECT data FROM cohort").all() as { data: string }[];
      const data = rows.map(row => JSON.parse(row.data));
      // Sort by ID
      const sorted = data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      res.json(sorted);
    } catch (error) {
      console.error("Error fetching cohort:", error);
      res.status(500).json({ error: "Failed to fetch cohort data" });
    }
  });

  app.post("/api/cohort/:id", (req, res) => {
    const { id } = req.params;
    const memberData = req.body;
    
    try {
      const upsert = db.prepare("INSERT OR REPLACE INTO cohort (id, data) VALUES (?, ?)");
      upsert.run(id, JSON.stringify(memberData));
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating member:", error);
      res.status(500).json({ error: "Failed to update member" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Static serving for production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
