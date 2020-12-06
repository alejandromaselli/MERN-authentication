const User = require('../models/user');

exports.read = (req, res) => {

    const userId = req.params.id;

    console.log(userId);

    User.findOne({ _id: userId }).exec((err, user) => {

        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};