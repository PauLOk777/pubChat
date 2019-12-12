const History = require('../models/History');

async function addMessage(userName, date, text) {
	const message = new History({
        userName,
        date,
        text
    });

    await message.save(); 
}

async function updateHistory() {
	const history = await History.find();
	if (history.length >= 50) {
		// Удалять элементы пока не будет 
		// ровно 50 (должно быть ровно 1 удаление)
	}
}

module.exports = {
	addMessage,
	updateHistory,
};