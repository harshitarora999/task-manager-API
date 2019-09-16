// CRUD create read update delete
// $set,$inc and other $"commands" these are update operators

const { MongoClient, ObjectID } = require('mongodb')//destructured above command

const connectionURL = 'mongodb://127.0.0.1:27017' //localhost ip=127.0.0.1
const databaseName = 'TASK-MANAGER'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) => { //to make the connection with robot 3T 
    if (error) {
        return console.log('ERROR!ERROR!')//if connection is not running        
    }
    
    const db = client.db(databaseName)

    // db.collection('users').findOne({_id: new ObjectID("5d67cc0eb6a54b1fa4d002c7") }, (error,user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({age: '2'}).toArray((error,user) => {//toArray is there as because find use the courser so to provide data in form of array from find 
    //     if (error) {
    //         return console.log('unable to find')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({age: '2'}).count((error,count) => {
    //     if (error) {
    //         return console.log('unable to find')
    //     }
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({_id: new ObjectID("5d67cc7b8da7ed1d9c0bfa19")},(error,task) =>{
    //     if (error) {
    //         return console.log('Unable to find')            
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: true}).toArray((error,task) => {
    //     if (error) {
    //         return console.log('Unable to find')            
    //     }
    //     console.log(task)
    // })

    // const updatePromise = db.collection('users').updateOne({//to update a already existing value
    // db.collection('users').updateOne({
    //     _id: new ObjectID ("5d67cc0eb6a54b1fa4d002c7")
    // },{
    //     $inc: {//to increase or decrease any numerical value
    //         age:-23
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    //     _id: new ObjectID("5d67cc0eb6a54b1fa4d002c7")
    // },{
    //     $set: {//to make change in the current value in collection
    //         name: 'KAREEE',
    //         age: 45
    //     }
    // }).then((result)=>{//using promise method of options
    //         console.log(result)
    //     }).catch((error)=>{//using promise method of options
    //         console.log(error)
    //     })
    // updatePromise.then((result)=>{//using promise method of options
    //     console.log(result)
    // }).catch((error)=>{//using promise method of options
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({//to update multiple values
    //     completed: false//the condition for selecting value
    // },{
    //     $set:{
    //         completed: true//update to do
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)//modifiedCount=to get the numerical value for how much changes made
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({//to delete the data from collections
    //     age: '2'
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    
    // db.collection('tasks').deleteOne({// to delete one value
    //     description: 'data'
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
}) 
