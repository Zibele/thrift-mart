
import {React,useCallback} from "react";
import {Formik,Field,Form} from "formik";
import { FormLabel,FormControl,Input,FormErrorMessage,Button } from "@chakra-ui/react";
import { useDispatch,useEffect,useSelector } from "react-redux";
import { setToken } from "./authentication-slice";
import axios from "axios";


const Login = (props) => {

    let token = useSelector((state)=>state.token);

    let dispatch = useDispatch();
    
    const login = useCallback((credentials)=>{
        const params = new URLSearchParams(credentials);


        /*axios.post('api/dj-rest-auth/login', {
            withCredentials: true,
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          },{
            auth: {
              username: credentials.username,
              password: credentials.password
          }}).then(function(response) {
            console.log('Authenticated');
          }).catch(function(error) {
            console.log(error);
          });*/



        axios
            .post(`api/dj-rest-auth/login`)
            .then(res=>{
                console.log(res);
                token = res.data;
                dispatch(setToken(res.data));
            })
            .catch(err=>console.log(err));

    })


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
            initialValues={{username:'',password:''}}
            onSubmit={(values,actions)=>{
                
                setTimeout(()=>{

                    login(values);
                    
                    actions.setSubmitting(false);
                   

                },1000);
            }}
        >
            
            {(props)=>(
                <div className="grid grid-cols-10 lg:grid-cols-10 py-8 ">
                <Form className="col-start-2 col-span-8 p-4 md:col-start-4 md:col-span-4 border-2 lg:col-start-5 lg:col-span-2 ">

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