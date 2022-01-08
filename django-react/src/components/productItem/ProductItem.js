import {Component} from "react";
import BuyButton from "components/buy-button/buy-button";

class ProductItem extends Component {
   
    render(){

        return (

            <article class="flex flex-col py-2 items-center w-44 bg-white">
              
              <img src={this.props.primaryImage} alt={this.props.title} class="h-60 w-40"/> 
              <h2 class="truncate w-40">{this.props.title}</h2>
              <div class="flex flex-col px-2 w-full">
                  <a class="text-xs text-blue-600" href="#home">  {this.props.brand}   </a>
                  <h1 class="text-lg"> R {this.props.price}</h1>
               </div>   
              <BuyButton></BuyButton>
              
              
            </article>

        );
    }


}

export default ProductItem;