 question = require('../models/question'),
     mail = require('./mailer')

 var corn = require('corn');
 var kue = require('kue'),
     queue = kue.createQueue();
 module.exports = () => {
     cron.schedule('00 08 * * 7', () => {
         question
             .find()
             .populate('userId')
             .then(function (allQuestion) {
                 allQuestion.forEach(e => {
                     let text = `Hello, ${e.userId.email}!<br>
                Your question for "${e.title}" has commented for ${e.answerId.length} time(s).<br>
                Also your question been upvoted for ${e.upVote.length} time(s) and downvoted for ${e.downVote.length} time(s).<br>
                Thank you!`
                     let email = e.userId.email
                     queue.create('email', {
                         email,
                         text
                     }).save()
                 });
             })
             .catch(function (err) {
                 console.log(err)
             })
         queue.process('email', function (job, done) {
             mail(job.data.email, job.data.text)
             done()
         })
     })
 }