const express = require("express");
const fs = require("fs");
const app = express();

app.get('/', (request, response) => {
    return response.send('Hello world');
})

app.get('/todos/:id', (request, response) => {
    const id = parseInt(request.params.id);

    fs.readFile('./storage/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send(err);
        }

        let todos = JSON.parse(data);
        let todoObj = todos.find(obj=>obj.id === id);

        if(todoObj) {
            return response.send(todoObj);
        }

        return response.status(404).send('Todo not found')
    })
})

app.get('/todos/:id/complete', (request, response) => {
    const id = parseInt(request.params.id);

    fs.readFile('./storage/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send(err);
        }

        let todos = JSON.parse(data);
        let todoId = todos.findIndex(obj=>obj.id === id);

        todos[todoId].done = true;

        fs.writeFile('./storage/todos.json', JSON.stringify(todos), () => {
            return response.send('ok');
        })
    })
})

app.listen(3000, () => {
    console.log('App running on :3000 port')
})