// EXAMPLES FOR GETTING KNOWN TO TESTING OF THE DATA BY USE OF JEST 
// BEFORE USING NEED TO RENAME -> math.test.js
// const {TIPCALCULATOR, fahrenheitToCelsius, celsiusToFahrenheit,add } = require('../src/math')
// //
// test('TOTAL AND TIP', ()=>{
//     const Total = TIPCALCULATOR(20)
//     expect(Total).toBe(26)// a jest documentation instead the use of {IF conditions}
// })
// //
// test('TESTING 2', ()=>{
//     const Total = TIPCALCULATOR(10)
//     expect(Total).toBe(13)
// })
// //
// test('TEMP 1',()=>{
//     const temp1 = fahrenheitToCelsius(32)
//     expect(temp1).toBe(0)
// })
// //
// test('TEMP 2',()=>{
//     const temp2 = celsiusToFahrenheit(0)
//     expect(temp2).toBe(32)
// })
// //
// test('DEMO ASYNC',(done)=>{
//     setTimeout(()=>{//still let the jest to run the code for true even its false as jest didnt wait for 2sec's to pass and consider it as success
//         expect(1).toBe(1)
//         done()//providing a callback to async function to be called by jest 
//     }, 2000)
// })
// //
// test('TEST 2 Async',(done)=>{
//     add(2,3).then((sum)=>{
//         expect(sum).toBe(5)
//         done()
//     })
// })
// //
// test('ASYNC/AWAIT CASE',async ()=>{
//     const sum = await add(10,20)
//     expect(sum).toBe(30)
// })




// test('TESTING', ()=>{//testing the 
    
// })
// test('ERROR',()=>{//when theres an error testing fails and shows the error
//     throw new Error('FAIL')
// })
// WHY TEST NEEDED OR USED

// 1. SAVES TIME
// 2. Creates reliable software
// 3. Flexibility to Developers
//    {
//     1. Refactoring
//     2. Collaborating
//     3. Profiling
//    }
// 4. Peace of Mind
