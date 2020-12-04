const { check } = require('express-validator');

exports.userSignupValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email address is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

exports.userSigninValidator = [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];