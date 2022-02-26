

import {useSelector} from 'react-redux';
import {useCallBack} from 'react';
import ProductItem from 'components/check-out/check-out';

const Checkout = () => {

    const cart = useSelector((select)=>select.shoppingCart);
    const user = useSelector((select)=>select.user);

    const items = cart.map(item => <ProductItem id={item.id}/>)

    const displayCart = useCallBack(()=>{
        
        //displays shopping cart
        
        return (
            <>
            
                <div className="flex flex-col space-y-2">

                    {items}
                    
                </div>  

                <div className="flex flex-row space-x">
                       <span> {items.title} </span> 
                       <span> {items.totalPrice} </span> 
                       <span> {items.quantity} </span>
                </div>
            </> 
        )

        }
    
    )

}

export default Checkout;