const data = {
 name:'Roshan',
 address:{
    flatno:'123',
    building:'10',
 },
 age:24
}

const data1 = {
    ...data
}

data1.name = 'roshan'
data1.address.flatno = '321'

console.log(data)
console.log(data1)
