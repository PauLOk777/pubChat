const { findUser } = require('../libs/users');
const { findSession } = require('../libs/sessions');
const {
    addMessage,
    updateHistory,
    getFullHistory,
    getCutHistory,
} = require('../libs/histories');

const users = new Set();

async function connectIO(io) {
    io.sockets.on('connection', async function(socket) {
        socket.on('loadInfo', async function(cookie) {
            let index = cookie.indexOf('pubChatId=');
            index += 10;
            let cookiePub = cookie.slice(index);
            socket.cookies = cookiePub;

            const history = await loadHistory(cookiePub);
            history.push(cookiePub);
            io.emit('loadHistory', history);
            const name = await activeUser(cookiePub);
            let names = [];

            if (name) {
                users.add(name);
            }

            for (let user of users) {
                names.push(user);
            }
            io.emit('activeUser', names);
        });

        socket.on('disconnect', async function() {
            let cookiePub = socket.cookies;
            try {
                const currentSession = await findSession(cookiePub);
                if (currentSession) {
                    const currentUser = await findUser(currentSession.email);

                    users.delete(currentUser.username);

                    let names = [];

                    for (let user of users) {
                        names.push(user);
                    }
                    io.emit('activeUser', names);
                }
            } catch (e) {
                console.log(e);
                return;
            }
        });
        socket.on('message', async function(event) {
            await responseMessage(event);
            io.emit('addMessage', event);
        });
    });
}

async function responseMessage(event) {
    let index = event.cookies.indexOf('pubChatId=');
    index += 10;
    const cookie = event.cookies.slice(index);
    let name = '';

    try {
        const currentSession = await findSession(cookie);
        const currentUser = await findUser(currentSession.email);

        currentUser.messages++;

        const date = new Date(event.date);
        const message = await addMessage(
            currentUser.username,
            date,
            event.text
        );

        await updateHistory();

        event.date = date;
        event.userName = currentUser.username;

        await currentUser.save();
    } catch (e) {
        console.log(e);
        return;
    }
}

async function loadHistory(cookie) {
    try {
        const currentSession = await findSession(cookie);
        if (!currentSession) {
            const fullCutHistory = await getFullHistory();

            let length;
            if (fullCutHistory.length < 4) {
                length = Math.floor(fullCutHistory.length);
            } else {
                length = Math.floor(fullCutHistory.length / 4);
            }

            const cutHistory = await getCutHistory(length);

            for (let i = 0; i < length; i++) {
                cutHistory.push(false);
            }

            return cutHistory;
        }

        const fullHistory = await getFullHistory();
        const currentUser = await findUser(currentSession.email);

        let lengthFull = fullHistory.length;

        for (let i = 0; i < lengthFull; i++) {
            if (fullHistory[i].userName == currentUser.username) {
                fullHistory.push(true);
            } else {
                fullHistory.push(false);
            }
        }

        return fullHistory;
    } catch (e) {
        console.log(e);
        return;
    }
}

async function activeUser(cookie) {
    try {
        const currentSession = await findSession(cookie);
        if (currentSession) {
            const currentUser = await findUser(currentSession.email);
            return currentUser.username;
        }

        return '';
    } catch (e) {
        console.log(e);
        return;
    }
}

module.exports = connectIO;
