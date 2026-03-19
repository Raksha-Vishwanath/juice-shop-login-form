const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    // Serve CSS
    if (req.method === 'GET' && req.url === '/style.css') {
        fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading CSS');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    }

    // Serve JS
    else if (req.method === 'GET' && req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading JS');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    }

    // Serve HTML
    else if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading HTML');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    // LOGIN ROUTE
    else if (req.method === 'POST' && req.url === '/login') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsedData = JSON.parse(body);
                const email = parsedData.email;
                const password = parsedData.password;

                // Basic validation
                if (!email || !password) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h3>Fields cannot be empty</h3>');
                } 
                else if (!email.includes('@')) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h3>Invalid email format</h3>');
                } 
                else if (password.length < 8) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h3>Password must be at least 8 characters</h3>');
                } 
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`<h2>Welcome ${email}</h2>`);
                }

            } catch (error) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
    }

    // 404
    else {
        res.writeHead(404);
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});