const mongoose = require('mongoose')//mongoose npm
const validator = require('validator')//validator npm
const bcrypt = require('bcryptjs')//bcrypt npm
const jwt = require('jsonwebtoken')//jsonwebtoken npm
const Task = require('./tasks')//importing tasks
//
const userSchema = new mongoose.Schema({//for user data required when user created
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        unique: true,
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate(value){//validator for varifing the input is email or not
            if (!validator.isEmail(value)) {//condition
                throw new Error('Email unvalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if (value.toLowerCase().includes('password')) {
                throw new Error('password not contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {//age validator
            if (value < 0) {
                throw new Error('Age must be +ve')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }
}, {//for getting time when user created
    timestamps: true
})
//?
userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})
//
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString() },process.env.JWT_token)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token 
}
//
userSchema.methods.toJSON = function () {//to make to see only the data which a user wants to show
    const user = this
    const userObject = user.toObject()
    delete userObject.password//not showing password on user profile read call
    delete userObject.tokens//not showing token on user profile read call
    delete userObject.avatar//not showing avatar image on user profile read call
    return userObject
}
//
userSchema.statics.findByCredentials = async (email,password) => {//created self finding method to match the email and password
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}
//for hash password over plain text pass word
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
//for deleting user data after user account is deleted
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})
//
const User = mongoose.model('User', userSchema)
//
module.exports = User