<?php

require_once 'jwt/BeforeValidException.php';
require_once 'jwt/ExpiredException.php';
require_once 'jwt/SignatureInvalidException.php';
require_once 'jwt/Key.php';
require_once 'jwt/JWK.php';
require_once 'jwt/JWT.php';


use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
use \Firebase\JWT\ExpiredException;

class Auth
{
    const AuthTable = "admin_auth";
    const JWPSecretKey = "key123";

    function createToken($login)
    {
        $issuedAt   = new DateTimeImmutable();
        $data = array(
            'exp'  => $issuedAt->modify('+15 minutes')->getTimestamp(),
            'login' => $login,
        );

        return JWT::encode(
            $data,
            self::JWPSecretKey,
            'HS256'
        );
    }

    function readToken($token)
    {
        try {
            return JWT::decode($token, new Key(self::JWPSecretKey, 'HS256'));
        } catch (Exception $e) {
            throw $e;
        }
    }

    function getAuthByCredentials($db, $login, $pass)
    {
        $args = array($login, $pass);
        $where = "WHERE login = ? AND pass = ?";
        $query = "SELECT * FROM " . self::AuthTable . " " . $where;

        $rows = $db->Select($query, $args);
        if ($rows == NULL || sizeof($rows) == 0) {
            $err = new ApiError(401, "Invalid login or password");
            $err->Send();
            return NULL;
        }
        return $rows;
    }

    function getAuthByToken($db, $login, $token)
    {
        $args = array($token, $login);
        $where = "WHERE token = ? AND login = ?";
        $query = "SELECT * FROM " . self::AuthTable . " " . $where;

        $rows = $db->Select($query, $args);
        if ($rows == NULL || sizeof($rows) == 0) {
            $err = new ApiError(401, "Unauthenticated");
            $err->Send();
            return NULL;
        }
        return $rows;
    }

    function login()
    {
        $body = json_decode(file_get_contents('php://input'), true);
        if (!isset($body["login"]) || !isset($body["pass"])) {
            $err = new ApiError(400, "Failed while loging in: " . "missing login or password");
            $err->Send();
            exit;
        }

        $db = new DB();
        $auth = $this->getAuthByCredentials($db, $body["login"], $body["pass"]);
        if ($auth == NULL) exit;


        $jwtToken = $this->createToken($body["login"]);
        $query = new UpdateQuery($db->getConn(), self::AuthTable, array("token" => $jwtToken), array("login" => $body["login"], "pass" => $body["pass"]));

     
        try {
            $db->Transaction(array($query));
            $response = new TokenResponse(200, $body["login"], $jwtToken);
            $response->Send();
        } catch (Exception $e) {
            $err = new ApiError(500, "Failed while loginig in: " . $e);
            $err->Send();
        }

        $domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false;
        setcookie( "token", $jwtToken, time() + (60 * 15), "/", NULL, true, true );

        $db->close();
    }

    function authAdmin()
    {
        if (!isset($_COOKIE["token"])) {
            $err = new ApiError(401, "Unauthenticated: " . "missing cookie");
            $err->Send();
            exit;
        }
        $token = $_COOKIE["token"];
        $data = array();

        try {
            $data = (array) $this->readToken($token);
        } catch (Exception $e) {
            $err = new ApiError(500, "Unauthenticated: " . $e);
            $err->Send();
            exit;
        }

        $exp = $data["exp"];
        if ($exp < time()) {
            $err = new ApiError(401, "Unauthenticated: " . "token expired");
            $err->Send();
            exit;
        }

        $db = new DB();
        $auth = $this->getAuthByToken($db, $data["login"], $token);
        if ($auth == NULL) exit;

        $db->close();
    }

    function logout()
    {
        if (isset($_COOKIE["token"])) {
            $token = $_COOKIE["token"];
            $data = array();

            try {
                $data = (array) $this->readToken($token);
            } catch (Exception $e) {
                $err = new ApiError(500, "Failed while loging out: " . $e);
                $err->Send();
                exit;
            }

            $db = new DB();
            $query = new UpdateQuery($db->getConn(), self::AuthTable, array("token" => ""), array("login" => $data["login"], "token" => $token));

            try {
                $db->Transaction(array($query));
                $response = new GeneralResponse(200, "Logged out");
                $response->Send();
            } catch (Exception $e) {
                $err = new ApiError(500, "Failed while loginig in: " . $e);
                $err->Send();
            }
            $db->close();
        }
        setcookie("token", null, -1, "/", true, true);
    }


}
