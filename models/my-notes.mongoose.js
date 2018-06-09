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
        },
        createdOn:
        {
            type: Date,
            default: Date.now,
            required: true
        },
        updatedOn:
        {
            type: Date,
            default: Date.now,
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
        noteText: newNoteObject.noteText,
        updatedOn: newNoteObject.updatedOn
    };

    MyNotesAppModel.create(newNote, callback);
}

exports.updateNote = function(_userId, _noteId, updatedNoteObject, options, callback)
{
    var query = {userId: _userId, noteId: _noteId};

    var update;
    
    if(updatedNoteObject.noteText)
    {
        update = { noteText: updatedNoteObject.noteText, updatedOn: updatedNoteObject.updatedOn };
    }

    MyNotesAppModel.findOneAndUpdate(query, update, options, callback)
}

exports.deleteNote = function(_userId, _noteId, callback)
{
    var query = { userId: _userId, noteId: _noteId };

    MyNotesAppModel.remove(query, callback);
}

exports.getAllNotes = function(_userId, callback)
{
    var query = { userId: _userId };

    MyNotesAppModel.find(query, callback);
}