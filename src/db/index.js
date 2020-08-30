const mongoose = require('mongoose');

const todolist =mongoose.Schema({
    content: String,
    status: String,
    tag: String,
    createTime: Date
});

const TodoItem = mongoose.model("TodoItem", todolist);

module.exports = TodoItem;
