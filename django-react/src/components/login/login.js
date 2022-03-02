
import {React,useCallback} from "react";
import {Formik,Field,Form} from "formik";
import {FormLabel,FormControl,Input,FormErrorMessage,Button,InputGroup,InputRightElement } from "@chakra-ui/react";
import {useDispatch,useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect,useState} from "react";
import { setToken,setIsAuthenticated } from "./authentication-slice";
import axios from "axios";


const Login = (props) => {
    const [show,setShow] = useState(false);
    let token = useSelector((state)=>state.token);
    let isAuthenticated = useSelector((select)=>select.isAuthenticated);
    const navigate = useNavigate();
    let dispatch = useDispatch();
    
    const login = useCallback((credentials,actions)=>{
        
        let formData = new FormData();
        formData.append("username",credentials.username);
        formData.append("password",credentials.password);
        
        //authenticate(credentials);

        axios.post('api/dj-rest-auth/login/',
            formData
        ).then(function(response) {
            console.log('Successfully authenticated');
            isAuthenticated=true;
            dispatch(setToken(response.data));
            dispatch(setIsAuthenticated(true))
            
          }).catch(function(error) {
            console.log(error);
          })
          .finally(()=>{

            if(isAuthenticated){
                console.log("Is authenticated so redirecting to check out");

                

                return navigate("/checkout");
                
            }
            else{
                console.log("Can not redirect failed to login");
            }

            

          })

    })

    const authenticate = async (formData) => {

        try{
            const resp = await axios.post('api/dj-rest-auth/login/',formData);
            console.log(`Authenticated token ${resp.data}`);
            dispatch(setToken(resp.data));
            dispatch(setIsAuthenticated(true))
        }
        catch(err){

            console.log(err);

        }

    }


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

                    login(values,actions);

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
                                <InputGroup size="md">
                                    <Input {...field} pr="4.5rem" type= {show? 'text' : 'password'} id="password" placeholder="password"/>
                                    <InputRightElement width="4.5rem">
                                        <Button>{show ? "Hide" : "Show"}</Button>
                                    </InputRightElement>
                                </InputGroup>
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