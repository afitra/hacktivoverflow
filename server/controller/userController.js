const Model = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt')
const Post = require('../models/question')
const Answer = require('../models/answer')
class Controller {










    static register(req, res) {
        var obj = {
            email: req.body.email,
            password: req.body.password,
            image: "http://2.bp.blogspot.com/-EbFZWl3gsHE/VhZAYY6RqGI/AAAAAAAAAD0/M_wDNYOkdaQ/s1600/sinchan.jpg"
        }
        // console.log(obj);

        Model.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static all(req, res) {
        Model.find({})

            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static login(req, res) {
        // var validation = jwt.verify(req.headers.token)
        // console.log(req.body);

        if (req.body.email == undefined || req.body.password == undefined) {
            // console.log('ooooo');
            throw Error

        } else {
            Model.findOne({
                    email: req.body.email
                })
                .then(function (user) {
                    // console.log('masok login');

                    let validasi = bcrypt.compareSync(req.body.password, user.password);
                    if (validasi == false) {
                        res.status(400).json({
                            message: 'Wrong Email/Password'
                        })
                    } else {
                        let token = jwt.sign({
                            email: user.email
                        })
                        // console.log(token);
                        res.status(200).json({
                            token
                        })
                    }

                })
                .catch(function (err) {
                    res.status(500).json({
                        messege: err.message
                    })
                })
        }
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