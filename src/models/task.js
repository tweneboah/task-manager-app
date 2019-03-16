const mongoose = require('mongoose')

//TASK MODEL
const Task = mongoose.model('task', {
    description: {
        type: String,
        trim: true,
        required:true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task;