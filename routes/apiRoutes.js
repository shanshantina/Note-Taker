const fs = require('fs');
var util = require('util');
const path = require("path");
const router = require('express').Router();

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
let notes;

router.get("/notes", function(req, res) {
    readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
    .then (function(data) {
        return res.json(JSON.parse(data));
    });
});

router.post("/notes", function(req, res) {
    let newNote = req.body;
    readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
    .then(function(data) {
        notes = JSON.parse(data);
        if (newNote.id || newNote.id === 0) {
            let currentNote = notes[newNote.id];
            currentNote.title = newNote.title;
            currentNote.text = newNote.text;
        } else {
            notes.push(newNote);
        }
        writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes))
        .then(function() {
            console.log("add the note to json file");
        }); 
    });
    res.json(newNote); 
});

router.delete("/notes/:id", function(req, res) {
    let id = req.params.id;
    readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
    .then(function(data) {
        notes = JSON.parse(data);
        notes.splice(id, 1);
        writeFileAsync(path.join(__dirname, "../db/db.json"),JSON.stringify(notes))
        .then(function() {
            console.log("deleted the note from json file");
        });
    });
    res.json(id);
});

module.exports  = router;

