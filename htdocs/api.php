<?php

// allow cross domain requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, X-Request');

// this script returns JSON
header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        GetMessages();
        break;
    case 'PUT':
        WriteMessage();
        break;
    default:
        http_response_code(400);
        exit;
}

function GetMessages() {
    echo json_encode([[
        'id' => 1,
        'mykey' => 'string',
        'value' => 'string'
    ]]);
}

function WriteMessage() {
    echo json_encode(1);
}

?>
