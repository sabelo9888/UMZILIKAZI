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

  // suggestions endpoints
  app.get('/api/suggestions', (req, res) => {
    const db = readDb();
    res.json(db.suggestions || []);
  });

  // submit suggestion
  app.post('/api/suggestions', (req, res) => {
    const { title, description, category, author, role } = req.body;
    if (!title || !description || !author || !role) {
      return res.status(400).json({ error: "Missing required suggestion fields" });
    }

    const db = readDb();
    const suggestions = db.suggestions || [];
    
    const newSuggestion = {
      id: 's_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      title,
      description,
      category: category || 'other',
      author,
      role,
      upvotes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };

    suggestions.unshift(newSuggestion);
    db.suggestions = suggestions;
    writeDb(db);

    res.json({ success: true, suggestion: newSuggestion, suggestions });
  });

  // upvote suggestion
  app.post('/api/suggestions/:id/upvote', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const suggestions = db.suggestions || [];
    
    const item = suggestions.find((s: any) => s.id === id);
    if (item) {
      item.upvotes = (item.upvotes || 0) + 1;
      writeDb(db);
      res.json({ success: true, upvotes: item.upvotes, suggestions });
    } else {
      res.status(404).json({ error: "Suggestion not found" });
    }
  });

  // post comment to suggestion
  app.post('/api/suggestions/:id/comment', (req, res) => {
    const { id } = req.params;
    const { author, text, role } = req.body;
    if (!author || !text || !role) {
      return res.status(400).json({ error: "Comment author, text, and role are required" });
    }

    const db = readDb();
    const suggestions = db.suggestions || [];
    const item = suggestions.find((s: any) => s.id === id);

    if (item) {
      if (!item.comments) item.comments = [];
      const newComment = {
        id: 'c_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        author,
        role,
        text,
        timestamp: "Just now"
      };
      item.comments.push(newComment);
      writeDb(db);
      res.json({ success: true, comments: item.comments, suggestions });
    } else {
      res.status(404).json({ error: "Suggestion not found" });
    }
  });

  // respond (SGB school response) to suggestion - ADMIN only
  app.post('/api/suggestions/:id/respond', (req, res) => {
    const { id } = req.params;
    const { password, schoolResponse } = req.body;

    if (password !== ADMIN_PASS) {
      return res.status(401).json({ error: "Unauthorized administration access" });
    }

    const db = readDb();
    const suggestions = db.suggestions || [];
    const item = suggestions.find((s: any) => s.id === id);

    if (item) {
      item.schoolResponse = schoolResponse || "";
      writeDb(db);
      res.json({ success: true, schoolResponse: item.schoolResponse, suggestions });
    } else {
      res.status(404).json({ error: "Suggestion not found" });
    }
  });

  // Delete/Archive suggestions - Admin only
  app.post('/api/admin/suggestions/:id/delete', (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (password !== ADMIN_PASS) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const db = readDb();
    db.suggestions = (db.suggestions || []).filter((s: any) => s.id !== id);
    writeDb(db);
    res.json({ success: true, suggestions: db.suggestions });
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
