// ??????? NEED TO UNDERSTAND THIS AGAIN ???????
const request = require('supertest')
const { user1, user1id, setupData} = require('./fixtures/db')
const app = require('../src/app')
const User = require('../src/models/user')
//
beforeEach(setupData)//that every time as I test there should be not the same user gets created
//
test('Should Sign up a NEW USER',async ()=>{//Making sure that user sign in
    const response = await request(app).post('/users').send({
        name: 'RAM',
        email: 'RAM9@gmail.com',
        password: 'RAM1@2345'
    }).expect(201)//? showing 400 still the user is being created
    //
    //ASSERT that database was changed correctly
    const user = await User.findById(response.body.user._id)//Finding the user from database
    expect(user).not.toBeNull()//making sure that response is not empty
    //Assertions about response
    expect(response.body).toMatchObject({//making sure that the objects of the response matches to objects we provided
        user: {
            name: 'RAM',
            email: 'RAM9@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('RAM1@2345')
})
//
test('LOGIN FOR USER', async()=>{
    const response = await request(app).post('/users/login').send({  
        email: user1.email,
        password: user1.password
    }).expect(200)
    const user = await User.findById(user1id)
    expect(response.body.token).toBe(user.tokens[1].token)
})
//
test('USER DONT EXIST',async ()=>{
    await request(app).post('/users/login').send({
        email: user1.email,
        password: 'NOT MY PASS'
    }).expect(400)
})
//
test('GET PROFILE',async()=>{
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
})
//
test('PROFILE NOT EXISTS',async()=>{
    await request(app).get('/users/me').send().expect(401)//getting 404
})
//
test('DELETE ACCOUNT',async()=>{
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(user1id)
    expect(user).toBeNull()
})
//
test('CANT DELETE THE PROFILE',async()=>{
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})
//
test('AVATAR IMAGE',async ()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(user1id)
    expect(user.avatar).toEqual(expect.any(Buffer))//toEqual so as to make two objects equal
})
//
test('UPDATE VALID DATA ONLY',async ()=>{
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            name: 'MANAN'
        })
        .expect(200)
    const user = await User.findById(user1id)
    expect(user.name).toEqual(expect.any(String))
})
//
test('PROVIDE REQUIRED DATA ONLY',async()=>{
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            location: 'KARNAL'
        })
        .expect(400)//getting 404
})