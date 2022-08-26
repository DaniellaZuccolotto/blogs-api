const express = require('express');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const auth = require('./middlewares/auth');
const categoryController = require('./controllers/categoryController');

const app = express();

app.use(express.json());

app.post('/login', loginController.Login);
app.post('/user', userController.createUser);
app.get('/user', auth, userController.getAll);
app.get('/user/:id', auth, userController.getById);

app.post('/categories', auth, categoryController.createCategory);
app.get('/categories', auth, categoryController.getAll);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
