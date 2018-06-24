/*
-- mLab --
DATABASE NAME: mn-mynotesapp
Database Username: emad
User Password: emadmlab123

*/

//Dependencies
var mongoose = require('mongoose');

//Connecting to MongoDB

//mongoose.connect('mongodb://localhost/MyNotesApp');
mongoose.connect('mongodb://emad:emadmlab123@ds217131.mlab.com:17131/mn-mynotesapp', () => 
    {
        console.log("Connected to DB...");
    });