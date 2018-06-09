//Application dependencies
var server = require('./server.js');
var connection = require('./connection.mongoose.js');
var schema = require('./models/schema.mongoose.js');

var mongoose = require('mongoose');
var express = require('express');

var app = express();

//Middlewares
app.use(express.json());

/*Http Requests*/

//addNote
app.post('/my-notes/:userId', (req, res) => {
    schema.addNote(req.params.userId, req.body, function(err, noteObject)
    {
       if(err)
       {
           res.status(400).send("Bad request.");
           return;
       }
       res.json(noteObject);
    });
});

//updateNote
app.put('/my-notes/:userId/:noteId', (req, res) => {
    schema.updateNote(req.params.userId, req.params.noteId, req.body, {}, function(err, noteObject)
    {
        if(err)
        {
            res.status(404).send("Error updating the object.");
            return;
        }
        res.json(noteObject);
    });
});

//deleteNote
app.delete('/my-notes/:userId/:noteId', (req, res) => {
    schema.deleteNote(req.params.userId, req.params.noteId, function(err, noteObject)
    {
        if(err)
        {
            res.status(404).send("Error deleting the object.");
            return;
        }
        res.json(noteObject);
    });
});

//getAllNotes
app.get('/my-notes/:userId', (req, res) => {
    schema.getAllNotes(req.params.userId, function(err, noteObject)
    {
        if(err)
        {
            res.status(404).send("Error getting the object.");
            return;
        }
        res.json(noteObject);
    });
});


app.get('/', (req, res) => {
    res.send("Hello/");
});


//Running the server
server.run(app, 3000);