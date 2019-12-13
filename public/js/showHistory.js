function showHistory(messages) {
	for (let i = 0; i < Math.floor(messages.length / 2); i++) {
		let newDate = new Date(messages[i].date);
		let date = newDate.getDate() +
						'.' + newDate.getMonth() +
						' ' + newDate.getHours() +
						':' + newDate.getMinutes();
			let nameText = '<b>' + messages[i].userName + ':</b> ' +
							messages[i].text;

			div = document.createElement('div');


		if (messages[i + messages.length / 2]) {
			div.className = 'myMessage';
		} else {
			div.className = 'otherMessage';
		}
		pDate = document.createElement('p');
		pDate.textContent = date;

		pText = document.createElement('p');
		pText.innerHTML = nameText;

		divInline = document.createElement('div');
		divInline.append(pDate);
		divInline.append(pText);

		div.append(divInline);

		let mainDiv = document.getElementById('messages');
		mainDiv.append(div);
		mainDiv.append(document.createElement('br'));
	}
}