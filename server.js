const express = require('express');
 function getId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};
//define a state for our data (database)
let idIndex = 100
const users = [{
    id:"_l7otr0fg5",
    name: 'Abbe',
    isStudent: true
}]
const app = express()

// make sure body is parsed as Json
app.use(express.json())

app.use(express.static('./client'))

//make sure client folder is accessable 
app.use(express.static('./client'))


//Defined all Todo resource Endpoints
app.get('/users', (req, res)=> res.json(users))

app.get('/users/:id', (req, res)=> res.json('One user, id: '+ req.params.id))

app.post('/users', (req, res)=> {
    if(!req.body.name ) {
        res.status(400).json({message: 'Data sent as body is not correct'})
    }else{

    const todo = { id: getId(), ...req.body }
    todo.id=getId()
    users.push(todo);
    res.status(201).json(todo)
    idIndex++;
    }
})

app.put("/users/:id" , (req , res) => {
    const paramId = req.params.id 
    let foundUserIndex = users.findIndex((user) => user.id == paramId)
    
    if (foundUserIndex == -1){
    res.status(404).json({status: "User to update not found...."})
    }
    
    users[foundUserIndex] = req.body
    res.json({status: " User updated"})
   })


// app.delete("/users/:id", [checkIfUserExists], (req,res) => {
//     users.splice(req.foundUserIndex, 1)
//     res.json({status: "User deleted"})
// })

function checkIfUserExists (req, res, next){
    const paramId = req.params.id

    let foundUserIndex = users.findIndex((user) =>user.id == paramId)
    

    if(foundUserIndex == -1){
        res.status(404).json({status: "User not found..."})
    }else {
        req.foundUserIndex = foundUserIndex
        next()
    }

}



//404  middleware
app.use((req, res)=>{
    res.status(404).json(
        
        {
             message: 'Could not find the resource you are looking for..'
        })
})

//start th server
app.listen(3000, () => console.log('Server is up'))