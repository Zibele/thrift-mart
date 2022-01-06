import {Component} from "react";
import BuyButton from "components/buy-button/buy-button";

class ProductItem extends Component {
   
    render(){

        return (

            <article class="flex flex-col p-2 items-center w-48 bg-white">
              
              <img src={this.props.primaryImage} alt={this.props.title} class="h-64 w-44"/> 
              <h2 class="truncate w-44">{this.props.title}</h2>
              <div class="flex flex-col w-full">
                  <a class="text-xs text-blue-600" href="#home">  {this.props.brand}   </a>
                  <h1 class="text-lg"> R {this.props.price}</h1>
               </div>   
              <BuyButton></BuyButton>
              
              
            </article>

        );
    }


}

export default ProductItem;