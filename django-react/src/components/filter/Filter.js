import {Component} from "react";
import ScreenContext from "helpers/Screen";
import Select from "react-select";
import PriceFilter from "components/priceFilter/PriceFilter";
import axios from "axios";
import {
        RadioGroup,
        Stack,
        Radio
    }   from "@chakra-ui/react";

class Filter extends Component {

    
    static contextType = ScreenContext;

    state = {
        productTypes: [],
        category: 0,
        filterIsOpen: false,
        radioValue: '0'
    };


    render(){

        return (
            <div className="flex flex-col bg-gray-400 w-full lg:h-64 ">
                {this.renderFilter()}
                {this.renderPriceFilter()}
            </div>
        );

    }

    componentDidMount(){

        this.getProductTypes();

    }


    getProductTypes = () => {

        axios
            .get("api/productTypes")
            .then(res=>{
                        let productTypes = [];
                        for(let item of res.data){           
                            productTypes.push({value:item.id, label:item.category});
                        }
                        this.setState({productTypes:productTypes});
                    })
            .catch(err=>console.log(err));

    }



    togglePriceFilter = () => {
        this.state.filterIsOpen ? this.setState({filterIsOpen:false}):this.setState({filterIsOpen:true});
    }    



    renderFilter = () => {
        
        let filter;
       
        if(this.context.isMediumScreen){
            filter = (
                 
                        <div className="flex flex-row w-full justify-center space-x-1 lg:space-x-4 py-4 md:col-span-3">

                            <button className="bg-gray-200 text-base font-medium text-gray-600 rounded w-32 py-1 px-2 "> Sort </button>

                            <button className="bg-gray-200 text-base font-medium text-gray-600 rounded w-32 py-1 px-2 " onClick = {this.togglePriceFilter}>Filter</button>

                            <button className="bg-gray-200 text-base font-medium text-gray-600 rounded  py-1 px-2 ">Cart</button>

                        </div>
                  
                );
        }

        else{
            filter = (

                <div className="flex flex-col w-full p-4">

                    <div className="pb-4">Refine by</div>
                    
                    <RadioGroup onChange={this.setRadioValue.bind(this,"radioValue")} value={this.state.radioValue}>

                        <Stack direction="column">
                            <Radio value='0'>All</Radio>
                            {this.state.productTypes.map(item=>(<Radio value={item.value.toString()}>{item.label}</Radio>))}
                        </Stack>

                    </RadioGroup>


                </div>


            )
        }
        return filter;
    }

    setRadioValue = (name,value) =>{

        console.log(`Trying to change ${name} for ${value}`);

        this.setState({radioValue:value});
        
        
    }
    renderPriceFilter = () => {

        let itemFilter;
     
        if((this.state.filterIsOpen && this.context.isMediumScreen)||!this.context.isMediumScreen){

            itemFilter = (<PriceFilter/>);

        }

        return itemFilter;
    }

    displayProductCount = () => {

        let productCount;
        
        if(this.context.isMediumScreen && !this.context.isExtraSmallScreen){

            productCount = (
                            
                                <span className="w-full mt-6 bg-blue-black">{this.props.productQty || 0} Items found </span>
                                
    
                        );
        }

        return productCount;

}

}
 

export default Filter;