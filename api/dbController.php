<?php


interface Query
{
    public function execute();
}


class InsertQuery implements Query
{

    private $conn = null;
    private $table = null;
    private $values = array();

    function __construct($conn, $table, $values)
    {
        $this->conn = $conn;
        $this->table = $table;
        $this->values = $values;
    }

    public function execute()
    {
        $stmt = "INSERT INTO " . $this->table . " (";
        $values = array();
        $last_key = array_key_last($this->values);
        foreach ($this->values as $key => $value) {
            $stmt .= $key;
            if ($key != $last_key) $stmt .= ",";
            array_push($values, $value);
        }

        $stmt .= ") VALUES (";
        for ($i = 0; $i < sizeof($this->values); $i++) {
            $stmt .= "?";
            if ($i != sizeof($this->values) - 1) $stmt .= ",";
        }
        $stmt .= ")";
        $prepared = $this->conn->prepare($stmt);
        $prepared->execute($values);
    }
}


class DeleteQuery implements Query
{

    private $conn = null;
    private $table = null;
    private $whereArr = array();

    function __construct($conn, $table, $whereArr)
    {
        $this->conn = $conn;
        $this->table = $table;
        $this->whereArr = $whereArr;
    }

    public function execute()
    {
        $stmt = "DELETE FROM " . $this->table . " ";

        if (sizeof($this->whereArr) > 0) {
            $stmt .= " WHERE ";
        }

        $values = array();
        $last_key = array_key_last($this->whereArr);
        foreach ($this->whereArr as $key => $value) {
            $stmt .= $key . "=?";
            if ($key != $last_key) $stmt .= " AND";
            array_push($values, $value);
        }
        $prepared = $this->conn->prepare($stmt);
        $prepared->execute($values);
    }
}

class UpdateQuery implements Query
{

    private $conn = null;
    private $table = null;
    private $values = array();
    private $whereArr = array();

    function __construct($conn, $table, $values, $whereArr)
    {
        $this->conn = $conn;
        $this->table = $table;
        $this->values = $values;
        $this->whereArr = $whereArr;
    }

    public function execute()
    {
        $stmt = "UPDATE " . $this->table . " SET ";
        $values = array();

        $last_key = array_key_last($this->values);
        foreach ($this->values as $key => $value) {
            $stmt .= $key . "=?";
            if ($key != $last_key) $stmt .= ", ";
            array_push($values, $value);
        }

        if (sizeof($this->whereArr) > 0) {
            $stmt .= " WHERE ";
        }

        $last_key = array_key_last($this->whereArr);
        foreach ($this->whereArr as $key => $value) {
            $stmt .= $key . "=?";
            if ($key != $last_key) $stmt .= " AND ";
            array_push($values, $value);
        }
        $prepared = $this->conn->prepare($stmt);
        $prepared->execute($values);
    }
}

class DB
{
    const DB_SERVER = "localhost";
    const DB_NAME = "ti2";
    const DB_USER = "root";
    const DB_PASS = "";
    public $conn = null;

    function __construct()
    {
        try {
            $conn = new PDO("mysql:host=" . self::DB_SERVER .  ";dbname=" . self::DB_NAME, self::DB_USER, self::DB_PASS);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn = $conn;
        } catch (PDOException $e) {
            $err = new ApiError(500, "Failed while connecting to database");
            $err->Send();
            exit;
        }
    }

    public function close()
    {
        if (!$this->conn != null) $conn = null;
    }

    public function getNextTableID($table)
    {
        $query = "SELECT id FROM $table ORDER BY id DESC LIMIT 1;";
        $rows = $this->Select($query, array());
        if ($rows == NULL || sizeof($rows) == 0) return 1;
        
        return intval($rows[0]["id"]) + 1;
    }

    public function getConn()
    {
        return $this->conn;
    }

    public function Select($query, $args)
    {
        $stmt = $this->conn->prepare($query);
        $stmt->execute($args);
        return $stmt->fetchAll();
    }

    public function Transaction($queries)
    {
        try {
            $this->conn->beginTransaction();
            foreach ($queries as $query) {
                $query->execute();
            }
            $this->conn->commit();
        } catch (Exception $e) {
            $this->conn->rollback();
            throw $e;
        }
    }
}
