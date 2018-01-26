// MooTools domready function
window.addEvent('domready', function() {
    AddEvents();
    SetUsername('Anonymous');
    // schedule first poll
    setTimeout(GetMessages, pollingInterval);
});

/* CONFIGURATION */
var apiUrl = 'api.php';
var pollingInterval = 2000; // delay (in ms) before polling for next message
var defaultListSize = 10;

function AddEvents() {
    $$('#mykey').addEvents({
        change: function() {
            SetUsername(this.value);
        }
    });
    $$('#value').addEvents({
        keyup: function(e) {
            if (e.code == 13) {
                var message = $$('#value').get('value');
                SendMessage(message);
                $$('#value').set('value', '');
            }
        }
    });
}

var minimumId = 0;
var userName;

function SendMessage(message) {
    if (! message) {
        DisplaySystemMessage("You didn't type anything!", 'warning');
        return;
    }

    putRequest.open("PUT", "api.php", true);
    putRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    putRequest.send("id=0&mykey=" + userName + "&value=" + message);

    DisplayMessage(userName, message);
}

function GetMessages() {
    getRequest.open("GET", "api.php?minimumid=" + minimumId, true);
    getRequest.send();

    // schedule next poll
    setTimeout(GetMessages, pollingInterval);
}

function SetUsername(name) {
    if (! name) {
        DisplaySystemMessage("No name provided", 'error');
        return;
    }
    userName = name;
    $$('#mykey').set('value', userName);
    SendMessage('has entered the chat');
}

/* Setup XMLHttpRequest objects */

var getRequest = new XMLHttpRequest();
getRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log (this.responseText);
        var list = JSON.parse(this.responseText);
        if (list.length > 0) {
            list.each( function (message) {
                DisplayMessage(message.mykey, message.value);
            });
            minimumId = list[list.length - 1].id + 1;
        }
    }
};

var putRequest = new XMLHttpRequest();
putRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        minimumId = JSON.parse(this.responseText) + 1;
    }
};
