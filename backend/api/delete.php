<?php

    require 'database.php';

    //Extract, validate and santize the id

    $id = ($_GET['id'] !== null && (int) $_GET['id'] > 0 ) ? mysqli_real_escape_string($con,(int) $_GET['id']) : false;

    if(!$id)
    {
        return http_respone_code(400);
    }

    //Delete
    $sql = "DELETE FROM 'products' WHERE 'id' = '{$id}' LIMIT 1";

    if(mysqli_query($con,$sql))
    {

        http_response_code(204);
    }
    else
    {
        http_response_code(422);
    }



