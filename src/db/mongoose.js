const mongoose = require('mongoose')//mongoose npm
const validator = require('validator')//validator npm

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
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
    }
})

// const me = new User({//creating user 
//     name: ' KAKAK',
//     email: 'KAKAKAKAK@GMAIL.COM',
//     password:'workmanship'
// })

// me.save().then((me)=>{//to check for input
//     console.log(me)
// }).catch((error)=>{
//     console.log('ERROR!!',error)
// })
const task = mongoose.model(('task'),{//providing task 
    description:{
        type: String,
        trim: true,
        required: true

    },
    completed:{
        type: Boolean,
        default: false
    }
})
const work = new task({//creating task
    description: 'kko'
})

work.save().then((work)=>{//saving the input for task
    console.log(work)
}).catch((error)=>{
    console.log('ERROR!!!',error)
})