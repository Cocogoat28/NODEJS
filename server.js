const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath;
    let contentType = 'text/html';
    let statusCode = 200;

    switch (req.url) {
        case '/home':
            filePath = path.join(__dirname, 'views', 'home.html');
            break;
        case '/about':
            filePath = path.join(__dirname, 'views', 'about.html');
            break;
        case '/contact':
            filePath = path.join(__dirname, 'views', 'contact.html');
            break;
        case '/styles.css':
            filePath = path.join(__dirname, 'public', 'styles.css');
            contentType = 'text/css';
            break;
        default:
            filePath = path.join(__dirname, 'views', '404.html');
            statusCode = 404;
            break;
    }

    // Read the file asynchronously and serve it
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found error
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});