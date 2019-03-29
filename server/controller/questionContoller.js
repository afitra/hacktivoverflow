const Model = require('../models/question'),
    jwt = require('../helper/jwt'),
    User = require('../models/user')

class Controller {

    static downvote(req, res) {
        var validasi = jwt.verify(req.headers.token)
        var ID = ''
        var trueVote = false
        // console.log(req.body.questionId);
        User.findOne({
                email: validasi.email
            })
            .then(data => {
                ID = data._id
                console.log(ID);

                return Model.findOneAndUpdate({
                    _id: req.body.questionId
                }, {
                    $pullAll: {
                        upVote: [ID]
                    }
                }, {
                    new: true
                })

            })
            .then(data => {
                return Model.findOne({
                    _id: req.body.questionId
                })

            })
            .then(data => {
                // res.status(200).json(data)
                // console.log(data);
                for (var i = 0; i < data.downVote.length; i++) {
                    // console.log((data.downVote[i]._id), '===');
                    // console.log(ID);

                    // console.log();

                    if (String(ID) == String(data.downVote[i]._id)) {
                        // console.log(ID, 'ini ID NYA');
                        // console.log(data.downVote[i]);
                        // console.log('-------------------------------');

                        trueVote = true
                    }
                }
                // console.log(trueVote);
                if (trueVote == true) {
                    throw new Error("BROKEN")
                } else {
                    return Model.findOneAndUpdate({
                        _id: req.body.questionId
                    }, {
                        $push: {
                            downVote: [ID]
                        }
                    }, {
                        new: true
                    })

                }
            })
            .then(data => {
                res.status(200).json(data)
            })

            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })




    }


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
        var validasi = jwt.verify(req.headers.token)
        // console.log('oooooooooooooooo');
        // console.log(req.headers.token);
        console.log(validasi);

        User.findOne({
                email: validasi.email
            })
            .then(data => {
                // console.log(data);

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