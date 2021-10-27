const mongoose = require('mongoose')
const optionSchema = mongoose.Schema(
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

