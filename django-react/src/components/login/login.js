
import React from "react";
import {Formik,Field,Form} from "formik";
import { FormLabel,FormControl,Input,FormErrorMessage,Button } from "@chakra-ui/react";

const Login = (props) => {

   

    const validateInput = (value,message) => {
        
        let error;
        
        //const isValid = value.match(/^[a-zA-Z0-9]+([.\-_]?[_a-zA-Z0-9])*$/);
        //const isValid = value ? value.match(/^[a-zA-Z0-9]+([.\-_]?[_a-zA-Z0-9])*$/) : false;
        
        if(!value){
            error = message;
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
                <div className="grid grid-cols-10 py-8 ">
                <Form className="col-start-2 col-span-8 p-4 md:col-start-4 md:col-span-4 border-2 ">

                    <Field name="username" validate={value => (validateInput(value,"Please enter a username"))}>
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

                    <Field name="password" validate={value=>(validateInput(value,"Please enter a password"))}>
                        
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

                    <div className="flex justify-center">
                        <Button 
                            mt={4}
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type='submit'
                        >

                            Submit
                   
                        </Button>
                    </div>       

                </Form>
                
                </div>  
            )}

         

        </Formik>






    );


}

export default Login;