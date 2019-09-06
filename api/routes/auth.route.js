const router = require('express').Router();
const User = require('../models/user');
const { createToken } = require('../lib/token');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.send('auth router');
});

router.post('/signup', (req, res) => {
    const { userid, password } = req.body;

    User.findOneByUserid(userid)
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

router.post('/signin', (req, res) => {
  const { userid, password } = req.body;

  User.findOneByUserid(userid)
    .then(user => {
      if ( !user ) {
        throw new Error('가입하지 않은 아이디 입니다.');
      }

      if ( !user.verify(password) ) {
        throw new Error('패스워드가 일치하지 않습니다.');
      }

      return createToken({userid: user.userid, admin: user.admin});
    })
    .then(token => res.json({sucess: true, token }))
    .catch(err => res.status(400).json({sucess:false, message:error.message}));
});

router.get('/check', isAuthenticated, (req, res) => {
  res.json(req.decodedToken);
});

module.exports = router;
