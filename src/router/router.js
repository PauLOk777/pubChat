const express = require('express');

const router = express.Router();

const handlers = require('../handlers/handlers');

router.get('/', handlers.chatPage);
router.get('/sign/in', handlers.signInPage);
router.get('/sign/up', handlers.signUpPage);
router.get('/account', handlers.accountPage);
router.get('/sign/out', handlers.signOut);
router.post('/sign/in', handlers.signIn);
router.post('/sign/up', handlers.signUp);

module.exports = router;
