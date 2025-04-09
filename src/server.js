import fs from 'fs';
import https from 'https';
import "dotenv/config.js";

import app from './app.js';

import { mongoConnect } from './services/mongo.js';

const PORT = process.env.PORT

const server = https.createServer({
    key : fs.readFileSync('key.pem'),
    cert : fs.readFileSync('cert.pem')
}, app)

const startServer = async () => {
    await mongoConnect();

    server.listen(PORT, () => { 
        console.log(`Server is running on port ${PORT}`)
    })
}

startServer();