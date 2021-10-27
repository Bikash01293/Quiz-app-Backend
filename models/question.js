const mongoose = require('mongoose')
// const optionSchema = require('./options');
const questionSchema = mongoose.Schema({
    quizid: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    questionText:{
        type: String, 
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options:{
        type  :Array,
        default:[]
    }
    // answerOptions:{ 
    //     type: [ mongoose.Schema.Types.ObjectId ],
    //     ref: 'option',
    //     default: []
    // } 
})
module.exports = mongoose.model('question',questionSchema)

