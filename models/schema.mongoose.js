//Dependencies
var mongoose = require('mongoose');

//MyNotesApp Schema
var myNotesAppSchema = mongoose.Schema(
    {
        userId:
        {
            type: String,
            required: true
        },
        noteId:
        {
            type: String,
            required: true
        },
        noteText:
        {
            type: String,
            required: true
        }
    }
);

var MyNotesAppModel = mongoose.model('MyNotesAppModel', myNotesAppSchema);

/*Functions to handle Http requests*/

exports.addNote = function(_userId, newNoteObject, callback)
{
    var newNote = {
        userId: _userId,
        noteId: newNoteObject.noteId,
        noteText: newNoteObject.noteText
    };

    MyNotesAppModel.create(newNote, callback);
}

exports.updateNote = function(_userId, _noteId, updatedNoteObject, options, callback)
{
    var query = {userId: _userId, noteId: _noteId};

    var update;
    
    if(updatedNoteObject.noteText)
    {
        update = { noteText: updatedNoteObject.noteText };
    }

    MyNotesAppModel.findOneAndUpdate(query, update, options, callback)
}

exports.deleteNote = function(userId, noteId, callback)
{
    var query = {userId: _userId, noteId: _noteId};

    MyNotesAppModel.remove(query, callback);
}

exports.getAllNotes = function(userId, callback)
{
    MyNotesAppModel.findById(userId, callback)
}