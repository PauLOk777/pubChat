const Session = require('../models/Session');

async function addSession(pubChatId, email) {
    const session = new Session({
        pubChatId,
        email,
    });

    await session.save();
}

async function findSession(pubChatId) {
    const session = await Session.findOne({ pubChatId });
    if (!session) throw new Error('Invalid pubChatId');
    return session;
}

async function updateLog(pubChatId) {
    const info = await Session.updateOne({ pubChatId }, { log: false });
    if (!info) throw new Error('Some error with sign out!');
    return info;
}

async function updateSignIn(email, key) {
    const info = await Session.updateOne(
        { email },
        { pubChatId: key, log: true }
    );
    if (!info) throw new Error('Some error with sign in!');
    return info;
}

module.exports = {
    addSession,
    findSession,
    updateSignIn,
    updateLog,
};
