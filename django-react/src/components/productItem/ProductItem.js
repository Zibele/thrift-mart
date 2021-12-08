import {Component} from "react";


class ProductItem extends Component {
   
    render(){

        return (

            <article>
              <h1>{this.props.title} R{this.props.price}</h1>
              <img src={this.props.image} alt={this.props.title} class="h-72 w-72"/> 
            </article>

        );
    }


}

export default ProductItem;