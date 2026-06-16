import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const DB_PATH = path.join(process.cwd(), 'db.json');

// Helper to read database safely
function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      // Return a blank structure if not found (though our file exists)
      return { textResources: {}, calendarEvents_ENG: [], calendarEvents_ZUL: [], suggestions: [] };
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading database file", error);
    return { textResources: {}, calendarEvents_ENG: [], calendarEvents_ZUL: [], suggestions: [] };
  }
}

// Helper to write database safely
function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error writing database file", error);
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin2026';

  // --- API ROUTES ---

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Fetch all CMS content
  app.get('/api/content', (req, res) => {
    const db = readDb();
    res.json({
      textResources: db.textResources || {},
      calendarEvents_ENG: db.calendarEvents_ENG || [],
      calendarEvents_ZUL: db.calendarEvents_ZUL || [],
      suggestions: db.suggestions || [],
      staff: db.staff || []
    });
  });

  // Admin login check
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASS) {
      res.json({ success: true, message: "Logged in successfully" });
    } else {
      res.status(401).json({ success: false, message: "Incorrect password" });
    }
  });

  // Admin save block
  app.post('/api/admin/update', (req, res) => {
    const { password, textResources, calendarEvents_ENG, calendarEvents_ZUL, staff } = req.body;
    if (password !== ADMIN_PASS) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const db = readDb();
    if (textResources) db.textResources = textResources;
    if (calendarEvents_ENG) db.calendarEvents_ENG = calendarEvents_ENG;
    if (calendarEvents_ZUL) db.calendarEvents_ZUL = calendarEvents_ZUL;
    if (staff !== undefined) db.staff = staff;

    const success = writeDb(db);
    if (success) {
      res.json({ success: true, message: "Database updated successfully" });
    } else {
      res.status(500).json({ success: false, message: "Failed to write database updates to file" });
    }
  });

  // --- VITE MIDDLEWARE / STATIC ASSETS ---

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Serve static compiled UI files
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[UMZILIKAZI Full-Stack Engine] Server listening on http://localhost:${PORT}`);
  });
}

startServer();
