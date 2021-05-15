const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
    tasks: {
        type: [],
    }


})

const TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = TaskList;

