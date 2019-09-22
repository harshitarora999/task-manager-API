const express = require('express')
require('./db/mongoose2')
const TaskRouter = require('./routers/Tasks')// import from router file
const UserRouter = require('./routers/Users')
//
const app = express()
//
app.use(express.json())
app.use(UserRouter)// Using router data
app.use(TaskRouter)
//
module.exports = app//data of this file being imported to index file 