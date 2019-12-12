const { findUser } = require('../libs/users');
const { findSession } = require('../libs/sessions');
const { addMessage, updateHistory } = require('../libs/histories');

async function connectIO(io) {
    io.sockets.on('connection', (socket) => {
        socket.on('disconnect', () => {});
        socket.on('message', (event) => {
        	responseMessage(event);
            io.emit('addMessage', event);
        });
    });
}

async function responseMessage(event) {
   	let index = event.cookies.indexOf('pubChatId=');
   	index += 10;
   	const cookie = event.cookies.slice(index);

   	try {
     	const currentSession = await findSession(cookie);
    	const currentUser = await findUser(currentSession.email);
    		
   		currentUser.message++;
   		await currentUser.save();
    	
   		const date = new Date(event.date);
   		const message = await addMessage(currentUser.username, date, event.text);
		// await updateHistory();
   		
   	} catch(e) {
   		console.log(e);
   		return;
   	}
}

module.exports = connectIO;
