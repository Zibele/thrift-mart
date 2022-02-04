import {useDispatch,useSelector} from 'react-redux';
import {useCallback} from 'react';
import {addItemToCart} from "components/shopping-cart/shopping-cart-slice";

const BuyButton = (props) => {

    const productList = useSelector((state)=>state.productList.items);

    const dispatch = useDispatch();

    const addToCart = useCallback(() => {

        let itemToAdd = productList.find(product=>product.id===props.id);
 
        itemToAdd && dispatch(addItemToCart(itemToAdd));
 
     },[productList.length]);
    
    
    return (
            
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 w-40 border-2 border-blue-500" onClick={addToCart}> Add to cart </button>
            
        );  

}

export default BuyButton;