import fs from 'fs';
import https from 'https';
import { config } from 'dotenv';

config();

import app from './app.js';

const PORT = process.env.PORT

const server = https.createServer({
    key : fs.readFileSync('key.pem'),
    cert : fs.readFileSync('cert.pem')
}, app)

server.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
})