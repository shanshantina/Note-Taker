const fs = require('fs');
const path = require("path");
const router = require('express').Router();


router.get("/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.json(JSON.parse(data));
    });
});

router.post("/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        const notes = JSON.parse(data);
        const addToDb = [];

        notes.push(req.body);

        for(let i=0; i<notes.length; i++) {
            const addedNotes = {
                title: notes[i].title,
                text: notes[i].text,
                id: i
            };
            addToDb.push(addedNotes);
        }
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(addToDb, null, 2), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("New notes is added to db.json file.");
            res.json(req.body);
        });
    })
});

router.delete("/notes/:id", function(req, res) {
    const id = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        const notes = JSON.parse(data);
        const addToDb = [];

        for(let i=0; i<notes.length; i++) {
            if(i !==id) {
                const addedNotes = {
                    title: notes[i].title,
                    text: notes[i].text,
                    id: i
                };
                addToDb.push(addedNotes);
            }
        }
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(addToDb, null, 2), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("The note is removed to db.json file.");
            res.json(req.body);
        });
    })
        
});

module.exports  = router;

