//Application dependencies
var server = require('./server.js');
var connection = require('./connection.mongoose.js');
var myNotesAppSchema = require('./models/my-notes.mongoose.js');
var authenticationSchema = require('./models/authentication.mongoose.js');

var mongoose = require('mongoose');
var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var cors = require('cors');

var app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));


/*app.use(function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});*/

/*Http Requests*/

/* 
myNotesAppSchema
*/
//addNote
app.post('/add-my-notes', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err)
        {
            res.status(400).send("Token not verified.");
        }
        else
        {
            myNotesAppSchema.addNote(authData.user[0].userId, req.body, function(err, noteObject)
            {
                console.log(authData);
                if(err)
                {
                    res.status(400).send("Bad request.");
                    return;
                }
                res.json(noteObject);
            });
        }
    });

});

//updateNote
app.put('/update-my-notes/:noteId', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err)
        {
            console.log("HEREEEEEE..");
            console.log(err);
            res.status(400).send("Token not verified.");
        }
        else
        {
            console.log(authData);
            myNotesAppSchema.updateNote(authData.user[0].userId, req.params.noteId, req.body, {}, function(err, noteObject)
            {
                if(err)
                {
                    res.status(404).send("Error updating the object.");
                    return;
                }
                res.json(noteObject);
            });
        }
    });
});

//deleteNote
app.delete('/delete-my-notes/:noteId', verifyToken, (req, res) => {
    console.log("Delete.");
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err)
        {
            req.status(400).send("Token not verified.");
        }
        else
        {
            console.log(authData);
            myNotesAppSchema.deleteNote(authData.user[0].userId, req.params.noteId, function(err, noteObject)
            {
                
                if(err)
                {
                    res.status(404).send("Error deleting the object.");
                    return;
                }
                res.json(noteObject);
            });
        }
    });
});

//getAllNotes
app.get('/get-my-notes', verifyToken, (req, res) => {
    //console.log("/get-my-notes");
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        //console.log(req.token);
        if(err)
        {
            res.status(400).send("Token not verified.");
        }
        else
        {
            console.log(authData);
            myNotesAppSchema.getAllNotes(authData.user[0].userId, function(err, noteObject)
            {
                if(err)
                {
                    res.status(404).send("Error getting the object.");
                    return;
                }
                res.json(noteObject);
            });
        }
    });
});


/* 
authenticationSchema
*/
//addUser
app.post('/register', (req, res) => {
    console.log("In /register.");

    authenticationSchema.AuthenticationModel.find({ userId: req.body.userId }, function(err, userObject)
    {
        if(userObject.length === 1)
        {
            res.json({ "status": false });
        }
        else
        {
            authenticationSchema.addUser(req.body, function(err, userObject)
            {
                if(err)
                {
                    res.status(400).send("Bad request.");
                    return;
                }
                res.json(userObject);
            });
        }
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
app.post('/login', (req, res) => {
    authenticationSchema.validateUser(req.query.userId, req.query.password, function(err, isValid)
    {
        if(err)
        {
            res.status(400).send("Error validating the user");
            return;
        }

        //console.log(isValid);
        if(isValid.length === 1)
        {
            jwt.sign({ user: isValid }, 'secretkey', (err, token) => {
                res.json({ userId: isValid[0].userId, password: isValid[0].password, token: token });
            });
        }
        else
        {
            res.status(400).send("Unknown user.");
        }
        
    });
});

//getAllUsers
app.get('/users', (req, res) => {
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


//Verify token
function verifyToken(req, res, next)
{
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined')
    {
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
    }
    else
    {
        res.status(400).send("Token not verified.");
    }

}



app.get('/', (req, res) => {
    res.send("Hello/");
});


//Running the server
server.run(app, process.env.PORT || 3000);