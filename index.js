const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const TODOS_FILE_PATH = path.join(__dirname, 'storage', 'todos.json');

// Read todos from the JSON file
let todos = [];
fs.readFile(TODOS_FILE_PATH, 'utf8', (err, data) => {
    if (!err) {
        try {
            todos = JSON.parse(data);
        } catch (err) {
            console.error('Failed to parse todos from storage:', err);
        }
    } else if (err.code === 'ENOENT') {
        console.error('Todos storage file not found. Creating a new one...');
        fs.writeFile(TODOS_FILE_PATH, '[]', 'utf8', err => {
            if (err) {
                console.error('Failed to create todos storage file:', err);
            }
        });
    } else {
        console.error('Failed to read todos storage file:', err);
    }
});

// Write todos to the JSON file
function writeTodosToFile() {
    fs.writeFile(TODOS_FILE_PATH, JSON.stringify(todos), 'utf8', err => {
        if (err) {
            console.error('Failed to write todos to storage:', err);
        }
    });
}

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Create a new todo
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const id = todos.length + 1;
    const newTodo = { id, title, description };
    todos.push(newTodo);
    writeTodosToFile();
    res.json(newTodo);
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        writeTodosToFile();
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        writeTodosToFile();
        res.json({ message: 'Todo deleted' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Update the "done" status of a todo by ID
app.post('/todos/:id/done', (req, res) => {
    const id = parseInt(req.params.id);
    const { done } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex].done = done;
        writeTodosToFile();
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});