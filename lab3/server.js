const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Простое хранилище данных в памяти (в реальном проекте использовалась бы база данных)
let artists = [
    {
        id: 1,
        name: "The Beatles",
        genre: "Rock",
        imageUrl: "https://via.placeholder.com/300x200/007bff/ffffff?text=The+Beatles",
        description: "Легендарная британская рок-группа, которая изменила музыку навсегда."
    },
    {
        id: 2,
        name: "Queen",
        genre: "Rock",
        imageUrl: "https://via.placeholder.com/300x200/dc3545/ffffff?text=Queen",
        description: "Британская рок-группа, известная своими эпическими композициями."
    },
    {
        id: 3,
        name: "Michael Jackson",
        genre: "Pop",
        imageUrl: "https://via.placeholder.com/300x200/28a745/ffffff?text=Michael+Jackson",
        description: "Король поп-музыки, один из самых влиятельных артистов всех времен."
    }
];

let nextId = 4;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Устанавливаем CORS заголовки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API эндпоинты для работы с артистами
    if (pathname === '/artists' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(artists));
        return;
    }

    if (pathname === '/artists' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const artistData = JSON.parse(body);
                const newArtist = {
                    id: nextId++,
                    ...artistData
                };
                artists.push(newArtist);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newArtist));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }

    // Получить артиста по ID
    if (pathname.match(/^\/artists\/\d+$/) && req.method === 'GET') {
        const id = parseInt(pathname.split('/')[2]);
        const artist = artists.find(a => a.id === id);
        if (artist) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(artist));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Artist not found' }));
        }
        return;
    }

    // Обновить артиста
    if (pathname.match(/^\/artists\/\d+$/) && req.method === 'PATCH') {
        const id = parseInt(pathname.split('/')[2]);
        const artistIndex = artists.findIndex(a => a.id === id);
        if (artistIndex !== -1) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const updateData = JSON.parse(body);
                    artists[artistIndex] = { ...artists[artistIndex], ...updateData };
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(artists[artistIndex]));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Artist not found' }));
        }
        return;
    }

    // Удалить артиста
    if (pathname.match(/^\/artists\/\d+$/) && req.method === 'DELETE') {
        const id = parseInt(pathname.split('/')[2]);
        const artistIndex = artists.findIndex(a => a.id === id);
        if (artistIndex !== -1) {
            artists.splice(artistIndex, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Artist deleted successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Artist not found' }));
        }
        return;
    }

    // Раздача статических файлов
    let filePath = pathname === '/' ? '/index.html' : pathname;
    filePath = path.join(__dirname, filePath);

    // Проверяем существование файла
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
            return;
        }

        // Определяем MIME тип
        const ext = path.extname(filePath);
        let contentType = 'text/html';
        
        switch (ext) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
        }

        // Читаем и отправляем файл
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
                return;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Откройте браузер и перейдите по адресу выше');
}); 