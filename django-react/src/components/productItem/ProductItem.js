import {Component} from "react";


class ProductItem extends Component {
   
    render(){

        return (

            <article class="flex flex-col w-72">
              
              <img src={this.props.image} alt={this.props.title} class="h-72 w-72"/> 
              <h2>{this.props.title}</h2>
              <div class ="flex justify-between bg-gray-400">
                  <h1> R{this.props.price}</h1>
                  <a href="#Home"> Buy </a>
              </div>    
              
            </article>

        );
    }


}

export default ProductItem;