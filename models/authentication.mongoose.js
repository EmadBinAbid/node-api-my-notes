//Dependencies
var mongoose = require('mongoose');

//Authentication Schema
var authenticationSchema = mongoose.Schema(
    {
        userId:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        }
    }
);

var AuthenticationModel = exports.AuthenticationModel = mongoose.model('AuthenticationModel', authenticationSchema);

/*Functions to handle Http requests*/

exports.addUser = function(newUserObject, callback)
{
    AuthenticationModel.create(newUserObject, callback);   
}

exports.updateUser = function(_userId, updatedUserObject, options, callback)
{
    var query = {userId: _userId};

    var update;
    
    if(updatedUserObject.password)
    {
        update = { password:  updatedUserObject.password};
    }

    AuthenticationModel.findOneAndUpdate(query, update, options, callback)
}

exports.deleteUser = function(_userId, callback)
{
    var query = { userId: _userId };

    AuthenticationModel.remove(query, callback);
}

exports.getUserById = function(_userId, callback)
{
    var query = { userId: _userId };

    AuthenticationModel.find(query, callback);
}

exports.getAllUsers = function(callback)
{
    AuthenticationModel.find(callback);
}

exports.validateUser = function(_userId, _password, callback)
{
    var query = { userId: _userId, password: _password };
    AuthenticationModel.find(query, callback);
}