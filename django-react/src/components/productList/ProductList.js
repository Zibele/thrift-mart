
import axios from "axios";
import {Component} from "react";
import ProductItem from "components/productItem/ProductItem";
import Filter from "components/filter/Filter";

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
                <div className="flex flex-col md:justify-between md:px-4 md:flex-row bg-white">
                    <Filter/>
                    <div class = "grid grid-cols-2 gap-2 w-full  items-center md:justify-center md:flex  md:flex-wrap md:py-0 md:flex-row ">
                        {items}
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