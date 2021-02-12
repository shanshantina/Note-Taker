const fs = require('fs');
const path = require("path");
const router = require('express').Router();


// get the notes information from json file
router.get("/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        // if can't connect to json file, return error
        if (err) {
            return console.log(err);
        }
        // export json file to strings
        res.json(JSON.parse(data));
    });
});

// accept the user input notes 
router.post("/notes", function(req, res) {
    // check the current notes json file
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        const notes = JSON.parse(data);
        const dbNewList = [];

        notes.push(req.body);

        for(let i=0; i<notes.length; i++) {
            // create a new notes and push it to new list array
            const newNote = {
                title: notes[i].title,
                text: notes[i].text,
                id: i
            };
            dbNewList.push(newNote);
        }
        // convert the file to JSON form and add to the json list
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbNewList, null, 2), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("New notes is added to db.json file.");
            res.json(req.body);
        });
    })
});

// delete the note from list
router.delete("/notes/:id", function(req, res) {
    const id = parseInt(req.params.id);
    // check the current notes json file
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        const notes = JSON.parse(data);
        const dbNewList = [];

        for(let i=0; i<notes.length; i++) {
            // if the array number is not match with id number, refresh the id and add to the list
            if(i !==id) {
                const newNote = {
                    title: notes[i].title,
                    text: notes[i].text,
                    id: dbNewList.length
                };
                dbNewList.push(newNote);
            }
        }
        // convert the file to JSON form and refresh the list after delete the note
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbNewList, null, 2), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("The note is removed to db.json file.");
            res.json(req.body);
        });
    })
        
});

module.exports  = router;