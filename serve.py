# save as serve.py in the project root (same folder that contains index.html)
from http.server import HTTPServer, SimpleHTTPRequestHandler
import mimetypes

mimetypes.add_type('font/woff', '.woff')
mimetypes.add_type('font/woff2', '.woff2')

class Handler(SimpleHTTPRequestHandler):
    # Optional: cache fonts a bit to reduce flashes
    def end_headers(self):
        if self.path.endswith(('.woff', '.woff2')):
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        super().end_headers()

if __name__ == '__main__':
    HTTPServer(('', 8000), Handler).serve_forever()