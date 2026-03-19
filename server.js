const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    // 🔹 Serve CSS
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

    // 🔹 Serve JS
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

    // 🔹 Serve HTML
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

    // 🔹 Handle login (POST request)
    else if (req.method === 'POST' && req.url === '/login') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsedData = JSON.parse(body);  // ✅ parse JSON
                const email = parsedData.email;
                const password = parsedData.password;

                let message = "";

                if (!email || !password) {
                    message = 'Fields cannot be empty';
                } else if (!email.includes('@')) {
                    message = 'Invalid email format';
                } else if (password.length < 8) {
                    message = 'Password must be at least 8 characters';
                } else {
                    message = 'Login successful (demo)';
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message }));

            } catch (error) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
    }

    // 🔹 404 for everything else
    else {
        res.writeHead(404);
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});