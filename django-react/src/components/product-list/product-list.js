
import axios from "axios";
import {Component} from "react";
import ScreenContext from "helpers/Screen";
import ProductItem from "components/product-item/product-item";
import ProductFilter from "components/product-filter/product-filter";
import Select from "react-select";
import OrderByModal from "components/order-by-modal/order-by-modal";
import ProductFilterModal from "components/product-filter-modal/product-filter-modal";
import ShoppingCart from "components/shopping-cart/shopping-cart";

class ProductList extends Component{

    static contextType = ScreenContext;


    state = {
        productItems: [],
        categoryItems: [],
        orderFilters:[{value:'-date_posted',label:'Latest',},{value:'price',label:'Lowest Price',},{value:'-price',label:'Highest Price',}],
        productFilters:{brand:'0',colour:'0',size:'0',minPrice:'0',maxPrice:'2000',ordering:{value:'-date_posted',label:'Latest'}},
        shoppingCart: []
    }

    render(){
      
        const items = this.state.productItems.map((item) => {

        
        let brandName = item.brand != null ? item.brand['brand'] : "None" 
            
        return  <ProductItem 
                id = {item.id}
                title = {item.title}
                price = {item.price}
                primaryImage = {item.primary_image}
                secondaryImage = {item.secondary_image}
                brand = {brandName}
                addToCart = {this.addToCart}
            />    
        }
        )

        return (
            <>
                <div className="flex flex-col justify-center lg:flex-row w-full lg:grid lg:grid-cols-11 lg:px-4 bg-white">
                    
                        <div className="flex flex-col w-full lg:pt-4 lg:col-span-2 ">

                            {this.displayFilter()}
                            {this.displayItemQty()}

                        </div>

                        <div className="flex flex-col w-full lg:col-span-9 bg-white">
                            <div className ="flex flex-row justify-center ">
                                <div class = "flex flex-row justify-center flex-wrap lg:grid lg:grid-cols-4 xl:grid-cols-6">
                                    {this.displayListTopBar()}
                                    {items}
                            
                                </div>
                            </div>
                           
                        </div>
                    
                </div>
            </>
        );
    }


    componentDidMount(){

        this.getProductList();
       
    }
    
    
    getProductList(){
    
        axios
            .get("api/products")
            .then((res)=>this.setState({productItems:res.data}))
            .catch((err)=>console.log(err));
    
    }

    filterProductList = (brand,colour,size,minPrice,maxPrice,ordering) => {

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
            .then((res)=>this.setState({productItems:res.data}))
            .catch((err)=>console.log(err));

        
    }

   
    displayItemTypeSelect = () => {

        let typeSelect;

        typeSelect = (<div className="flex flex-row justify-between w-auto px-20">
                            <div className="w-64">    
                                <Select options={this.state.orderFilters}/>
                            </div>
                     </div>);

        return typeSelect              


    }


    displayListTopBar = () => {

        let topBar;

        if((this.context.isExtraLargeScreen || this.context.isLargeScreen) && !this.context.isMediumScreen){
            
            topBar = (
                    <div className="flex flex-row justify-between items-baseline  w-full py-4 px-2 lg:col-span-4 xl:col-span-6 ">
                        
                        <span>{this.state.productItems.length} Results</span>
                        <div className="w-64">    
                            <Select placeholder="Order by" options={this.state.orderFilters} value={this.state.productFilters.ordering} onChange={this.orderSelectChange}/>
                        </div>

                    </div>

                    
                );
        }

        return topBar;

    }

    orderSelectChange = (ordering) => {

        console.log(`Ordering: ${ordering}`);
        ordering = typeof ordering === "object" ? ordering : this.state.orderFilters.find(order=>order.value === ordering)
        
        let productFilters = this.state.productFilters;

        productFilters.ordering = ordering;
    
        this.setState({productFilters:productFilters});

        this.filterProductList(this.state.productFilters.brand,this.state.productFilters.colour,this.state.productFilters.size,this.state.productFilters.minPrice,this.state.productFilters.maxPrice,ordering)


    }

    updateProductFilters = (brand,colour,size,minPrice,maxPrice,ordering) => {
        this.setState({productFilters:{brand:brand,colour:colour,size:size,minPrice:minPrice,maxPrice:maxPrice,ordering:ordering}});
    }




    displayItemQty = () => {

        let itemQty;

        if(this.context.isMediumScreen){
            
            itemQty = (
                    <span className="flex flex-row p-4 justify-center shadow-inner w-full text-md text-gray-400 bg-gray-100">
                        {this.state.productItems.length} Results
                    </span>
                );
        }

        return itemQty;

    }

    displayFilter = () =>{

        let filter;

        if(this.context.isMediumScreen){
           
            filter=(
                     <div className="flex flex-row w-full justify-center space-x-1 lg:space-x-4 py-4 md:col-span-3">

                        <OrderByModal orderFilters = {this.state.orderFilters} updateProductFilters = {this.state.updateProductFilters} productFilters = {this.state.productFilters} orderSelectChange={this.orderSelectChange}/>

                        <ProductFilterModal productQty={this.state.productItems.length} filterProductList={this.filterProductList} updateProductFilters={this.updateProductFilters} productFilters={this.state.productFilters} orderFilters={this.state.orderFilters} orderSelectChange={this.orderSelectChange}/>

                        <ShoppingCart shoppingCart={this.state.shoppingCart} removeFromCart={this.removeFromCart} />

                    </div> 
                   );

        }
        else{

            filter= (<ProductFilter productQty={this.state.productItems.length} filterProductList={this.filterProductList} updateProductFilters={this.updateProductFilters} productFilters={this.state.productFilters} orderFilters={this.state.orderFilters} orderSelectChange={this.orderSelectChange}/>);

        }


        return filter;
    }


    addToCart = (itemID) => {



       let shoppingCart = this.state.shoppingCart;
        
       let itemToAdd = this.state.productItems.find(product=>product.id===itemID);

       
       itemToAdd && shoppingCart.push(itemToAdd) && this.setState({shoppingCart:shoppingCart});

    }

    removeFromCart = (itemID) => {

        console.log(`Id ${itemID}`);

        let shoppingCart = this.state.shoppingCart.filter(item=>item.id !== itemID);

        this.setState({shoppingCart:shoppingCart});

    }




   


}



export default ProductList;