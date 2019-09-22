//PROVIDING THE DATABASE FOR TESTING FILES
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/tasks')
//
const user1id = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1id,
    name: 'MIKE',
    email: 'mikechig990@gmail.com',
    password: 'MIKEPASS@123',
    tokens: [{
        token: jwt.sign({_id: user1id},process.env.JWT_token)
    }]
}
//
const user2id = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2id,
    name: 'VIKRAM',
    email: 'VIKRAM@gmail.com',
    password: 'VIKPASS@123',
    tokens: [{
        token: jwt.sign({_id: user2id},process.env.JWT_token)
    }]
}
//
const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'FIRST TASK',
    completed: false,
    owner: user1._id
}
//
const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'SECOND TASK',
    completed: true,
    owner: user1._id
}
//
const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'THIRD TASK',
    completed: true,
    owner: user2._id
}
//
const setupData = async ()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}
//
module.exports = {
    user1,
    user1id,
    user2,
    user2id,
    task1,
    task2,
    task3,
    setupData
}