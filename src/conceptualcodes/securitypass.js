
const bcrypt = require('bcryptjs')//bcrypt install on command

const myFunction = async () => {
    const password = 'NAME'//password(plain text)
    const hashpass = await bcrypt.hash(password, 8)//for hashing password
    console.log(password)
    console.log(hashpass)
    const isMatch = await bcrypt.compare('NAME', hashpass)//for decryption from hashed password to plain
    console.log(isMatch)
}

myFunction()