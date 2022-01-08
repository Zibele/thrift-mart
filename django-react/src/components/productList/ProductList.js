
import axios from "axios";
import {Component} from "react";
import ProductItem from "components/productItem/ProductItem";
import Filter from "components/filter/Filter";
import Select from "react-select";

class ProductList extends Component{

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
                <div className="flex flex-col lg:flex-row py-2 lg:px-6 bg-white">
                    <div className="lg:pt-4 lg:w-64 basis-1/4">
                        <Filter/>
                    </div>    
                    <div className="flex flex-col basis-1/2 lg:px-6">
                        <div className="flex flex-row justify-between w-auto py-2 px-12">
                            
                            <span className="px-2 py-4"> {this.state.productItems.length} items found </span>
                            <div className="w-64">    
                                <Select options={this.state.productTypes}/>
                            </div>
                        </div>
                        <div class = "flex flex-row flex-wrap justify-center w-auto ">
                            {items}
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

    

}



export default ProductList;