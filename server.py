import http.server
import socketserver

PORT = 8090  # Puedes cambiarlo si necesitas otro puerto

# Configurar el manejador para servir archivos desde el directorio actual
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor iniciado en http://localhost:{PORT}")
    httpd.serve_forever()
