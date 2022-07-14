

import {useSelector,useDispatch} from 'react-redux';
import {useCallback, useEffect,useState,memo} from 'react';
import ProductItem from 'components/product-item/product-item';
import BuyButton from 'components/buy-button/buy-button';
import axios from 'axios';
import {setUser} from 'components/login/authentication-slice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    console.log("Is in checkout");
    const cart = useSelector((select)=>select.shoppingCart.cart);
    const user = useSelector((select)=>select.authentication.user);
    const token = useSelector((select)=>select.authentication.token);
    const isAuthenticated = useSelector((select)=>select.authentication.isAuthenticated);
    const productList = useSelector((select)=>select.productList.items)
    const [products,setProducts] = useState([]);
    const [count,setCount] = useState(0);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    console.log("Passed all initializers")

    //console.log(cart);

    useEffect(()=>{

        console.log(`Recall checkout count ${count}`);
        
        if(isAuthenticated && Object.keys(user).length === 0){
            axios.get("api/dj-rest-auth/user",
            
                {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Token ${token.key}`
                    },

                }
            
            ).then(resp => {
                console.log(resp.data)
                dispatch(setUser(resp.data));
            })
            .catch(err=>console.log(err))
            .finally(
                console.log(`We got a user ${user}`)
            )

        }
        else if(!isAuthenticated){
            console.log("Navigate to login");
            navigate("/login")
        }
        else{
            console.log("Is already logged in");
        }

       

        console.log("Completed everything")

        const items = cart.map((item)=> {
            console.log("running through items")
    
            let brandName = item.brand != null ? item.brand['brand'] : "None" 
            
            return  <ProductItem
                        key = {item.id}
                        id = {item.id}
                        title = {item.title}
                        price = {item.price}
                        primaryImage = {item.primary_image}
                        secondaryImage = {item.secondary_image}
                        brand = {brandName}
                     
                    />
            }
        
        )

        setProducts(items)
        setCount(count+1)
    
        
    },[])


   

 

    return (<>
                <div className="w-full grid grid-cols-6 items-center bg-gray-200 p-3">
                    <div className="bg-white col-span-3">
                        <div className="flex">
                            <span className="uppercase">Items for delivery</span>    
                        </div>
                        {products}
                    </div>    
                </div>
         
            </>);

}

export default Checkout;