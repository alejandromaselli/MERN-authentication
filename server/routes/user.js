const router = require('express').Router();

// import controllers
const { read, update } = require('../controllers/user');

// SignIn middleware
const { requireSignin, adminMiddleware } = require('../controllers/auth');

router.get('/user/:id', requireSignin, read);
router.put('/user/update', requireSignin, update);
router.put('/admin/update', requireSignin, adminMiddleware, update);

module.exports = router;