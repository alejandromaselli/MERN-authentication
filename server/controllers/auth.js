const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);


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
    const { name, email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email has already been taken'
            })
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account Activation Link for ${name} account`,
            html: `
                <p>Que onda ${name}! ya probaste esta aplicación de M#%$RDA</p>
                <p>Tenés que apachurrarle al siguiente link:</p>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <p>Tranquilo no te vamos a hackear (Mucho)</p>
                <p>${process.env.CLIENT_URL}/auth/activate</p>
            `
        }

        sendgrid.send(emailData)
            .then(sent => {
                console.log('Signup email sent successfully');
                return res.json({
                    message: `Email has been sent to ${email}, please follow the instructions`
                })
            })
            .catch(err => {
                console.log('ERROR OF THE EMAIL', err.response.body);
                return res.json({
                    message: err
                })
            });
    });
}

exports.accountActivation = (req, res) => {
    const { token } = req.body;

    if (token) {
        jwt.verify(
            token,
            process.env.JWT_ACCOUNT_ACTIVATION,
            (err, decoded) => {
                if (err) {
                    console.log('JWT VERIFICATION ERROR', err);
                    return res.staus(401).json({
                        error: 'Expired link, signup again please'
                    })
                }

                const { name, password, email } = jwt.decode(token);

                const newUser = new User({ name, email, password })

                newUser.save((err, user) => {
                    if (err) {
                        //console.log('USER SAVE ERROR', err);

                        return res.status(401).json({
                            error: 'Error saving user in database. Try signing up again'
                        })
                    }
                    return res.json({
                        message: 'Signup process completed successfully'
                    })
                });
            }
        );
    } else {
        return res.json({
            message: 'Something went wrong please try again'
        })
    }
}

exports.signin = (req, res) => {

    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email doesnt exist'
            });
        }

        // authenticate

        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: `Email or Password don't match`
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        const { _id, name, role } = user;
        // generate a token and sen it to the client

        return res.json({
            token,
            user: { _id, name, email, role }
        })
    });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, // req.user_id
    algorithms: ['HS256']
});