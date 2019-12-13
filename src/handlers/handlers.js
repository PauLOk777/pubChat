// Libs
const { addUser, checkUser, findUser } = require('../libs/users');
const {
    addSession,
    findSession,
    findSessionEmail,
    updateSignIn,
    updateLog,
} = require('../libs/sessions');
const generateKey = require('../libs/random');

async function chatPage(req, res) {
    let pointer = 'Not Empty';
    try {
        const currentSession = await findSession(req.cookies.pubChatId);
        if (!currentSession || !currentSession.log) {
            pointer = null;
        }
    } catch (e) {
        console.log(e);
        res.status(404);
        return;
    }

    if (pointer) {
        res.render('home.hbs', {
            title: 'Chat',
            signIn: 'Account',
            signUp: 'Sign Out',
            linkIn: '/account',
            linkUp: '/sign/out',
        });
    } else {
        res.render('home.hbs', {
            title: 'Chat',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            check: 'false',
            linkIn: '/sign/in',
            linkUp: '/sign/up',
        });
    }
}

async function signInPage(req, res) {
    if (req.cookies.pubChatId) {
        try {
            const currentSession = await findSession(req.cookies.pubChatId);
            if (currentSession) {
                if (currentSession.log)
                res.redirect('/');
                return;
            }
        } catch (e) {
            console.log(e);
            return;
        }
    }

    res.render('signIn.hbs', {
        title: 'Sign In',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        linkIn: '/sign/in',
        linkUp: '/sign/up',
    });
}

async function signUpPage(req, res) {
    if (req.cookies.pubChatId) {
        try {
            const currentSession = await findSession(req.cookies.pubChatId);
            if (currentSession) {
                if (currentSession.log)
                res.redirect('/');
                return;
            }
        } catch (e) {
            console.log(e);
            return;
        }
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
    try {
        const currentSession = await findSession(req.cookies.pubChatId);

        if (!currentSession || !currentSession.log) {
            res.redirect('/');
            return;
        }

        const currentUser = await findUser(currentSession.email);

        res.render('account.hbs', {
            title: 'Account',
            user_email: currentUser.email,
            signIn: 'Account',
            signUp: 'Sign Out',
            linkIn: '/account',
            linkUp: '/sign/out',
            username: currentUser.username,
            msg: currentUser.messages,
        });
    } catch (e) {
        console.log(e);
        res.redirect('/');
        return;
    }
}

async function signIn(req, res) {
    try {
        const currentSession = await findSession(req.cookies.pubChatId);

        if (!currentSession) {
            const { email, password } = req.body;

            const info = await updateSignIn(email);
            const match = await checkUser(email, password);
            if (match) {
                const currentSession = await findSessionEmail(email);
                res.cookie('pubChatId', currentSession.pubChatId);
                res.status(200);
                res.redirect('/');
            } else {
                res.status(401);
                res.end('Invalid sign up data!');
            }
        } else {
            res.redirect('/');
            return;
        }
    } catch (e) {
        console.error(e);
        res.status(400);
        res.end('Error: wrong post data was sent!');
    }
}

async function signUp(req, res) {
    // if (!req.cookies.pubChatId) {
    //     try {
    //         const key = generateKey(50);
    //         const { username, email, password } = req.body;
    //         await addSession(key, email);
    //         await addUser(username, email, password);

    //         res.cookie('pubChatId', key);
    //         res.status(200);
    //         res.redirect('/');
    //     } catch (err) {
    //         console.error(err);
    //         res.status(401);
    //         res.end('Error: wrong post data was sent!');
    //     }
    // } else {
    //     res.redirect('/');
    //     return;
    // }
    try {
        const currentSession = await findSession(req.cookies.pubChatId);
        if (!currentSession) {
            const key = generateKey(50);
            const { username, email, password } = req.body;
            await addSession(key, email);
            await addUser(username, email, password);

            res.cookie('pubChatId', key);
            res.status(200);
            res.redirect('/');
        } else {
            res.redirect('/');
            return;
        }
    } catch (e) {
        console.error(e);
        res.status(401);
        res.end('Error: wrong post data was sent!');
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
