const express = require('express');
const AuthControllers = require('../controllers/AuthControllers');
const verifyToken = require('../middleware/auth');
const router = express.Router();

router.post('/register', AuthControllers.register);
router.post('/login', AuthControllers.login);
router.get('/', verifyToken ,AuthControllers.get);

module.exports = router;