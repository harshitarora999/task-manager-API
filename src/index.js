const app = require('./app')//providing the app file to require all the below data(in comment lines)
//
// This data is imported from app file 
// const express = require('express')
// require('./db/mongoose2')
// const TaskRouter = require('./routers/Tasks')// import from router file
// const UserRouter = require('./routers/Users')
// const app = express()
// app.use(express.json())
// app.use(UserRouter)// Using router data
// app.use(TaskRouter)
//
const port = process.env.PORT// providing port to run
//
app.listen(port, ()=>{
    console.log('server is on port ' + port)
})
//




// EXAMPLE FOR MULTER
// multer use for uploads
// const multer = require('multer')
// //
// const upload  = multer({//?
//     dest: 'images',
//     limits: {
//         fileSize: 5000000//limiting the uploading size of file
//     },
//     fileFilter(req,file,cb){//filtering the file

//         if (!file.originalname.match(/\.(doc|docx)$/)) {//to make filter over the type of file to be get uploaded
//             return cb(new Error('ONLY document file'))
//         }
//         cb(undefined,true)        
//         // cb(new Error('PLEASE UPLOAD IMAGE'))
//         // cb(undefined, true)
//         // cb(undefined, false)

//     }
    
// })

// app.post('/upload',upload.single('upload'), (req,res)=>{//?
//     res.send()
// },(error,req,res,next)=>{//a function which provides a error message when there's an error in uploading data 
//     res.status(400).send({error: error.message})
// })


//TO find the data of user/task by id's
// const Task = require('./models/tasks')
// const User = require('./models/user')
// const main = async () => {
//     //const user = await User.findById('5d769d6067c7690170375e65')//to read task by owner id
//     //await user.populate('tasks').execPopulate()
//     //console.log('its working')
//     // const task = await Task.findById('5d76a1e9910f0d3c7c5e438a')//to read the owner by task id
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
// }
// main()