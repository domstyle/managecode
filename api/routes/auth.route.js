const router = require('express').Router();
const User = require('../models/user');
const { createToken } = require('../lib/token');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.send('auth router');
});

router.post('/signup', (req, res) => {
    const { userid, password } = req.body;

    User.findOnByUserid(userid)
    .then(user => {
        if ( user ) {
            throw new Error(`${userid}는 이미 사용중입니다.`);
        } else {
            return User.create(userid, password);
        }
    })
    .then(() => res.json({success: true}))
    .catch(err => res.status(409).json({success: false, message: err.message}));
});

