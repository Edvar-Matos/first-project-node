const express = require('express') // coloco dentro dos parênteses o nome exato da minha biblioteca que vou utilizar.
const uuid = require('uuid')

const port = 3000 // Essa variável posso trocar a porta sempre que quiser em precisar criar nova variável.

const app = express() // sempre que quiser usar o express sempre, crio uma variável usando o app ou server.
app.use(express.json()) // sempre tenho que colocar o caminho que vou usar aqui em cima, antes das rotas.

/*
    - Query params => meusite.com/users?nome=edvar&age=28  // FILTROS
    - Route params => /users/2     // BUSCAR, DELETAR OU ATUALÇIZAR ALGO ESPECÍFICO
    - Request Body => { "name":"Edvar", "age":43}

    - GET          => Buscar informações no back-end
    - POST         => Criar informação no back-end
    - PUT / PATHCH => Alterar/Atualizar informação no back-end
    - DELETE       => Deletar informação no back-end

    - MIDDLEWARES  => INTERCEPTADOR => Tem o poder de parar ou alterar todos da requisição
*/



const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

     const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
    
}) // Essa é a minha rota.

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id:uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

   

    users[index] = updateUser

    return response.json(updateUser)
    
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json()
    
})















app.listen(port, () =>{
    console.log(`😃 Server started on port ${port} 😉`)
}) // esse é o número da porta do conputador. Para ver no navegador digito localhost:3000/users.