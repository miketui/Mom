#!/usr/bin/env bun
/**
 * Book XHTML Viewer Server
 * Serves XHTML files from Book/OEBPS with proper CSS, fonts, and images
 */

import { serve } from "bun";
import { readdir } from "fs/promises";
import { join, extname, basename } from "path";

const PORT = 3456;
const BOOK_DIR = join(import.meta.dir, "Book", "OEBPS");
const XHTML_DIR = join(BOOK_DIR, "xhtml");

// MIME types for various file types
const MIME_TYPES: Record<string, string> = {
  ".xhtml": "application/xhtml+xml",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".ico": "image/x-icon",
};

// Get list of XHTML files
async function getXHTMLFiles(): Promise<string[]> {
  try {
    const files = await readdir(XHTML_DIR);
    return files
      .filter((f) => f.endsWith(".xhtml"))
      .sort();
  } catch (error) {
    console.error("Error reading XHTML directory:", error);
    return [];
  }
}

// Generate navigation HTML
async function generateNavigation(currentFile?: string): Promise<string> {
  const files = await getXHTMLFiles();

  const fileLinks = files
    .map((file) => {
      const isActive = file === currentFile;
      const displayName = file
        .replace(/^\d+-/, "")
        .replace(/-/g, " ")
        .replace(/\.xhtml$/, "");

      return `
        <li class="${isActive ? "active" : ""}">
          <a href="/view/${file}" ${isActive ? 'aria-current="page"' : ""}>
            ${displayName}
          </a>
        </li>
      `;
    })
    .join("\n");

  return `
    <nav class="book-navigation">
      <h3>📖 Book Contents</h3>
      <ul>
        ${fileLinks}
      </ul>
    </nav>
  `;
}

// Generate index page
async function generateIndexPage(): Promise<string> {
  const files = await getXHTMLFiles();
  const nav = await generateNavigation();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book XHTML Viewer</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Libre Baskerville', Georgia, serif;
      background: linear-gradient(135deg, #f9f7f2 0%, #e8e4da 100%);
      color: #1a1a1a;
      min-height: 100vh;
      padding: 2rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    h1 {
      font-family: 'Cinzel Decorative', Georgia, serif;
      color: #2B9999;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #C9A961;
      font-size: 1.1rem;
      font-weight: normal;
    }

    .book-navigation {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .book-navigation h3 {
      color: #2B9999;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .book-navigation ul {
      list-style: none;
    }

    .book-navigation li {
      margin-bottom: 0.75rem;
    }

    .book-navigation a {
      color: #444444;
      text-decoration: none;
      padding: 0.75rem 1rem;
      display: block;
      border-radius: 6px;
      transition: all 0.3s ease;
      text-transform: capitalize;
    }

    .book-navigation a:hover {
      background: #f9f7f2;
      color: #2B9999;
      padding-left: 1.5rem;
    }

    .book-navigation li.active a {
      background: #2B9999;
      color: white;
      font-weight: bold;
    }

    .stats {
      margin-top: 2rem;
      padding: 1.5rem;
      background: #f9f7f2;
      border-radius: 8px;
      border-left: 4px solid #C9A961;
    }

    .stats p {
      margin: 0.5rem 0;
      color: #444444;
    }

    .stats strong {
      color: #2B9999;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📚 Book XHTML Viewer</h1>
      <p class="subtitle">Curls & Contemplation - Interactive Book Browser</p>
    </header>

    ${nav}

    <div class="stats">
      <p><strong>${files.length}</strong> chapters available</p>
      <p>Click any chapter to view it with full styling, fonts, and images</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Generate viewer page with iframe
async function generateViewerPage(filename: string): Promise<string> {
  const nav = await generateNavigation(filename);
  const files = await getXHTMLFiles();
  const currentIndex = files.indexOf(filename);
  const prevFile = currentIndex > 0 ? files[currentIndex - 1] : null;
  const nextFile = currentIndex < files.length - 1 ? files[currentIndex + 1] : null;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename} - Book Viewer</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Libre Baskerville', Georgia, serif;
      display: flex;
      height: 100vh;
      overflow: hidden;
      background: #f9f7f2;
    }

    .sidebar {
      width: 300px;
      background: white;
      border-right: 2px solid #e0e0e0;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .sidebar h3 {
      color: #2B9999;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      position: sticky;
      top: 0;
      background: white;
      padding: 0.5rem 0;
      z-index: 10;
    }

    .sidebar ul {
      list-style: none;
    }

    .sidebar li {
      margin-bottom: 0.5rem;
    }

    .sidebar a {
      color: #444444;
      text-decoration: none;
      padding: 0.5rem 0.75rem;
      display: block;
      border-radius: 4px;
      transition: all 0.2s ease;
      font-size: 0.9rem;
      text-transform: capitalize;
    }

    .sidebar a:hover {
      background: #f9f7f2;
      color: #2B9999;
      padding-left: 1rem;
    }

    .sidebar li.active a {
      background: #2B9999;
      color: white;
      font-weight: bold;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .top-bar {
      background: white;
      border-bottom: 2px solid #e0e0e0;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .top-bar h2 {
      color: #2B9999;
      font-size: 1.1rem;
      flex: 1;
      text-transform: capitalize;
    }

    .nav-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .nav-buttons a,
    .nav-buttons button {
      padding: 0.5rem 1rem;
      background: #2B9999;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.2s;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .nav-buttons a:hover,
    .nav-buttons button:hover {
      background: #1F7272;
    }

    .nav-buttons a.disabled {
      background: #cccccc;
      cursor: not-allowed;
      pointer-events: none;
    }

    .content-frame {
      flex: 1;
      border: none;
      background: white;
    }

    @media (max-width: 768px) {
      .sidebar {
        position: absolute;
        left: -300px;
        height: 100%;
        transition: left 0.3s;
        z-index: 100;
        box-shadow: 2px 0 10px rgba(0,0,0,0.1);
      }

      .sidebar.open {
        left: 0;
      }
    }
  </style>
</head>
<body>
  <div class="sidebar">
    ${nav}
  </div>

  <div class="main-content">
    <div class="top-bar">
      <h2>📄 ${filename.replace(/^\d+-/, "").replace(/-/g, " ").replace(/\.xhtml$/, "")}</h2>
      <div class="nav-buttons">
        ${prevFile ? `<a href="/view/${prevFile}">← Previous</a>` : '<a class="disabled">← Previous</a>'}
        <a href="/">🏠 Home</a>
        ${nextFile ? `<a href="/view/${nextFile}">Next →</a>` : '<a class="disabled">Next →</a>'}
      </div>
    </div>

    <iframe
      class="content-frame"
      src="/xhtml/${filename}"
      title="${filename}"
    ></iframe>
  </div>
</body>
</html>
  `;
}

// Start server
const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    try {
      // Index page
      if (pathname === "/" || pathname === "/index.html") {
        const html = await generateIndexPage();
        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        });
      }

      // Viewer page
      if (pathname.startsWith("/view/")) {
        const filename = pathname.replace("/view/", "");
        const html = await generateViewerPage(filename);
        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        });
      }

      // Serve XHTML files
      if (pathname.startsWith("/xhtml/")) {
        const filename = pathname.replace("/xhtml/", "");
        const filePath = join(XHTML_DIR, filename);
        const file = Bun.file(filePath);

        if (await file.exists()) {
          return new Response(file, {
            headers: { "Content-Type": "application/xhtml+xml" },
          });
        }
      }

      // Serve other static files (CSS, fonts, images)
      if (pathname.startsWith("/style/") ||
          pathname.startsWith("/fonts/") ||
          pathname.startsWith("/images/")) {
        const filePath = join(BOOK_DIR, pathname.slice(1));
        const file = Bun.file(filePath);

        if (await file.exists()) {
          const ext = extname(pathname);
          const mimeType = MIME_TYPES[ext] || "application/octet-stream";
          return new Response(file, {
            headers: { "Content-Type": mimeType },
          });
        }
      }

      // 404
      return new Response("Not Found", { status: 404 });
    } catch (error) {
      console.error("Server error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
});

console.log(`🚀 Book Viewer Server running at http://localhost:${PORT}`);
console.log(`📖 Serving files from: ${BOOK_DIR}`);
console.log(`\n🌐 Open in browser: http://localhost:${PORT}`);
console.log(`\nPress Ctrl+C to stop the server\n`);
