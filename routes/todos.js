const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const TODOS_FILE_PATH = './storage/todos.json';

// GET-запрос для получения всех todos
router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(TODOS_FILE_PATH, 'utf8');
        const todos = JSON.parse(data);
        res.json(todos);
    } catch (err) {
        console.error('Failed to read todos from storage:', err);
        res.status(500).json({ error: 'Failed to read todos from storage' });
    }
});

// GET-запрос для получения todo по id
router.get('/:id', (req, res) => {
    const todoId = req.params.id;
    const todo = req.todos.find(todo => todo.id === todoId);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// POST-запрос для создания нового todo
router.post('/', (req, res) => {
    const newTodo = req.body;
    req.todos.push(newTodo);
    fs.writeFile(TODOS_FILE_PATH, JSON.stringify(req.todos), 'utf8')
        .then(() => {
            res.json(newTodo);
        })
        .catch(err => {
            console.error('Failed to write todos to storage:', err);
            res.status(500).json({ error: 'Failed to write todos to storage' });
        });
});

// PUT-запрос для обновления статуса todo
router.put('/:id', (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = req.body;
    const todoIndex = req.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
        req.todos[todoIndex].done = updatedTodo.done;
        fs.writeFile(TODOS_FILE_PATH, JSON.stringify(req.todos), 'utf8')
            .then(() => {
                res.json(req.todos[todoIndex]);
            })
            .catch(err => {
                console.error('Failed to write todos to storage:', err);
                res.status(500).json({ error: 'Failed to write todos to storage' });
            });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// DELETE-запрос для удаления todo
router.delete('/:id', (req, res) => {
    const todoId = req.params.id;
    const todoIndex = req.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
        req.todos.splice(todoIndex, 1);
        fs.writeFile(TODOS_FILE_PATH, JSON.stringify(req.todos), 'utf8')
            .then(() => {
                res.json({ message: 'Todo deleted successfully' });
            })
            .catch(err => {
                console.error('Failed to write todos to storage:', err);
                res.status(500).json({ error: 'Failed to write todos to storage' });
            });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

module.exports = router;