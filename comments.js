// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

// Set up the body-parser
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// GET request
app.get('/comments', (req, res) => {
    // Read the comments.json file
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }
        const comments = JSON.parse(data);
        res.json(comments);
    });
});

// POST request
app.post('/comments', (req, res) => {
    // Read the comments.json file
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }
        const comments = JSON.parse(data);
        // Add the new comment to the comments object
        const newComment = {
            id: Date.now(),
            text: req.body.text
        };
        comments.push(newComment);
        // Write the comments object back to the file
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                console.log('Error writing file:', err);
                res.status(500).send('Error writing file');
                return;
            }
            res.json(newComment);
        });
    }
    );
});
