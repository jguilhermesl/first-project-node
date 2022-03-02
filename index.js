const express = require("express");
const uuid = require("uuid");
const port = 3000;
const app = express();

app.use(express.json());


const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex( user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found"})
    }

    request.userIndex = index 

    next()
}

app.get('/users', (request, response) => {
    
    
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age, vip } = request.body

    const user = { id: uuid.v4(), name, age, vip}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { id } = request.params
    const {name, age, vip} = request.body
    const index = request.userIndex

    const updatedUser = { id, name, age, vip}

    users[index] = updatedUser

    console.log(request.query)

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const { id } = request.params
    const index = request.userIndex

    users.splice(index,1)
    
    return response.status(204).json(users)
})

app.patch('/users/:id', checkUserId, (request, response) => {
    const { id } = request.params
    const { name, age } = request.body
    const index = request.userIndex

    const updatedUser = { id, name, age, vip: true}

    users[index] = updatedUser

    return response.json(updatedUser)
})



app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})
  