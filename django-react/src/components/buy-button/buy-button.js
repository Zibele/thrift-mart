import {Component} from "react";


class BuyButton extends Component {

    render(){
        return (
            
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 w-40 border-2 border-blue-500" onClick={()=>{this.props.addToCart(this.props.id)}}> Add to cart </button>
            
        );
    }

}

export default BuyButton;