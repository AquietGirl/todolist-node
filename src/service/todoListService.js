const mongoose = require('mongoose');
const TodoItem = require('../db/index');

class TodoListService {
    save(obj) {
        const item = {
            ...obj,
            status: 'Unfinish',
            createTime: Date.now()
        };
        // const data = new TodoItem(item);
        // return data.save()
        return TodoItem.create(item);
    };

    async findAll() {
        const todoList = await TodoItem.find();
        if (todoList) {
            return todoList.map(todo => ({
                id: todo._id,
                content: todo.content,
                status: todo.status,
                tag: todo.tag,
                isFinished: todo.status === "Finished" ? true : false
            }))
        }
        return null;
    };

    async findAllByFinished() {
        const todoList = await TodoItem.find({"status": "Finished"});
        if (todoList) {
            return todoList.map(todo => ({
                id: todo._id,
                content: todo.content,
                status: todo.status,
                tag: todo.tag,
                isFinished: todo.status === "Finished" ? true : false
            }))
        }
        return null;
    };

    async delete(id) {
        return await TodoItem.remove({ "_id" : mongoose.Types.ObjectId(id) })
    };

    async update(id) {
        const result = await TodoItem.findById({ "_id" : mongoose.Types.ObjectId(id) });
        return await TodoItem.findByIdAndUpdate({"_id": mongoose.Types.ObjectId(id)}, {"status": result.status === 'Finished' ? 'Unfinish' : 'Finished'});
    }
}

module.exports = new TodoListService();