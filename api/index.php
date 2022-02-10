<?php

const API_PATH = "techniki/p1/api/";
include('./dbController.php');
include('./reqUtils.php');
include('./utils.php');
include('./products.php');
include('./auth.php');
include('./orders.php');

header('content-type: application/json; charset=utf-8');

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("access-control-allow-origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");


$url  = str_replace(API_PATH, "",  $_SERVER['REQUEST_URI']);
$uri = parse_url($url, PHP_URL_PATH);
$uri = explode('/', $uri);
$method = $_SERVER['REQUEST_METHOD'];

if (sizeof($uri) > 1) {

    if ($uri[1] == "products") {
        $products = new Products();
        if ($method == "POST")  $products->post();
        else if ($method == "GET") {
            if (sizeof($uri) >= 3 && $uri[2] != "") $products->get($uri[2]);
            else $products->getList();
        } else if ($method == "PUT") {
            if (sizeof($uri) >= 3 && $uri[2] != "") $products->update($uri[2]);
            else {
                $err = new ApiError(405, "");
                $err->Send();
                exit;
            }
        } else if ($method == "DELETE") {
            if (sizeof($uri) >= 3 && $uri[2] != "") $products->delete($uri[2]);
            else {
                $err = new ApiError(405, "");
                $err->Send();
                exit;
            }
        }
    } else if ($uri[1] == "orders") {
        $orders = new Orders();
        if ($method == "POST")  $orders->post();
        else if ($method == "GET") {
            if (sizeof($uri) >= 3 && $uri[2] != "") $orders->get($uri[2]);
        } else if ($method == "DELETE") {
            if (sizeof($uri) >= 3 && $uri[2] != "") $orders->delete($uri[2]);
        }
    } else if ($uri[1] == "login") {
        $auth = new Auth();
        if ($method == "POST")  $auth->login();
    } else if ($uri[1] == "logout") {
        $auth = new Auth();
        if ($method == "POST")  $auth->logout();
    } else if ($uri[1] == "auth") {
        $auth = new Auth();
        if ($method == "POST")  $auth->authAdmin();
    }
}
