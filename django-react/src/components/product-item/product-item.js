import {Component} from "react";
import BuyButton from "components/buy-button/buy-button";
import {Select} from "@chakra-ui/react";

class ProductItem extends Component {

    state = {
        quantityOptions: [],
    }

    componentDidMount(){

        if(this.props.inModal){
            let quantityOptions = []
            
            for(let count = 1; count <= this.props.quantityInStock; count++ ){
                    quantityOptions.push({value:count.toString(),label:count.toString()});
            }

            let options = quantityOptions.map(item => 

                <option value={item.value}>
                        {item.label}
                </option>
                        
            );

            this.setState({quantityOptions:options});

            

            console.log(quantityOptions)
        }
    }
   
    render(){


        let productItem;

        if(this.props.inModal){

            productItem=  ( 
            
                            <article class="flex w-full h-full border-b-2 border-t-2 p-2">
                                
                                <img src={this.props.primaryImage} alt={this.props.title} class="h-40 w-40"/> 
                                
                                
                                <div class="px-2 flex flex-col space-y-1">
                                    <h2 class="text-sm">{this.props.title}</h2>
                                    <a class="text-xs text-blue-600" href="#home">  {this.props.brand}   </a>
                                    <h1 class="text-lg text-"> R {this.props.price}</h1>
                                    <div class="flex justify-between w-full">
                                        <div class="flex">
                                            <h2 class="text-sm pt-0.5">Qty:</h2>
                                            <div className="w-12">

                                                <Select variant="filled" size="xs">

                                                    {this.state.quantityOptions}

                                                </Select>

                                            </div>
                                        </div>

                                        <button onClick={()=>{this.props.removeFromCart(this.props.id)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>    


                                    </div>
                                </div>


                                   
    
                            </article>

                            );

        }
        else{

            productItem = 

                        (<article class="flex flex-col border-transparent border-2 hover:border-gray-300 py-2 items-center w-44 bg-white">
                        
                        <img src={this.props.primaryImage} alt={this.props.title} class="h-60 w-40"/> 
                        <h2 class="truncate w-40">{this.props.title}</h2>
                        <div class="flex flex-col px-2 w-full">
                            <a class="text-xs text-blue-600" href="#home">  {this.props.brand}   </a>
                            <h1 class="text-lg"> R {this.props.price}</h1>
                           
                        </div>

                        <BuyButton addToCart={this.props.addToCart} id={this.props.id}></BuyButton>
                        
                        
                    </article>)

        }

        return productItem;

    }

        
    }


export default ProductItem;