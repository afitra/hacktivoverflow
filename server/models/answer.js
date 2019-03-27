var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')


var answerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    },
    createdAt: Date,
    updatedAt: Date
});


let Answer = mongoose.model('Answers', answerSchema)


module.exports = Answer