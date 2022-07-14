import {Component,useState,useEffect,useCallback,memo} from "react";
import BuyButton from "components/buy-button/buy-button";
import {Select} from "@chakra-ui/react";
import {useSelector,useDispatch} from 'react-redux';
import {removeItemFromCart,deductTotalPrice} from 'components/shopping-cart/shopping-cart-slice';

const ProductItem = (props) => {

    console.log("We are calling product item")

    const [quantityOptions,setQuantityOptions]=useState([]);
    
    const cart = useSelector((state)=>state.shoppingCart.cart);
    const dispatch = useDispatch();

    const [productItem,setProductItem] = useState('')
    

    const removeFromCart = useCallback(() => {
 
        let cartWithItemRemoved= cart.filter(item=>item.id !== props.id);

        dispatch(removeItemFromCart(cartWithItemRemoved));
        
        const itemPrice = parseInt(props.price);

        dispatch(deductTotalPrice(itemPrice));

    },[cart.length]);


    useEffect(() => {

        if(props.inModal){
            let quantityOptions = []
            
            for(let count = 1; count <= props.quantityInStock; count++ ){
                    quantityOptions.push({value:count.toString(),label:count.toString()});
            }

            let options = quantityOptions.map(item => 

                <option value={item.value}>
                        {item.label}
                </option>
                        
            );

            setQuantityOptions(options);

        }



        let displayProductItem;

        if(props.inModal){
    
             displayProductItem=( 
                
                            <article class="flex w-full h-full border-b-2 border-t-2 p-2">
                                    
                                <img src={props.primaryImage} alt={props.title} class="h-40 w-40"/> 
                                    
                                    
                                <div class="px-2 flex flex-col space-y-1">
    
                                    <h2 class="text-sm">{props.title}</h2>
                                    <a class="text-xs text-blue-600" href="#home">  {props.brand}   </a>
                                    <h1 class="text-lg text-"> R {props.price}</h1>
    
                                    <div class="flex justify-between w-full">
    
                                        <div class="flex">
    
                                            <h2 class="text-sm pt-0.5">Qty:</h2>
                                            <div className="w-12">
    
                                                <Select variant="filled" size="xs">
                                                    {quantityOptions}
                                                </Select>
    
                                            </div>
                                        </div>
    
                                        <button onClick={removeFromCart}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>    
    
    
                                    </div>
                                </div>
                            </article>
                            );


        }
     
    
        else if(props.inCatalog){
    
                displayProductItem = 
    
                            (<article class="flex flex-col border-transparent border-2 hover:border-gray-300 py-2 items-center w-44 bg-white">
                            
                                <img src={props.primaryImage} alt={props.title} class="h-60 w-40"/> 
                                <h2 class="truncate w-40">{props.title}</h2>
                                <div class="flex flex-col px-2 w-full">
                                    <a class="text-xs text-blue-600" href="#home">  {props.brand}   </a>
                                    <h1 class="text-lg"> R {props.price}</h1>
                                </div>
    
                                <BuyButton id={props.id}></BuyButton>
                            
                                </article>
                            ); 
    
        }
    
        else{
            displayProductItem = ( 
                    
                <article class="flex p-2 justify-center bg-white">
                            
                    <img src={props.primaryImage} alt={props.title} class="h-30 w-20"/> 
                    
                    <div class="flex flex-col px-2 w-full">
                        <h2 class="truncate w-40">{props.title}</h2>
                        <h1 class="text-gray-400"> Qty: {props.quantity}</h1>
                        <h1 class="text-lg"> R {props.price}</h1>
                    </div>

    
                </article>
                    
                    
                    )
        }

        setProductItem(displayProductItem);


    },[]);

   

    return productItem;


    }


export default ProductItem;