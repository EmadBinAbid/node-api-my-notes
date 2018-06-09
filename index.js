//Application dependencies
var server = require('./server.js');
var connection = require('./connection.mongoose.js');
var myNotesAppSchema = require('./models/my-notes.mongoose.js');
var authenticationSchema = require('./models/authentication.mongoose.js');

var mongoose = require('mongoose');
var express = require('express');

var app = express();

//Middlewares
app.use(express.json());

app.use(function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/*Http Requests*/

/* 
myNotesAppSchema
*/
//addNote
app.post('/my-notes/:userId', (req, res) => {
    myNotesAppSchema.addNote(req.params.userId, req.body, function(err, noteObject)
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
    myNotesAppSchema.updateNote(req.params.userId, req.params.noteId, req.body, {}, function(err, noteObject)
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
    myNotesAppSchema.deleteNote(req.params.userId, req.params.noteId, function(err, noteObject)
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
    myNotesAppSchema.getAllNotes(req.params.userId, function(err, noteObject)
    {
        if(err)
        {
            res.status(404).send("Error getting the object.");
            return;
        }
        res.json(noteObject);
    });
});


/* 
authenticationSchema
*/
//addUser
app.post('/authentication', (req, res) => {
    authenticationSchema.addUser(req.body, function(err, userObject)
    {
       if(err)
       {
           res.status(400).send("Bad request.");
           return;
       }
       res.json(userObject);
    });
});

//updateUser
app.put('/authentication/:userId', (req, res) => {
    authenticationSchema.updateUser(req.params.userId, req.body, {}, function(err, userObject)
    {
        if(err)
        {
            res.status(404).send("Error updating the object.");
            return;
        }
        res.json(userObject);
    });
});

//deleteUser
app.delete('/authentication/:userId', (req, res) => {
    authenticationSchema.deleteUser(req.params.userId, function(err, userObject)
    {
        if(err)
        {
            res.status(404).send("Error deleting the object.");
            return;
        }
        res.json(userObject);
    });
});

//getUserById
app.get('/authentication/:userId', (req, res) => {
    authenticationSchema.getUserById(req.params.userId, function(err, userObject)
    {
        if(err)
        {
            res.status(404).send("Error getting the object.");
            return;
        }
        res.json(userObject);
    });
});

//validateUser
app.get('/authentication-user', (req, res) => {
    authenticationSchema.validateUser(req.query.userId, req.query.password, function(err, isValid)
    {
        if(err)
        {
            res.status(400).send("Error validating the user");
            return;
        }

        if(isValid.length === 1)
        {
            res.status(200).send(true);
        }
        else
        {
            res.status(200).send(false);
        }
    });
});

//getAllUsers
app.get('/authentication', (req, res) => {
    authenticationSchema.getAllUsers(function(err, userObject)
    {
        if(err)
        {
            res.status(404).send("Error getting the object.");
            return;
        }
        res.json(userObject);
    });
});



app.get('/', (req, res) => {
    res.send("Hello/");
});


//Running the server
server.run(app, 3000);