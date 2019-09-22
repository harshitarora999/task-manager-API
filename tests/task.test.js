const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/tasks')
const { //importing this data from db file
    user1,
    user1id,
    user2,
    user2id,
    task1,
    task2,
    task3,
    setupData,
    } = require('./fixtures/db')
//
beforeEach(setupData)
//
test('TASK CREATION',async()=>{
    const response = await request(app)
        .post('/tasks')
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .send({
            description: 'DATA 1',
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})
//
test('ALL TASK OF THE USER',async()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(202)
    expect(response.body.length).toEqual(2)
})
//
test('NOT DELETE OTHER USER TASK',async()=>{
    const response = await request(app)
        .delete(`/task/${task1._id}`)
        .set('Authorization',`Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(task1._id)//making sure that task 1 is not deleted in user database
    expect(task).not.toBeNull()
})
//
 