
import axios from "axios";
import {Component} from "react";
import ScreenContext from "helpers/Screen";
import ProductItem from "components/product-item/product-item";
import ProductFilter from "components/product-filter/product-filter";
import Select from "react-select";
import OrderByModal from "components/order-by-modal/order-by-modal";
import ProductFilterModal from "components/product-filter-modal/product-filter-modal";

class ProductList extends Component{

    static contextType = ScreenContext;


    state = {
        productItems: [],
        categoryItems: [],
        orderFilters:[{value:'-date_posted',label:'Latest',},{value:'price',label:'Lowest Price',},{value:'-price',label:'Highest Price',}],
        productFilters:{brand:'0',colour:'0',size:'0',minPrice:'0',maxPrice:'2000',ordering:{value:'-date_posted',label:'Latest'}},
       
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

                        <OrderByModal orderFilters = {this.state.orderFilters} updateProductFilters = {this.state.updateProductFilters} productFilters = {this.state.productFilters} orderSelectChange={this.state.orderSelectChange}/>

                        <ProductFilterModal productQty={this.state.productItems.length} filterProductList={this.filterProductList} updateProductFilters={this.updateProductFilters} productFilters={this.state.productFilters} orderFilters={this.state.orderFilters} orderSelectChange={this.orderSelectChange}/>

                        <button className="bg-gray-200 text-base font-medium text-gray-600 rounded  py-1 px-2 ">Cart</button>

                    </div> 
                   );

        }
        else{

            filter= (<ProductFilter productQty={this.state.productItems.length} filterProductList={this.filterProductList} updateProductFilters={this.updateProductFilters} productFilters={this.state.productFilters} orderFilters={this.state.orderFilters} orderSelectChange={this.orderSelectChange}/>);

        }


        return filter;
    }
   


}



export default ProductList;