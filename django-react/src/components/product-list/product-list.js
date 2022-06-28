
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
    
    const productList = useSelector((state)=>state.productList.items)

    const dispatch = useDispatch();
    

    useEffect(()=>{

        getProductList();

    },[]);
    

    const getProductList = useCallback(() =>{
    
        axios
            .get("api/products")
            .then((res)=>dispatch(setProductList(res.data)))
            .catch((err)=>console.log(err));
    
    },[])


    const filterProductList = useCallback((productFilters) => {
        let ordering = productFilters.ordering;
       
        ordering = typeof ordering === "object" ? ordering : orderFilters.find(order=>order.value === ordering);
        console.log(ordering);
        let filters = {brand: productFilters.brand && productFilters.brand !=='0' ? productFilters.brand : '',
                       colour: productFilters.colour && productFilters.colour !=='0'? productFilters.colour : '',
                       size: productFilters.size && productFilters.size !=='0'? productFilters.size : '',
                       min_price:productFilters.minPrice? productFilters.minPrice:'',
                       max_price:productFilters.maxPrice? productFilters.maxPrice:'',
                       ordering: ordering? ordering.value:'-date_posted',
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

        ordering = typeof ordering === "object" ? ordering : orderFilters.find(order=>order.value === ordering);
        
        let filter = productFilters;

        filter.ordering = ordering;
    
        setProductFilters(filter);

        filterProductList({...productFilters,ordering:ordering});


    },[productFilters]);


    const updateProductFilters = useCallback((productFilters) => {
        setProductFilters(productFilters);
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

                        <ShoppingCart  />

                    </div> 
                   );

        }
        else if(productList.length > 0){
          
            filter= (<ProductFilter productQty={productList.length} filterProductList={filterProductList} updateProductFilters={updateProductFilters} productFilters={productFilters} orderFilters={orderFilters} orderSelectChange={orderSelectChange}/>);

        }


        return filter;
    },[context,productFilters,orderFilters,productList.length]);

    
    
    const items = productList.map((item) => {

        let brandName = item.brand != null ? item.brand['brand'] : "None" 
            
        return  <ProductItem 
                key = {item.id}
                id = {item.id}
                title = {item.title}
                price = {item.price}
                primaryImage = {item.primary_image}
                secondaryImage = {item.secondary_image}
                brand = {brandName}
                inCatalog = {true}
                
            />    
        }
        );

        console.log(items);

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