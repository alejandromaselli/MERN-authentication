const router = require('express').Router();

// import controllers
const { signup } = require('../controllers/auth');

// Import validators
const { userSignupValidator } = require('../validators/auth');
const { runValidation } = require('../validators/index');

router.post('/signup', userSignupValidator, runValidation, signup);

module.exports = router;