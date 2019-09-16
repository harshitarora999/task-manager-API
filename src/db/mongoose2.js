const mongoose = require('mongoose')//mongoose npm
mongoose.connect(process.env.MongoDB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})