const fs = require('fs');

const todoReaderMiddleware = (req, res, next) => {
    // Чтение todos из JSON файла
    fs.readFile('./storage/todos.json', 'utf8', (err, data) => {
        if (err) {
            // Обработка ошибки чтения файла
            console.error(`Failed to read todos: ${err.message}`);
            return res.status(500).json({ error: 'Failed to read todos' });
        }

        try {
            const todos = JSON.parse(data);
            // Добавление todos в объект запроса
            req.todos = todos;
            // Переход к следующему middleware или обработчику маршрута
            next();
        } catch (err) {
            // Обработка ошибки парсинга JSON
            console.error(`Failed to parse todos: ${err.message}`);
            return res.status(500).json({ error: 'Failed to parse todos' });
        }
    });
};

module.exports = todoReaderMiddleware;
