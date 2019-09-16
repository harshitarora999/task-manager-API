// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')//destructured above command

const connectionURL = 'mongodb://127.0.0.1:27017' //localhost ip=127.0.0.1
const databaseName = 'TASK-MANAGER'

// const id = new ObjectID() //to provide object id's 
// console.log(id.id.length) //binary representation of id
// console.log(id.getTimestamp()) //to provide the time when id created
// console.log(id.toHexString().length) //string representation of id

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) => { //to make the connection with robot 3T 
    if (error) {
        return console.log('ERROR!ERROR!')        
    }
    
    const db = client.db(databaseName)//inserting in of data to database

    // db.collection('users').insertOne({//for inserting single user or for task
    //     //_id: id, //to provide object id's 
    //     name: 'koih',
    //     age: 2
    // }, (error,result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })
    // db.collection('users').insertMany([//for inserting many users
    //     {
    //         name: 'hiy',
    //         age: 20
    //     }, {
    //         name: 'lojh',
    //         age: 19
    //     }, () => {
            
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('NOT WORKING')
    //     }            

    //     console.log(result.ops)
    // })
    // db.collection('tasks').insertMany([//for inserting many tasks
    //     {
    //         description: 'data',
    //         completed: true
    //     }, {
    //         description: 'toto',
    //         completed: false
    //     }, {
    //         description: 'pom',
    //         completed: true
    //     }
    // ], (error,result) => {
    //     if (error) {
    //         return console.log('not working')
    //     }
    //     console.log(result.ops)
    // })
})

