const express = require('express');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const auth = require('./middlewares/auth');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');

const app = express();

app.use(express.json());

app.post('/login', loginController.Login);
app.post('/user', userController.createUser);
app.get('/user', auth, userController.getAll);
app.get('/user/:id', auth, userController.getById);
app.delete('/user/me', auth, userController.deleteUser);

app.post('/categories', auth, categoryController.createCategory);
app.get('/categories', auth, categoryController.getAll);

app.post('/post', auth, postController.createPost);
app.get('/post', auth, postController.getAll);
app.get('/post/search', auth, postController.search);
app.get('/post/:id', auth, postController.getById);
app.put('/post/:id', auth, postController.updatePost);
app.delete('/post/:id', auth, postController.deletePost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
