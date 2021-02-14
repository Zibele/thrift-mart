<?php

    require('database.php');

    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        //Validatation
        if(trim($request->name) === '' || (float) $request->price < 0){
            return http_response_code(404);
        }


        //sanitize

        $name = mysqli_real_escape_string($con, trim($request->name));
        $price = mysqli_real_escape_string($con, (float)$request->price);

        // create

        $sql = "INSERT INTO 'products'('id','name','price') values (null, '{$name}','{$price}')";

        if(mysqli_query($con,$sql)){
            //If its been added, we want to send a success message of the item we added!
            http_response_code(422);

            $product = [
                'name' => $name,
                'price' => $price,
                'id' => mysqli_insert_id($con)
            ];

            echo json_encode($product);

        }

        else{
            http_response_code(422);
        }


    }