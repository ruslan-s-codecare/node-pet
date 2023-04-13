# Todo API

A simple RESTful API for managing a list of tasks (todos) using Express and Node.js.

## Installation

To install, follow these steps:

1. Clone the repository:
   git clone https://github.com/your/repo.git
2. Install dependencies:`npm install`

## Usage

The API provides the following routes for working with tasks (todos):

- `GET /todos`: Get a list of all tasks
- `GET /todos/:id`: Get a task by ID
- `POST /todos`: Create a new task
- `PUT /todos/:id`: Update a task by ID
- `DELETE /todos/:id`: Delete a task by ID

You can use any HTTP client, such as `curl`, `httpie`, or `Postman`, or any other HTTP library in your preferred programming language to interact with the API.

## Running

To start the server, run the following command:

`node index.js`

By default, the server will listen on port 3000. You can change the port by specifying the port by passing variable, for example:

`node index.js 8080`

## Testing

The API uses `mocha` in conjunction with `chai` and `chai-http` for testing HTTP requests. To run the tests, use the following command:

`npm test`