const { findUser } = require('../libs/users');
const { findSession } = require('../libs/sessions');
const { addMessage, 
		updateHistory,
		getFullHistory,
		getCutHistory,
} = require('../libs/histories');

async function connectIO(io) {
    io.sockets.on('connection', (socket) => {
    	socket.on('loadInfo', async function(cookie) {
    		let index = cookie.indexOf('pubChatId=');
    		index += 10;
    		let cookiePub = cookie.slice(index);
    		
    		const history = await loadHistory(cookiePub);
    		io.emit('loadHistory', history);
    		const name = await activeUser(cookiePub);
    		if (name) {
    			io.emit('activeUser', name);
    		}
    	});
        socket.on('disconnect', () => {

        });
        socket.on('message', async function(event) {
            await responseMessage(event);
            console.log(event);
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
        	const cutHistory = await getCutHistory(5);
        	return cutHistory;
        }
        
        const fullHistory = await getFullHistory();
        return fullHistory;
    } catch(e) {
    	console.log(e);
    	return;
    }
}

async function activeUser(cookie) {
	try {
		const currentSession = await findSession(cookie);
		if(currentSession) {
			const currentUser = await findUser(currentSession.email);
			return currentUser.username;
		}

		return '';
	} catch(e) {
		console.log(e);
		return;
	}
}

module.exports = connectIO;
