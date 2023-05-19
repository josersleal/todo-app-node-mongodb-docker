module.exports = (app) => {
  const todoController = require('../controllers/todo.controller');

  app
    .route('/todos')
    .get(todoController.getTodos)
    .post(todoController.createTodo);

  app
    .route('/todos/:id')
    .get(todoController.getTodo)
    .put(todoController.updateTodo)
    .delete(todoController.deleteTodo);
};
