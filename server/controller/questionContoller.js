const Model = require('../models/question'),
    jwt = require('../helper/jwt'),
    User = require('../models/user')

class Controller {

    static downvote(req, res) {
        var validasi = jwt.verify(req.headers.token)
        var ID = ''
        var trueVote = false
        var arr = []
        var index = ''
        var temp = ''
        User.findOne({
                email: validasi.email
            })
            .then(data => {
                // console.log(req.params, '==kkkkkk');
                ID = data._id
                return Model.findOne({
                    _id: req.params.id
                })
            })
            .then(data => {
                for (var i = 0; i < data.upVote.length; i++) {
                    if (String(data.upVote[i]._id) === String(ID)) {
                        trueVote = true
                        if (i == 0) {
                            index = -1
                            break
                        } else {
                            index = i
                            break
                        }
                    }
                }
                // temp = data.upVote.filter(word => word == String(ID))

                // =============================================sampek sisi
                if (trueVote == true) {
                    console.log('ini temp', temp);

                    Model.findOneAndUpdate({
                            _id: ID
                        }, {
                            upVote: temp
                        })
                        .then(data => {
                            // console.log(index, 'kkkkkkkkk');
                            // console.log(data);

                        })
                        .catch(err => {
                            console.log(err);

                        })

                } else {
                    console.log('masok else=======');
                    return Model.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        $push: {
                            downVote: ID
                        }
                    })
                }
            })
            .then(data => {
                res.status(200).json(data)
                console.log(data);

            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })



    }

    // static downvotePost(req, res) {
    //     let flagUp = true
    //     Model
    //         .findById(req.params.id)
    //         .then(function (onePost) {
    //             let vote = {
    //                 oneUpvote: onePost.upVote,
    //                 oneDownvote: onePost.downVote
    //             }
    //             if (vote.oneDownvote.length > 0) {
    //                 for (let i = 0; i < vote.oneDownvote.length; i++) {
    //                     if (JSON.stringify(vote.oneDownvote[i]) === JSON.stringify(req.body.userId)) {
    //                         flagUp = false
    //                         break
    //                     }
    //                 }
    //                 if (!flagUp) {
    //                     res.status(400).json({
    //                         message: `You already upvote this post`
    //                     })
    //                 } else {
    //                     vote.oneDownvote.push(req.body.userId)
    //                     return vote
    //                 }
    //             } else {
    //                 vote.oneDownvote.push(req.body.userId)
    //                 return vote
    //             }
    //         })
    //         .then(function (vote) {
    //             if (vote.oneUpvote.length > 0) {
    //                 for (let i = 0; i < vote.oneUpvote.length; i++) {
    //                     if (JSON.stringify(vote.oneUpvote[i]) === JSON.stringify(req.body.userId)) {
    //                         vote.oneUpvote.splice(i, 1)
    //                     }
    //                 }
    //             }
    //             return question.findByIdAndUpdate(req.params.id, {
    //                 upvote: vote.oneUpvote,
    //                 downvote: vote.oneDownvote
    //             })
    //         })
    //         .then(function (post) {
    //             res.status(200).json(post)
    //         })
    //         .catch(function (err) {
    //             res.status(500).json(err)
    //         })
    // }
    static upvote(req, res) {
        var validasi = jwt.verify(req.headers.token)
        var ID = ''
        var trueVote = false
        User.findOne({
                email: validasi.email
            })
            .then(data => {
                // console.log(req.params, '==kkkkkk');
                ID = data._id
                return Model.findOne({
                    _id: req.params.id
                })

            })
            .then(data => {
                for (var i = 0; i < data.upVote.length; i++) {
                    // console.log((data.upVote[i]._id), '===');
                    // console.log(ID);

                    // console.log();

                    if (String(ID) == String(data.upVote[i]._id)) {
                        // console.log(ID, 'ini ID NYA');
                        // console.log(data.upVote[i]);
                        // console.log('-------------------------------');

                        trueVote = true
                    }
                }
                // var a = data.upVote.indexof(ID)
                // console.log(a, '0000000000');


                // console.log(trueVote, 'ooooooooooooooo');
                if (trueVote == true) {
                    console.log('oooooooooooooooooooo');
                    throw new Error("BROKEN")

                } else {
                    console.log('masok else=======');

                    return Model.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        $push: {
                            upVote: ID
                        }
                    })

                }
            })
            .then(data => {
                res.status(200).json(data)
                console.log(data);

            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })

    }
    static tambah(req, res) {
        console.log('okokokokoko');

    }
    static one(req, res) {
        // console.log(req.params, '=========');
        var validasi = jwt.verify(req.headers.token)
        // console.log(validasi);

        User.findOne({
                email: validasi.email
            })
            .then(data => {
                return Model.findOne({
                        _id: req.params.id
                    })
                    .populate("answerId")
                    .populate("userId")
            })

            .then(data => {
                res.status(200).json(data)
                console.log(data);

            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }

    static addData(req, res) {

        console.log('oooooooooooooooo');

        User.findOne({
                email: validasi.email
            })
            .then(data => {
                return Model.create({
                    title: req.body.title,
                    description: req.body.description,
                    upVote: [],
                    downVote: [],
                    answerId: [],
                    createAt: new Date(),
                    userId: data._id
                })
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }
    static all(req, res) {
        Model.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }

    static remove(req, res) {

        Model.findByIdAndDelete(req.params.id)
            .then(function (data) {
                res.send('ok')
                console.log(data);

            })
            .catch(function (err) {
                res.send(err)
            })
    }

}
module.exports = Controller