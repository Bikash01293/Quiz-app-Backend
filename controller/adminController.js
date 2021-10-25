var Quiz = require('../models/quiz')
var mongoose = require('mongoose')
var User = require('../models/user')
var Question = require('../models/question')
const jwt = require('jsonwebtoken')
exports.seeStudent = (req, res) => {
    User.find({ role: "student" }, (err, users) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ students: users });
        }
    })
}
exports.seeTeacher = (req, res) => {
    User.find({ role: "teacher" }, (err, stdnts) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ teachers: stdnts });
        }
    })
}


exports.getallquiz = (req, res) => {
    Quiz.find({owner: req.userId}, (err, qzs) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ quizzes: qzs });
        }
    })
}
exports.block = (req, res) => {
    var id = req.params.id
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
exports.unblock = (req, res) => {
    var id = req.params.id
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

exports.getAllQuestion = (req, res) => {

    Question.find({ quizid: req.params.id }, (err, qtns) => {
        if (err) {
            console.log(error);
            res.json({ errormsg: "some error!" });
        }
        else {
            res.json({ questions: qtns });
        }
    })
}
exports.deleteQuestion = (req, res) => {
    var id = req.params.id
    Question.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: "Somthing went wrong!!" });
            console.log("err in delete  question by admin");
        }
    })
    res.json({ msg: "Question was succesfully deleted by admin !" })
}
exports.deleteQuiz = async (req, res) => {
    var id = req.params.id
    // console.log(req.params.id);
    // await Quiz.findById(mongoose.Types.ObjectId(id), function (err, docs) {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Result : ", docs);
    //     }
    // }).exec()
    // Quiz.findById({ _id: mongoose.Types.ObjectId(id) })        
    //     .lean().exec(function (err, results) {
    //     if (err) return console.error(err)
    //     try {
    //         console.log(results)            
    //     } catch (error) {
    //         console.log("errror getting results")
    //         console.log(error)
    //     } 
    // })
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

    res.status(200).json({ msg: "Quiz was succesfully deleted by admin !" })
}
