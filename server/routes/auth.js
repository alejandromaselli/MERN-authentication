const router = require('express').Router();

// import controllers
const { signup, accountActivation, signin } = require('../controllers/auth');

// Import validators
const { userSignupValidator, userSigninValidator } = require('../validators/auth');
const { runValidation } = require('../validators/index');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signin);
router.post('/signin', userSigninValidator, runValidation, signin);

router.post('/prueba', (req, res) => {
    console.log(req.body);
    res.json({ lol: "lol" })
});

module.exports = router;