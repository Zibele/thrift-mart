
import axios from "axios";
import {useEffect, useState,useContext,useCallback} from "react";
import ScreenContext from "helpers/Screen";
import ProductItem from "components/product-item/product-item";
import ProductFilter from "components/product-filter/product-filter";
import Select from "react-select";
import OrderByModal from "components/order-by-modal/order-by-modal";
import ProductFilterModal from "components/product-filter-modal/product-filter-modal";
import ShoppingCart from "components/shopping-cart/shopping-cart";
import {useSelector,useDispatch} from "react-redux";
import { setProductList } from "components/product-list/product-list-slice";


const ProductList = (props) =>{

    const context = useContext(ScreenContext);

    const [categoryItems,setCategoryItems] = useState([]);
    const [orderFilters,setOrderFilters] = useState([{value:'-date_posted',label:'Latest',},{value:'price',label:'Lowest Price',},{value:'-price',label:'Highest Price',}]);
    const [productFilters,setProductFilters] = useState({brand:'0',colour:'0',size:'0',minPrice:'0',maxPrice:'2000',ordering:{value:'-date_posted',label:'Latest'}});
    
    const cart = useSelector((state)=>state.shoppingCart.cart);
    const productList = useSelector((state)=>state.productList.items)

    const dispatch = useDispatch();
    
    const [shoppingCart,setShoppingCart] = useState(cart||[]);
    
    useEffect(()=>{

        getProductList();

    },[]);
    

    const getProductList = useCallback(() =>{
    
        axios
            .get("api/products")
            .then((res)=>dispatch(setProductList(res.data)))
            .catch((err)=>console.log(err));
    
    },[])


    const filterProductList = useCallback((brand,colour,size,minPrice,maxPrice,ordering) => {

        let order = ordering.value || ordering;


        let filters = {brand: brand && brand !=='0' ? brand : '',
                       colour: colour && colour !=='0'? colour : '',
                       size: size && size !=='0'? size : '',
                       min_price:minPrice? minPrice:'',
                       max_price:maxPrice? maxPrice:'',
                       ordering: order? order:'-date_posted',
                    }

        
        const params = new URLSearchParams(filters);
        console.log(`api/products?${params}`);
        axios
            .get(`api/products?${params}`)
            .then((res)=>dispatch(setProductList(res.data)))
            .catch((err)=>console.log(err));

        
    },[]);


    const displayListTopBar = useCallback(() => {

        let topBar;

        if((context.isExtraLargeScreen || context.isLargeScreen) && !context.isMediumScreen){
            
            topBar = (
                    <div className="flex flex-row justify-between items-baseline  w-full py-4 px-2 lg:col-span-4 xl:col-span-6 ">
                        
                        <span>{productList.length} Results</span>
                        <div className="w-64">    
                            <Select placeholder="Order by" options={orderFilters} value={productFilters.ordering} onChange={orderSelectChange}/>
                        </div>

                    </div>

                    
                );
        }

        return topBar;

    },[context,productList.length,productFilters.ordering])



    const orderSelectChange = useCallback((ordering) => {

        console.log(`Ordering: ${ordering}`);
        ordering = typeof ordering === "object" ? ordering : orderFilters.find(order=>order.value === ordering);
        
        let filter = productFilters;

        filter.ordering = ordering;
    
        setProductFilters(filter);

        filterProductList(productFilters.brand,productFilters.colour,productFilters.size,productFilters.minPrice,productFilters.maxPrice,ordering)


    },[productFilters]);


    const updateProductFilters = useCallback((brand,colour,size,minPrice,maxPrice,ordering) => {
        setProductFilters({brand:brand,colour:colour,size:size,minPrice:minPrice,maxPrice:maxPrice,ordering:ordering});
    },[]);

    const displayItemQty = useCallback(() => {

        let itemQty;

        if(context.isMediumScreen){
            
            itemQty = (
                    <span className="flex flex-row p-4 justify-center shadow-inner w-full text-md text-gray-400 bg-gray-100">
                        {productList.length} Results
                    </span>
                );
        }

        return itemQty;

    },[context,productList.length]);

    const displayFilter = useCallback(() =>{

        let filter;

        if(context.isMediumScreen && !context.isLargeScreen){
           
            filter=(
                     <div className="flex flex-row w-full justify-center space-x-1 lg:space-x-4 py-4 md:col-span-3">

                        <OrderByModal orderFilters = {orderFilters} updateProductFilters = {updateProductFilters} productFilters = {productFilters} orderSelectChange={orderSelectChange}/>

                        <ProductFilterModal productQty={productList.length} filterProductList={filterProductList} updateProductFilters={updateProductFilters} productFilters={productFilters} orderFilters={orderFilters} orderSelectChange={orderSelectChange}/>

                        <ShoppingCart shoppingCart={shoppingCart} removeFromCart={removeFromCart} />

                    </div> 
                   );

        }
        else{
          
            filter= (<ProductFilter productQty={productList.length} filterProductList={filterProductList} updateProductFilters={updateProductFilters} productFilters={productFilters} orderFilters={orderFilters} orderSelectChange={orderSelectChange}/>);

        }


        return filter;
    },[context,productFilters,orderFilters,productList.length]);

    const addToCart = useCallback((itemID) => {

        let cart = shoppingCart;
         
        let itemToAdd = productList.find(product=>product.id===itemID);
 
        itemToAdd && cart.push(itemToAdd) && setShoppingCart(cart);
 
     },[]);
 
    const removeFromCart = useCallback((itemID) => {
 
         console.log(`Id ${itemID}`);
 
         let cart = shoppingCart.filter(item=>item.id !== itemID);
 
         setShoppingCart(cart);
 
     },[]);

    
    const items = productList.map((item) => {

        let brandName = item.brand != null ? item.brand['brand'] : "None" 
            
        return  <ProductItem 
                id = {item.id}
                title = {item.title}
                price = {item.price}
                primaryImage = {item.primary_image}
                secondaryImage = {item.secondary_image}
                brand = {brandName}
                addToCart = {addToCart}
            />    
        }
        );

        return (
            <>
                <div className="flex flex-col justify-center lg:flex-row w-full lg:grid lg:grid-cols-11 lg:px-4 bg-white">
                    
                        <div className="flex flex-col w-full lg:pt-4 lg:col-span-2 ">

                            {displayFilter()}
                            {displayItemQty()}

                        </div>

                        <div className="flex flex-col w-full lg:col-span-9 bg-white">
                            <div className ="flex flex-row justify-center ">
                                <div class = "flex flex-row justify-center flex-wrap lg:grid lg:grid-cols-4 xl:grid-cols-6">
                                    {displayListTopBar()}
                                    {items}
                            
                                </div>
                            </div>
                           
                        </div>
                    
                </div>
            </>
        );


    }


export default ProductList;