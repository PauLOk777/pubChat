const path = require('path');
const generateKey = require('../libs/random');

async function chatPage(req, res) {
    res.render('home.hbs', {
        title: 'Chat',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        check: 'false',
        linkIn: '/sign/in',
        linkUp: '/sign/up',
    });
}

function signInPage(req, res) {
    if(req.cookies.uniq_id) {
        res.redirect('/');
        return;
    }

    res.render('signIn.hbs', {
        title: 'Sign In',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        linkIn: '/sign/in',
        linkUp: '/sign/up',
    });
}

function signUpPage(req, res) {
    if(req.cookies.uniq_id) {
        res.redirect('/');
        return;
    }

    res.render('signUp.hbs', {
        title: 'Sign Up',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        linkIn: '/sign/in',
        linkUp: '/sign/up',
    });
}

async function accountPage(req, res) {
    if(!req.cookies.uniq_id) {
        res.redirect('/');
        return;
    }
}

async function signIn(req, res) {}

async function signUp(req, res) {}

async function signOut(req, res) {}

module.exports = {
    chatPage,
    signInPage,
    signUpPage,
    accountPage,
    signOut,
    signIn,
    signUp,
};
