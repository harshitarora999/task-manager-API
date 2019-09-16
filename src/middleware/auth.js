const jwt = require('jsonwebtoken')
const User = require('../models/user')
//
const auth = async (req,res,next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,process.env.JWT_token)
        const user = await User.findOne({_id:decoded._id, 'tokens.token': token})
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user 
        next()
    } catch(e){
        res.status(401).send({error: 'Please Authenticate.'})
    }
}
//
module.exports = auth
//without middleware = new request -> run router handler
//with middleware = new request -> do something -> run route handler
//using middle ware
// app.use((req,res,next)=>{//middleware method as to create to make certain requests and for authentications
//     if (req.method === 'GET') {
//         res.send('NO DATA TO SHOW')
//     }else {
//         next()
//     }
    
//     //console.log(req.method, req.path)
//     //next()
// })
// app.use((req,res,next)=>{
//     res.status(504).send('NO DATA TO SHOW')
// })