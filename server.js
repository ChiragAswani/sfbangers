const credentials = require('./vars/credentials.json');
const env = require('./vars/env.json');

const express = require('express');
const {google} = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
app.disable('etag');
app.use(express.static(__dirname + '/build', { etag: false }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/ping', (req, res) => {return res.status(200).send(`${env.BACKEND_URL} ${env.NODE_ENV}`)});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"), {
        headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
        },
    });
});app.listen(process.env.PORT || 8080, async () => {console.log('Running on port 8080');});
