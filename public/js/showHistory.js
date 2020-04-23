function showHistory(messages) {
    let index = document.cookie.indexOf('pubChatId=');
    index += 10;
    let cookiePub = document.cookie.slice(index);
    if (messages[messages.length - 1] != cookiePub) return;
    let mainDiv = document.getElementById('messages');
    mainDiv.innerHTML = '';
    for (let i = 0; i < Math.floor((messages.length - 1) / 2); i++) {
        let newDate = new Date(messages[i].date);
        let tempValue = '';
        let minutes = '';
        tempValue += newDate.getMinutes();
        if (tempValue.length == 1) {
            minutes += '0' + tempValue;
        } else {
            minutes += tempValue;
        }

        tempValue = '';
        let month = '';
        tempValue += newDate.getMonth() + 1;
        if (tempValue.length == 1) {
            month += '0' + tempValue
        } else {
            month += tempValue;
        }

        let date =
            newDate.getDate() +
            '.' +
            month +
            ' ' +
            newDate.getHours() +
            ':' +
            minutes;
        
        let nameText =
            '<b>' + messages[i].userName + ':</b> ' + messages[i].text;

        div = document.createElement('div');

        if (messages[i + (messages.length - 1) / 2]) {
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
