<?php

class ChatDb {

    private $server = "localhost";
    private $name = "gorillachat";
    private $user = "gorillachat";
    private $pass = "gorillachat";

    private $db;

    function __construct() {
        $this->connect();
    }

    function getMessages($minimumId) {
        $sql = "select * from messages where id >= :minimumId order by id";
        $statement = $this->db->prepare($sql);
        $statement->execute(array(
            ':minimumId' => $minimumId
        ));

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    function writeMessage($mykey, $value) {
        $sql = "insert into messages (mykey, value) values(:mykey, :value)";
        $statement = $this->db->prepare($sql);
        $statement->execute(array(
            ':mykey' => $mykey,
            ':value' => $value,
        ));

        return $this->db->lastInsertId();
    }

    function connect() {
        $this->db = new PDO(
            "mysql:host=" . $this->server . ";dbname=" . $this->name,
            $this->user,
            $this->pass
        );
    }
}

?>
