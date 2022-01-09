
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
                <div className="flex flex-col lg:flex-row py-2 lg:px-6 w-full lg:gap-6 lg:grid lg:grid-cols-6 bg-white">
                    
                        <div className="flex flex-col w-full lg:pt-4 space-y-1 lg:col-span-1">
                            
                            <Filter/>
                            
                            {this.displayItemQty()}

                        </div>

                        <div className="flex flex-col justify-center w-full lg:col-span-5 lg:px-2">
                            <div className="flex flex-row justify-between w-auto px-20">
                                
                        
                                <div className="w-64">    
                                    <Select options={this.state.productTypes}/>
                                </div>
                            </div>
                            <div className ="flex flex-row justify-center w-full">
                                <div class = "flex flex-row justify-center flex-wrap lg:grid lg:grid-cols-5 lg:gap-1  ">
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


    displayItemQty = () => {

        let itemQty;

        if(this.context.isTabletOrMobile){
            console.log("Trying to display itemQty")
            itemQty = (
                    <span className="flex flex-row p-4 justify-center w-full bg-gray-100">
                        {this.state.productItems.length} Results
                    </span>
                );
        }

        return itemQty;

    }
    

}



export default ProductList;