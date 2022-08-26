const postService = require('../services/postService');

async function createPost(req, res) {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  if (!title || !content) {
    return res.status(400).send({ message: 'Some required fields are missing' });
  }
  const responseService = await postService.createPost(id, title, content, categoryIds);
  if (responseService.status) {
    const { status, message } = responseService;
    return res.status(status).json({ message });
  }
  return res.status(201).json(responseService);
}

async function getAll(req, res) {
  const responseService = await postService.getAll();
  return res.status(200).json(responseService);
}

async function getById(req, res) {
  const { id } = req.params;
  const responseService = await postService.getById(id);
  if (responseService.message) {
    const { status, message } = responseService;
    return res.status(status).json({ message });
  }
  return res.status(200).json(responseService.dataValues);
}

module.exports = { createPost, getAll, getById };