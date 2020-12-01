const User = require('../models/user')
/*
exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is already taken'
            })
        }
    });

    const newUser = new User({
        name: name,
        email: email,
        password: password
    });

    newUser.save((err, success) => {
        if (err) {
            console.error('SIGNUP ERROR', err)
            return res.status(400).json({err: err})
        }

        res.json({
            message: 'Signup process completed successfully'
        });
    });

};
*/

exports.signup = (req, res) => {
    
}