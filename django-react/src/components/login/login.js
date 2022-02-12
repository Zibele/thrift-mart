
import React from "react";
import {Formik,Field,Form} from "formik";
import { FormLabel,FormControl,Input,FormErrorMessage,Button } from "@chakra-ui/react";

const Login = (props) => {

    const validateUsername = (value) => {

        let error;
        
        const isValid = value.match(/^[a-zA-Z0-9]+([.\-_]?[_a-zA-Z0-9])*$/);

        if (!value) {
          error = 'A username is required';
        } else if(value.length < 4 || !isValid){
          error = "Username is invalid";
        }
        
        return error;
           
      }

    const validatePassword = (value) => {
        
        let error;
        
        const isValid = value ? value.match(/^[a-zA-Z0-9]+([.\-_]?[_a-zA-Z0-9])*$/) : false;
        
        if(!value){
            error = "A password is required";
        }
        else if(value.length < 8 || !isValid){
            error = "Password is invalid"
        }

        return error;
    }  

    return (

        <Formik
            initialValues={{username:""}}
            onSubmit={(values,actions)=>{
                
                setTimeout(()=>{
                    alert(JSON.stringify(values,null,2));
                    actions.setSubmitting(false);

                },1000);
            }}
        >

            {(props)=>(

                <Form className="flex flex-col p-4">

                    <Field name="username" validate={validateUsername}>
                       {({field,form})=>(
                            <FormControl isInvalid={form.errors.username && form.touched.username}>
                                
                                <FormLabel htmlFor='username'>
                                    Username
                                </FormLabel>
                                <Input {...field} id='username' placeholder='username'/>
                                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                
                            </FormControl>    

                       )}

                    </Field> 

                    <Field name="password" validate={validatePassword}>
                        
                        {({field,form})=>(

                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                
                                <FormLabel htmlFor = "password">
                                    Password
                                </FormLabel>

                                <Input {...field} id="password" placeholder="password"/>

                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>

                            </FormControl>

                        )}


                    </Field>    

                    <Button 
                        mt={4}
                        colorScheme="teal"
                        isLoading={props.isSubmitting}
                        type='submit'
                    >

                        Submit
                        
                    </Button>   

                </Form>
                
            
            )}

        </Formik>






    );


}

export default Login;