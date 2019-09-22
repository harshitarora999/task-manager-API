const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')//multer npm
const sharp = require('sharp')//npm sharp
const {welcomeEmail} = require('../emails/account')//sending emails to users
const {ByeMail} = require('../emails/account')//sending emails to users
const router = new express.Router()// using router express tool
//
router.get('/users/me', auth, async (req,res)=>{//to get data .get TO GET CURRENT LOGGED IN USER
    res.send(req.user)
//for finding data of multiple users
    // try{ 
    //     const users = await User.find({})
    //     res.send(users)
    // } catch(e){
    //     res.status(500).send(e)
    // }
    // express handlers
    // User.find({}).then((users)=>{
    //     res.status(202).send(users)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})
// TO GET USER BY ID 
// router.get('/users/:id',async (req,res)=>{
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.status(201).send(user)
//     } catch(e){
//         res.status(400).send(e)
//     }
//     // express handlers
//     // User.findById(_id).then((user)=>{
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }
//     //     res.status(202).send(user)
//     // }).catch((error)=>{
//     //     res.status(500).send(error)
//     // })
// })
//
router.post('/users/logout',auth,async(req,res)=>{//to logout user from current profile
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{//filtering a single token and logging out
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})
//
router.post('/users/logoutAll',auth,async(req,res)=>{//logging out from all tokens
    try{
        req.user.tokens = []//making tokens array empty
        await req.user.save()
        res.status(200).send()
    } catch(e){
        res.status(500).send(e)
    }
})
//
router.post('/users', async (req,res)=>{//to add data .post
    const  user = new User(req.body)//providing body data
    try{
        await user.save()
        welcomeEmail(req.user.email, req.user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(401).send(e)
    }
//     express handlers
//     user.save().then(()=>{
//     res.status(201).send(user)
//     }).catch((error)=>{
//     res.status(400).send(error)
//     })
})
//
router.patch('/users/me',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]//to allowed selected updates
    const isValid = updates.every((update)=> allowedUpdates.includes(update))//for invalid update operation
    if (!isValid) {
        return res.status(404).send({error: 'Invalid Operations'})
    }
    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).send(req.user)
    } catch(e){
        res.status(401).send(e)
    }
})
//
router.delete('/users/me',auth, async (req,res)=>{
    try{
        await req.user.remove()
        ByeMail(req.user.email, req.user.name)
        res.send(req.user)
    } catch(e){
        res.status(500).send(e)
    }
})
//
router.post('/users/login',async (req,res) =>{//finding up or login for user by use of email and password
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()//creating jsonwebtoken
        res.send({user, token})//sending in both users and token values
    }catch(e){
        res.status(400).send(e)
    }
})
//to add files like upload images
const avatar = multer({
    limits:{
        fileSize: 10000000
    },
    fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('only image files'))
        }
        cb(undefined,true)
    }
//
})
//uploading up of the image and even making up some modifications on image
router.post('/users/me/avatar',auth,avatar.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).png().resize({width: 250, height: 250}).toBuffer()//providing the modification to image for saving it
    req.user.avatar = buffer//to provide a path for saving file or image
    await req.user.save()
    res.status(200).send()
},(error,req,res,next)=>{//error function with arguments
    res.status(400).send({error: error.message})//for showing error message as json response not as html 
})
//
router.delete('/users/me/avatar',auth, async (req,res)=>{//deleting avatar picture
    req.user.avatar = undefined//setting avatar to null file as not save any file or image(so delete already one saved)
    await req.user.save()
    res.send()
})
//for getting the image of user in brower by using the URL=localhost:3000/users/"id of user"/avatar
router.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)//finding the user by id
        if (!user || !user.avatar) {//setting if user or the avatar didnt found
            throw new Error('NO AVATAR IMAGE FOUND')//error if not found
        }
        res.set('Content-Type','image/png')//type of content to show on browser
        res.send(user.avatar)//sending avatar
    } catch(e){
        res.status(404).send()
    }
})
module.exports = router