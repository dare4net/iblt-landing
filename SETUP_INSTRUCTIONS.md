# IBLT Landing Page - Setup Instructions

## Current Issue
The partials are not loading because you need to serve the site through a web server, not open it directly as a file.

## Solution: Use Live Server (Recommended)

### Option 1: VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index_new.html`
3. Select "Open with Live Server"
4. Your browser will open at `http://localhost:5500` or similar
5. The partials will load correctly!

### Option 2: Python HTTP Server
```bash
# Navigate to project directory
cd "C:\Users\USER\Desktop\AST\iblt-landing"

# Start server (Python 3)
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000/index_new.html`

### Option 3: Node.js http-server
```bash
# Install globally
npm install -g http-server

# Run in project directory
http-server -p 8000
```

Then open: `http://localhost:8000/index_new.html`

## Important Files

- **`index_new.html`** ✅ - Clean modular version (USE THIS ONE)
- **`index.html`** ❌ - Has duplicate content and lint errors (needs replacement)
- **`assets/js/include.js`** ✅ - Updated to support both file:// and http://

## File Replacements Needed

1. **Delete or rename the old index.html:**
   ```
   Rename: index.html → index_old.html
   ```

2. **Rename the new clean file:**
   ```
   Rename: index_new.html → index.html
   ```

3. **Start a local server** using one of the options above

4. **Open in browser:**
   ```
   http://localhost:8000/index.html
   ```

## Why This is Needed

The `data-include` mechanism uses XMLHttpRequest/fetch to load partial HTML files. Browsers block these requests when opening files directly (file:// protocol) due to CORS security restrictions. A local web server solves this.

## Verify It Works

Once the server is running and you open the page, you should see:
- ✅ Navigation header with dropdowns
- ✅ Hero section with typewriter effect
- ✅ All section content loaded
- ✅ Footer with all links
- ✅ No browser console errors

If you see errors in the browser console (F12), they will indicate which partials failed to load.
