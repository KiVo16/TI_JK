<?php

class ApiResponse
{
    private $code;
    private $arr;

    function __construct($code, $arr)
    {
        $this->code = $code;
        $this->arr = $arr;
    }
    public function Send()
    {
        http_response_code($this->code);
        echo json_encode($this->arr);
    }
}

class TokenResponse
{
    private $code;
    private $login;
    private $token;

    function __construct($code, $login, $token)
    {
        $this->code = $code;
        $this->login = $login;
        $this->token = $token;
    }
    public function Send()
    {
        http_response_code($this->code);
        echo json_encode(array("login" => $this->login, "token" => $this->token));
    }
}

class CreateOrderResponse
{
    private $code;
    private $id;
    private $key;

    function __construct($code, $id, $key)
    {
        $this->code = $code;
        $this->id = $id;
        $this->key = $key;
    }
    public function Send()
    {
        http_response_code($this->code);
        echo json_encode(array("id" => $this->id, "key" => $this->key));
    }
}

class GeneralResponse
{
    private $code;
    private $data;

    function __construct($code, $data)
    {
        $this->code = $code;
        $this->data = $data;
    }
    public function Send()
    {
        http_response_code($this->code);
        echo json_encode(array("data" => $this->data));
    }
}

class ApiError
{

    private $code;
    private $error;

    function __construct($code, $error)
    {
        $this->code = $code;
        $this->error = $error;
    }

    public function Send()
    {
        http_response_code($this->code);
        echo json_encode(array("code" => $this->code, "error" => $this->error));
    }
}
