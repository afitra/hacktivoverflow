const Model = require('../models/answer')
const jwt = require('../helper/jwt')
const User = require('../models/user')
const Post = require('../models/question')
class Controller {
    static create(req, res) {
        var validation = jwt.verify(req.headers.token)

        // jwt.verify(req.headers.token)
        console.log('okkkkkkkkkkkkkkkkkkkkkkkk');

        User.findOne({
                email: validation.email
            })

            .then(user => {
                // console.log(user)
                let obj = {
                    title: req.body.title,
                    description: req.body.description,
                    author: user._id,
                    upVote: [],
                    downVote: [],
                    questionId: req.body.questionId,
                    createdAt: new Date(),
                }
                return Model.create(obj)
            })
            .then(answer => {
                return Post.updateOne({
                    _id: req.body.questionId
                }, {
                    $push: {
                        answerId: answer._id
                    }
                })
            })
            .then(post => {
                // console.log('tessssss');
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Invalid Token!'
                })
            })
    }
    static all(req, res) {
        console.log('okokokkkoko');

        Model.find({})
            .populate("author").populate("questionId")
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.send(err)
            })
    }


}
module.exports = Controller