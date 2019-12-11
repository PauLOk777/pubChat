// Libs
const { addUser, checkUser, findUser } = require('../libs/users');
const {
    addSession,
    findSession,
    updateSignIn,
    updateLog,
} = require('../libs/sessions');
const generateKey = require('../libs/random');

async function chatPage(req, res) {
    if (!req.cookies.pubChatId) {
        res.render('home.hbs', {
            title: 'Chat',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            check: 'false',
            linkIn: '/sign/in',
            linkUp: '/sign/up',
        });
        return;
    }

    res.render('home.hbs', {
        title: 'Chat',
        signIn: 'Account',
        signUp: 'Sign Out',
        linkIn: '/account',
        linkUp: '/sign/out',
    });
}

function signInPage(req, res) {
    if (req.cookies.pubChatId) {
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
    if (req.cookies.pubChatId) {
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
    if (!req.cookies.pubChatId) {
        res.redirect('/');
        return;
    }
}

async function signIn(req, res) {
    if (!req.cookies.pubChatId) {
        const key = generateKey(50);
        const { email, password } = req.body;
        res.cookie('pubChatId', key);

        try {
            const info = await updateSignIn(email, key);
            const match = await checkUser(email, password);
            if (match) {
                res.status(200);
                res.redirect('/');
                //....
            } else {
                res.status(401);
                res.end('Invalid sign up data!');
            }
        } catch (err) {
            console.error(err);
            res.status(400);
            res.end('Error: wrong post data was sent!');
        }
    }
}

async function signUp(req, res) {
    if (!req.cookies.pubChatId) {
        const key = generateKey(50);
        res.cookie('pubChatId', key);
        const { username, email, password } = req.body;

        try {
            await addSession(key, email);
            await addUser(username, email, password);
            res.status(200);
            res.redirect('/');
            //....
        } catch (err) {
            console.error(err);
            res.status(401);
            res.end('Error: wrong post data was sent!');
        }
    } else {
        res.redirect('/');
        return;
    }
}

async function signOut(req, res) {
    const info = await updateLog(req.cookies.pubChatId);
    res.clearCookie('pubChatId').redirect('/');
}

module.exports = {
    chatPage,
    signInPage,
    signUpPage,
    accountPage,
    signOut,
    signIn,
    signUp,
};
