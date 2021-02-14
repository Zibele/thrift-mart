<?php

    require 'database.php';

    $products = [];

    $sql = "SELECT id, name, price FROM products";

    if($result = mysqli_query($con,$sql)){

        $i;

        while($row = mysqli_fetch_assoc($result)){
            $products[$i]['id'] = $row['id'];
            $products[$i]['name'] = $row['name'];
            $products[$i]['price'] = $row['price'];
        }

        echo json_encode($products);
    }
    else{
        http_respone_code(404);
    }