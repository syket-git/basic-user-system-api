const express = require('express');
const router = express.Router();

//Controller
const { createUser, signinUser } = require('../controllers/auth');

router.post('/signup', createUser);
router.post('/signin', signinUser);

module.exports = router;
