
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

        const items = this.state.productItems.map((item) =>

            <ProductItem 
                id = {item.id}
                title = {item.title}
                price = {item.price}
                image = {item.image}
            />    
        )

        return (
            <>
                <Filter/>
                <div class = "flex flex-col items-center lg:flex-row p-4 bg-red-400">
                    {items}
                </div>
            </>
        );
    }


    componentDidMount(){

        this.getProductList();
        this.getProductCategories();
        
    }
    
    
    getProductList(){
    
        axios
            .get("api/products")
            .then((res)=>this.setState({productItems:res.data}))
            .catch((err)=>console.log(err));
    
    }

    getProductCategories(){
        axios
            .get("api/categories")
            .then((res)=>this.setState({categoryItems:res.data}))
            .catch((err)=>console.log(err));
            
    }

}



export default ProductList;