const express = require('express')
const Task = require('../models/tasks')
const auth = require('../middleware/auth')
const router = new express.Router()// using router express tool
//
router.post('/tasks',auth, async (req,res)=>{
    const task = new Task ({
        ...req.body,//
        owner: req.user._id//
    })
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }
    // express handlers
    // task.save().then(()=>{
    // res.status(201).send(task)
    // }).catch((error)=>{
    // res.status(400).send(error)
    // })
})
// url using to get the result -> GET /tasks?completed=false
// url for pagination -> GET /tasks?limit=10&skip=0
// url for sorting -> GET /tasks?sortBy=createdAt:asc(or desc)
router.get('/tasks',auth, async (req,res)=>{//to get a filtered data value as per request
    const match = {}//for filtering data
    const sort = {}//for sorting data
    if (req.query.completed) {//setting up the query for completed in task filteration
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]=== 'desc' ? -1 : 1 //?
    }
    try{
    //const task = await Task.find({owner: req.user._id})
    await req.user.populate({
        path: 'tasks',
        match,
        options: {
            limit: parseInt(req.query.limit),//for showing the limited data as per request
            skip: parseInt(req.query.skip),//for skipping multiple pages of the data
            sort //making data sorted as per request 
                //completed: 1
                //createdAt: -1//for sorting data in descending manner(-ve sign) & ascending(+ve sign)
        }
    }).execPopulate()//?
    res.status(202).send(req.user.tasks)
    } catch(e){
        res.status(500).send(e)
    }
    // express handlers
    // Task.find({}).then((tasks)=>{
    //     res.status(202).send(tasks)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})
//
router.get('/tasks/:id',auth, async (req,res)=>{//id is paramater for finding(canbe modified as per need)
    const _id = req.params.id//using that id parameter
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(404).send(e)
    }
    // express handlers
    // Task.findById(_id).then((task)=>{
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})
//
router.patch('/tasks/:id',auth, async (req,res)=>{// updation fot task
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValid = updates.every((update)=> allowedUpdates.includes(update))
    if (!isValid) {
        return res.status(401).send({error: 'operation invalid'})
    }
    try{
        const task = await Task.findOne({ _id: req.params.id, owner:req.user._id})//updating data of only the logged in user
        //const task = await Task.findById(req.params.id)
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(400).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})
//
router.delete('/tasks/:id',auth, async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})// async-await and deleting only the logged in user data
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e){
        res.status(500).send(e)
    }
})
//
module.exports = router