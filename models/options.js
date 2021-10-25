var mongoose = require('mongoose')
var optionSchema = mongoose.Schema(
        { 
            answerText: String ,
            isCorrect: Boolean 
        },
        { 
            answerText: String ,
            isCorrect: Boolean 
        },
        {
            answerText: String ,
            isCorrect: Boolean 
        },
        { 
            answerText: String ,
            isCorrect: Boolean 
        }
)
module.exports = mongoose.model('option',optionSchema)

