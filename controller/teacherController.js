const Quiz = require('../models/quiz')
const User = require('../models/user')
const Question = require('../models/question')
const jwt = require('jsonwebtoken')

exports.createQuiz = (req, res) => {
    whoid = req.userId;
    whoemail = req.email
    Quizname = req.body.quizname
    const quiz = new Quiz({
        quizname: req.body.quizname,
        quizdescription: req.body.description,
        owner: whoid,
        owneremail: whoemail
    });
    quiz.save((error, qz) => {
        if (error) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {

            res.status(201).json({ message: Quizname +" "+"quiz was added successfully!" })
        }
    })
}

exports.getUploadquiz = (req, res) => {
    const ch1 = req.userId
    console.log('here: ', ch1)
    Quiz.find({ owner: req.userId, upload: true }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ quiz: qz });
        }
    })
}

exports.seeStudent = (req, res) => {
    User.find({ role: "student" }, (err, stdnts) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ students: stdnts });
        }
    })
}

exports.blockStudent = (req, res) => {
    const id = req.params.id
    User.updateOne({ _id: id }, { blocked: true }, function (err, user) {
        if (err) {
            console.log(err)
            res.status(500).json({ msg: "something went wrong!!" })
        }
        else {
            console.log("blocked user");
            res.status(201).json({ message: "blocked user!" });
        }
    })

}
exports.unblockStudent = (req, res) => {
    const id = req.params.id
    User.updateOne({ _id: id }, { blocked: false }, function (err, user) {
        if (err) {
            console.log(err)
            res.status(500).json({ msg: "something went wrong!!" })
        }
        else {
            console.log("unblocked user");
            res.status(201).json({ message: "unblocked user!" });
        }
    })
}
exports.addQuestion = (req, res) => {

    Question.find({ quizid: req.body.quizid }, (err, q) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            const question = new Question({
                quizid: req.body.quizid,
                questionId: q.length + 1,
                questionText: req.body.questionText,
                answer: req.body.answer,
                options: req.body.options
            });

            console.log(question.questionId)

            question.save((error, qsn) => {
                if (error) {
                    console.log(error);
                    res.json({ msg: "some error!" });
                }
                else {
                    res.status(201).json({ message: "yes question added!!" })
                }
            })
        }
    })
}

exports.uploadQuiz = (req, res) => {
    console.log("upload back");
    console.log(req.body);
    Question.find({ quizid: req.body.id }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            console.log(qz.length);
            if (qz.length < 5) {
                res.json({ msg: "You must have 5 question in the quiz for upload quiz!!" });
            }
            else {
                Quiz.updateOne({ _id: req.body.id }, { upload: true }, function (err, user) {
                    if (err) {
                        console.log(err)
                        res.json({ msg: "something went wrong!!" })
                    }
                    else {
                        const io = req.app.get('io');
                        io.emit("quizcrud", "Quiz Curd done here");
                        res.json({ message: "quiz uploaded!" });
                    }
                })

            }

        }
    })

}

exports.deleteQuiz = (req, res) => {
    const id = req.params.id
    console.log(req.params.id);
    Quiz.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: "Somthing went wrong!!" });
            console.log("err in delete by admin");
        }
    })
    Question.deleteMany({ quizid: id }, (err) => {
        if (err) {
            res.json({ msg: "Somthing went wrong!!" });
            console.log("err in delete by admin");
        }
    })
    const io = req.app.get('io');
    io.emit("quizcrud", "Quiz Curd done here");
    res.status(200).json({ msg: "Quiz was succesfully Deleted by teacher !" })
    

}


exports.getHomequiz = (req, res) => {
    // console.log(req.userId)
    Quiz.find({ owner: req.userId }, (err, qzs) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ quizzes: qzs });
        }
    })
}

exports.getAllQuestion = (req, res) => {
    // const url = `http://localhost:4200/teacher/seequestion`
    Question.find({ quizid: req.params.id }, (err, qtns) => {
        if (err) {
            console.log(error);
            res.json({ errormsg: "some error!" });
        }
        else {
            res.json({ questions: qtns });
        }
    })
    // res.redirect(
    //     `${url}`)
}


exports.deleteQuestion = (req, res) => {
    const id = req.params.id
    Question.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: "Somthing went wrong!!" });
            console.log("err in delete  question by admin");
        }
    })
    res.json({ msg: "Question was succesfully Deleted teacher !" })
}

