<?php

require_once('ChatDb.php');

// allow cross domain requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, X-Request');

// this script returns JSON
header('Content-Type: application/json');

$db = new ChatDb();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        GetMessages($_GET);
        break;
    case 'PUT':
        // get PUT data containing message
        parse_str(file_get_contents('php://input'), $_PUT);
        WriteMessage($_PUT);
        break;
    default:
        Error();
}

function GetMessages($data) {
    global $db;
    // echo json_encode($data);
    if (! isset($data['minimumid']) || ! is_numeric($data['minimumid'])) {
        Error();
    }
    $res = $db->getMessages($data['minimumid']);

    // JSON_NUMERIC_CHECK converts numeric strings to numbers
    // See: https://stackoverflow.com/questions/11128823/how-to-properly-format-pdo-results-numeric-results-returned-as-string
    echo json_encode($res, JSON_NUMERIC_CHECK);
}

function WriteMessage($message) {
    global $db;
    $res = $db->writeMessage($message['mykey'], $message['value']);
    echo json_encode($res);
}

function Error() {
    http_response_code(400);
    exit;
}

?>
