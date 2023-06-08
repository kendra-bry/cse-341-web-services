const routes = require('express').Router();
const { getAllContacts, getById, insertContact, updateContact, deleteContact } = require('../controllers/contacts');

routes.get('/', getAllContacts);
routes.get('/:id', getById);
routes.post('/', insertContact);
routes.put('/:id', updateContact);
routes.delete('/:id', deleteContact);

module.exports = routes;
