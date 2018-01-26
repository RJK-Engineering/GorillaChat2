/* Requires MooTools */
/* Messages are written to element with id="messages" */

function DisplayMessage(userName, message) {
    Display(
        '<span class="userName">' + userName + '</span> '
        + message + '<br>'
    );
}

function DisplaySystemMessage(message, style) {
    if (! style) { style = 'info' }
    Display('<span class="' + style + '">' + message + '</span><br>');
}

function Display(html) {
    var div = $$('#messages');
    div.appendHTML(html);
    // scroll to end of div
    div.scrollTo(0, div.getScrollSize()[0].y);
}
