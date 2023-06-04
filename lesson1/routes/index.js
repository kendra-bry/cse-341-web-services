const routes = require('express').Router();
const { sydnee, jillian, katrina } = require('../controllers');

routes.get('/', sydnee);
routes.get('/jillian', jillian);
routes.get('/katrina', katrina);

module.exports = routes;
