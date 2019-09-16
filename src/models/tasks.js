const mongoose = require('mongoose')//mongoose npm

const taskSchema = new mongoose.Schema({//for task data required when creating task
    description:{
        type: String,
        trim: true,
        required: true

    },
    completed:{
        type: Boolean,
        default: false
    },
    owner:{//providing task data to user for linking in with user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{// getting time of when task created
    timestamps: true
})
const Task = mongoose.model('Task', taskSchema)

module.exports = Task