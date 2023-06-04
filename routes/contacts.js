const routes = require('express').Router();
const { getAllContacts, getById } = require('../controllers/contacts');

routes.get('/', getAllContacts);
routes.get('/:id', getById);

module.exports = routes;
