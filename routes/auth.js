const express = require('express');
const router = express.Router();

//Controller
const { getUser, createUser, signinUser } = require('../controllers/auth');

router.get('/user', getUser);
router.post('/signup', createUser);
router.post('/signin', signinUser);

module.exports = router;
