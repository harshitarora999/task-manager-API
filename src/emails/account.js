const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.APIKEY)

const welcomeEmail = (email,name) =>{
    sgMail.send({
        to: email,
        from: 'aroraharshit9999@gmail.com',
        subject: 'TESTING 2',
        text: `CODE RUNNING. YESS!!!! ${name}`
    })
}
const ByeMail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'aroraharshit9999@gmail.com',
        subject: 'GOODBYE',
        text: `BYE BYE BYE!!!!!.${name}`
    })
}
module.exports = {
    welcomeEmail,
    ByeMail
}



// sgMail.send({
//     to: 'aroraharshit9999@gmail.com',
//     from: 'aroraharshit9999@gmail.com',
//     subject: 'TESTING',
//     text: 'CODE IS RUNNING'
// })