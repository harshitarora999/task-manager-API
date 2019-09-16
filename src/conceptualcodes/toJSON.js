const pet = {
    name: 'CHARM'
}
pet.toJSON = function (){
    return {}
}
console.log(JSON.stringify(pet))
//toJSON provide to read the data after being stringfy by json and to even the empty required passed data
//as we required for the password and tokens array