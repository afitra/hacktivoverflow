var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')

var questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upVote: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    downVote: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    answerId: [{
        type: Schema.Types.ObjectId,
        ref: 'Answers'
    }],
    createdAt: Date,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});


let Question = mongoose.model('Questions', questionSchema)


module.exports = Question