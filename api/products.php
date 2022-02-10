<?php

class Products
{
    const ProductsTable = "products";
    const ProductStatusNormal = 0;
    const ProductStatusDeleted = 1;


    function checkIsProductComplete($body)
    {
        return !(!isset($body["name"]) || !isset($body["description"]) || !isset($body["duration"]) || !isset($body["price"]));
    }

    function post()
    {

        $auth = new Auth();
        $auth->auth();

        $body = json_decode(file_get_contents('php://input'), true);
        if (!$this->checkIsProductComplete($body)) {
            $err = new ApiError(400, "Failed while creating product: " . "missing fields");
            $err->Send();
            exit;
        }

        $db = new DB();
        $query = new InsertQuery($db->getConn(), self::ProductsTable, array("name" => $body["name"], "description" => $body["description"], "duration" => $body["duration"], "price" => $body["price"], "status" => self::ProductStatusNormal));

        try {
            $db->Transaction(array($query));
            $response = new GeneralResponse(201, "Product craeted");
            $response->Send();
        } catch (Exception $e) {
            $err = new ApiError(500, "Failed while creating product: " . $e);
            $err->Send();
        }
        $db->close();
    }

    function update($id)
    {

        $auth = new Auth();
        $auth->auth();

        $body = json_decode(file_get_contents('php://input'), true);
        if (!$this->checkIsProductComplete($body)) {
            $err = new ApiError(400, "Failed while creating product: " . "missing fields");
            $err->Send();
            exit;
        }

        $args = array("name" => $body["name"], "description" => $body["description"], "duration" => $body["duration"], "price" => $body["price"]);
        $db = new DB();
        $query = new UpdateQuery(
            $db->getConn(),
            self::ProductsTable,
            $args,
            array("id" => $id)
        );

        try {
            $db->Transaction(array($query));
            $response = new GeneralResponse(201, "Product updated");
            $response->Send();
        } catch (Exception $e) {
            $err = new ApiError(500, "Failed while updating product: " . $e);
            $err->Send();
        }
        $db->close();
    }


    function delete($id)
    {
        $auth = new Auth();
        $auth->auth();

        echo "id: " . $id;

        $db = new DB();
        $query = new UpdateQuery(
            $db->getConn(),
            self::ProductsTable,
            array("status" => self::ProductStatusDeleted),
            array("id" => $id)
        );

        try {
            $db->Transaction(array($query));
            $response = new GeneralResponse(201, "Product deleted");
            $response->Send();
        } catch (Exception $e) {
            $err = new ApiError(500, "Failed while deleting product: " . $e);
            $err->Send();
        }
        $db->close();

        /*
       $db = new DB();
        $query = new DeleteQuery($db->conn, self::ProductsTable, array("id" => $id));
        try {
            $db->Transaction(array($query));
            $response = new GeneralResponse(200, "Product deleted");
            $response->Send();
        } catch (Exception $e) {
            $err = new ApiError(500, "Failed while deleting product: " . $e);
            $err->Send();
        }
        $db->close();
        */
    }

    function get($id)
    {
        $db = new DB();

        $args = array($id, self::ProductStatusNormal);
        $where = "WHERE id = ? AND status = ?";
        $query = "SELECT * FROM " . self::ProductsTable . " " . $where;

        $rows = $db->Select($query, $args);
        if ($rows == NULL || sizeof($rows) == 0) {
            $err = new ApiError(404, "Product with id $id not found");
            $err->Send();
            return;
        }

        $product = array(
            "id" => $id,
            "name" => $rows[0]["name"],
            "description" => $rows[0]["description"],
            "duration" => $rows[0]["duration"],
            "price" => $rows[0]["price"]
        );

        $r = new ApiResponse(200, $product);
        $r->Send();
        $db->close();
    }

    function getList()
    {
        $db = new DB();

        $args = array(self::ProductStatusNormal);
        $where = " WHERE status = ? ";
        if (isset($_GET["search"])) {
            $where .= " name LIKE ? OR description LIKE ?";
            array_push($args,"%".$_GET["search"] . "%", "%" . $_GET["search"] . "%");
        }

        $query = "SELECT * FROM " . self::ProductsTable . " " . $where;

        $products = array();
        $rows = $db->Select($query, $args);
        if ($rows != NULL || sizeof($rows) > 0) {
            foreach ($rows as $product) {
                array_push($products, array(
                    "id" => $product["id"],
                    "name" => $product["name"],
                    "description" => $product["description"],
                    "duration" => $product["duration"],
                    "price" => $product["price"]
                ));
            }
        }

        $r = new ApiResponse(200, $products);
        $r->Send();
        $db->close();
    }
}
