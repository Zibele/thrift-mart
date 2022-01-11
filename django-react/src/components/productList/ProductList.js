
import axios from "axios";
import {Component} from "react";
import ScreenContext from "helpers/Screen";
import ProductItem from "components/productItem/ProductItem";
import Filter from "components/filter/Filter";
import Select from "react-select";

class ProductList extends Component{

    static contextType = ScreenContext;

    state = {
        productItems: [],
        categoryItems: []
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
                <div className="flex flex-col lg:flex-row w-full lg:gap-6 lg:grid lg:grid-cols-6 bg-white">
                    
                        <div className="flex flex-col w-full lg:pt-4 lg:col-span-1">
                            
                            <Filter productQty={this.state.productItems.length}/>
                            
                            {this.displayItemQty()}

                        </div>

                        <div className="flex flex-col justify-center w-full lg:col-span-5 ">
                           
                            {this.displayListTopBar()}
                            <div className ="flex flex-row justify-center w-full">
                                <div class = "flex flex-row justify-center flex-wrap lg:grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-1">
                                    
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

    displayItemTypeSelect = () => {

        let typeSelect;

        typeSelect = (<div className="flex flex-row justify-between w-auto px-20">
                            <div className="w-64">    
                                <Select options={this.state.productTypes}/>
                            </div>
                     </div>);

        return typeSelect              


    }


    displayListTopBar = () => {

        let topBar;

        if((this.context.isExtraLargeScreen || this.context.isLargeScreen) && !this.context.isMediumScreen){
            
            topBar = (
                    <div className="flex flex-row place-content-between items-baseline shadow-inner w-full py-4 px-28">
                        
                        <span>{this.state.productItems.length} Results</span>
                        <div className="w-64">    
                            <Select options={this.state.productTypes}/>
                        </div>

                    </div>

                    
                );
        }

        return topBar;

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
    

}



export default ProductList;