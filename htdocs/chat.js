// MooTools domready function
window.addEvent('domready', function() {
    AddEvents();
});

/* CONFIGURATION */
var apiUrl = 'api.php';
var pollingInterval = 2000; // delay (in ms) before polling for next message
var defaultListSize = 10;

function AddEvents() {
    $$('#mykey').addEvents({
        change: function() {
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
var userName = 'sdf';

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

var putRequest = new XMLHttpRequest();
putRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        alert('PUT: ' + this.responseText);
    }
};
