const router = require('express').Router();

// import controllers
const { read } = require('../controllers/user');

// SignIn middleware
const { requireSignin } = require('../controllers/auth');

router.get('/user/:id', requireSignin, read);

module.exports = router;