const express = require('express');
const loggerMiddleware = require('./middleware/logger');
const todoReaderMiddleware = require('./middleware/todoReader');
const todos = require('./routes/todos');

const app = express();

const port = process.argv[2] || 3000;

app.use(express.json());
app.use(loggerMiddleware);
app.use(todoReaderMiddleware);

app.use('/todos', todos);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});