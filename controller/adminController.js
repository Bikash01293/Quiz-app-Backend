
const mongoose = require('mongoose')
const User = require('../models/user')
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


exports.block = (req, res) => {
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


exports.unblock = (req, res) => {
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




