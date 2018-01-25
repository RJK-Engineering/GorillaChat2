// MooTools domready function
window.addEvent('domready', function() {
    AddEvents();
});

/* CONFIGURATION */
var apiUrl = 'api.php';
var pollingInterval = 2000; // delay (in ms) before polling for next message
var defaultListSize = 10;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText);
    }
};

function AddEvents() {
    $$('#mykey').addEvents({
        change: function() {
            xhttp.open("GET", "api.php", true);
            xhttp.send();
        }
    });
    $$('#value').addEvents({
        change: function() {
            xhttp.open("PUT", "api.php", true);
            xhttp.send();
        }
    });
}
