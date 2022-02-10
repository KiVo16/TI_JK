<?php

class Orders
{
    const OrderTable = "orders";
    const OrderProducstsTable = "orders_products";

    function checkIsOrderComplete($body)
    {
        return !(!isset($body["clientName"]) || !isset($body["products"]));
    }

    function post()
    {
        $body = json_decode(file_get_contents('php://input'), true);
        if (!$this->checkIsOrderComplete($body)) {
            $err = new ApiError(400, "Failed while creating order: " . "missing fields");
            $err->Send();
            exit;
        }
        $db = new DB();
        $nextId = $db->getNextTableID(self::OrderTable);

        $key = generateRandomString(20);

        $date = date('Y-m-d H:i:s');
        $orderQuery =  new InsertQuery($db->getConn(), self::OrderTable, array("id" => $nextId, "client_name" => $body["clientName"], "date_add" => $date, "access_key" => $key));
        $queries = array($orderQuery);
        $products = $body["products"];

        foreach ($products as $product) {
            $query = new InsertQuery($db->getConn(), self::OrderProducstsTable, array(
                "order_id" => $nextId,
                "product_id" => $product["id"],
                "count" => $product["count"],
            ));
            array_push($queries, $query);
        }

        try {
            $db->Transaction($queries);
            $response = new CreateOrderResponse(201,  $nextId, $key);
            $response->Send();
        } catch (Exception $e) {
            $err = new ApiError(500, "Failed while creating order: " . $e);
            $err->Send();
        }
        $db->close();
    }

    function get($id)
    {
        if (!isset($_GET["key"])) {
            $err = new ApiError(400, "Failed while getting order: " . "missing 'key' query param");
            $err->Send();
            exit;
        }

        $db = new DB();

        $args = array($id, $_GET["key"]);
        $where = "WHERE o.id = ? AND o.access_key = ?";
        $query = "
        SELECT o.id, o.client_name, p.name,p.id as 'product_id', p.description, p.price, p.duration, op.count FROM orders_products AS op
        INNER JOIN orders AS o ON o.id = op.order_id
        INNER JOIN products AS p ON p.id = op.product_id "
            . $where;

        $rows = $db->Select($query, $args);
        if ($rows == NULL || sizeof($rows) == 0) {
            $err = new ApiError(404, "Product with id $id not found or you don't have access to it");
            $err->Send();
            return;
        }

        $order = array();
        $products = array();
        foreach ($rows as $row) {
            $order["id"] = intval($row["id"]);
            $order["clientName"] = $row["client_name"];
            array_push($products, array(
                "id" => intval($row["product_id"]),
                "name" => $row["name"],
                "description" => $row["description"],
                "duration" => intval($row["duration"]),
                "price" => intval($row["price"]),
                "count" => intval($row["count"])
            ));
        }
        $order["products"] = $products;

        $r = new ApiResponse(200, $order);
        $r->Send();
        $db->close();
    }

    function delete($id)
    {
        if (!isset($_GET["key"])) {
            $err = new ApiError(400, "Failed while getting order: " . "missing 'key' query param");
            $err->Send();
            exit;
        }

        $db = new DB();
        $query = "SELECT * FROM " . self::OrderTable . " WHERE id=? AND access_key=?";
        $rows = $db->Select($query, array($id, $_GET["key"]));
        if ($rows == NULL || sizeof($rows) == 0) {
            $err = new ApiError(404, "Product with id $id not found or you don't have access to it");
            $err->Send();
            return;
        }

        $query = new DeleteQuery($db->conn, self::OrderTable, array("id" => $id));
        try {
            $db->Transaction(array($query));
            $response = new GeneralResponse(200, "Order deleted");
            $response->Send();
        } catch (Exception $e) {
            $err = new ApiError(500, "Failed while deleting order: " . $e);
            $err->Send();
        }
        $db->close();
    }
}
