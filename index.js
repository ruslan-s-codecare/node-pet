const express = require('express');
const loggerMiddleware = require('./middleware/logger');
const todoReaderMiddleware = require('./middleware/todoReader');
const todos = require('./routes/todos');

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(todoReaderMiddleware);

app.use('/todos', todos);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});