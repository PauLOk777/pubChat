const History = require('../models/History');

async function addMessage(userName, date, text) {
    const message = new History({
        userName,
        date,
        text,
    });

    await message.save();
}

async function updateHistory() {
    const history = await History.find();
    if (history.length > 20) {
        let index = history.length - 20;
        for (let i = 0; i < index; i++) {
            const oldDate = history[i].date;
            History.findOneAndDelete({ date: oldDate }, (err, msg) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(msg);
            });
        }
    }
}

async function getFullHistory() {
    const history = await History.find();
    return history;
}

async function getCutHistory(amount) {
    const history = await History.find();
    const cutHistory = [];
    for (let i = history.length - amount; i < history.length; i++) {
        cutHistory.push(history[i]);
    }

    return cutHistory;
}

module.exports = {
    addMessage,
    updateHistory,
    getFullHistory,
    getCutHistory,
};
