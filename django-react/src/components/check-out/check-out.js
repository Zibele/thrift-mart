

import {useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import ProductItem from 'components/check-out/check-out';
import axios from 'axios';

const Checkout = () => {

    const cart = useSelector((select)=>select.shoppingCart.cart);
    const user = useSelector((select)=>select.user);
    const token = useSelector((select)=>select.authentication.token);

    console.log(token);
    useEffect(()=>{

        


    },[user])


    const items = cart.map(item => {

        let brandName = item.brand != null ? item.brand['brand'] : "None" 
            
        return  <ProductItem 
                id = {item.id}
                title = {item.title}
                price = {item.price}
                primaryImage = {item.primary_image}
                secondaryImage = {item.secondary_image}
                brand = {brandName}
                
            />    
        }
    
    ) 


    return (<>
                
                <h1> In Check out</h1>

               

                       
            </>);

}

export default Checkout;