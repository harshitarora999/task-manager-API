// introduction to JSONWEBTOKENS 
const jwt = require('jsonwebtoken')
//
const myfunction = async () => {
    const token = jwt.sign({_id: 'abcd123'}, 'MUMBAI', {expiresIn: '1 hour'})//arguments provided by the jwt
    console.log(token)
    //
    const data = jwt.verify(token,'MUMBAI')//vrifing the token
    console.log(data)


}
myfunction()