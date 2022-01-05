import {Component} from "react";
import BuyButton from "components/buy-button/buy-button";

class ProductItem extends Component {
   
    render(){

        return (

            <article class="flex flex-col w-48 ">
              
              <img src={this.props.primaryImage} alt={this.props.title} class="h-64 w-44"/> 
              <h2 class="truncate w-44">{this.props.title}</h2>
              <h3 class="text-gray-200"> <bold class="text-sm">By</bold> {this.props.brand}</h3>
              <h1 class="text-lg"> R{this.props.price}</h1>
              <BuyButton></BuyButton>
              
              
            </article>

        );
    }


}

export default ProductItem;