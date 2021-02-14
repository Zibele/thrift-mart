<?php

    require('database.php');

    //Get post data
    $postdata = file_get_contents("php://input");

    if(isset($postdata) || !empty($postdata)){

        $request = json_decode($postdata);

        if((int) $request -> id < 1 || trim($request -> name) == '' || (float) $request  -> price < 0){
            return http_response_code(400);
        }

        //Sanitize

        $id = mysqli_real_escape_string($con, (int) $request->id);
        $name = mysqli_real_escape_string($con, $request->name);
        $price = mysqli_real_escape($con, $request->price);

        $sql = "UPDATE 'products' SET 'name' = '{$name}' , 'price' = '{$price} WHERE 'id' = '{$id}' LIMIT 1";
        
        if(mysqli_query($con,$sql)){
            http_response_code(204);
        }
        else{
            return http_response_code(404);
        }

    }


    
