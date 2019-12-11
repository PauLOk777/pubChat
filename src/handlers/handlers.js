const path = require('path');
const generateKey = require('../libs/random');

async function chatPage(req, res) {
    res.render('home.hbs', {
    	title: 'Chat',
    	mail: 'Hello'
    });
}

function signInPage(req, res) {}

function signUpPage(req, res) {}

async function accountPage(req, res) {}

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
