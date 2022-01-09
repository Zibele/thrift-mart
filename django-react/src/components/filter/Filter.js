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
            <div className="flex flex-col w-full lg:h-64 ">
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
       
        if(this.context.isTabletOrMobile){
            filter = (
                <div className="flex flex-row shadow-xl w-full justify-center bg-gray-50 space-x-4 p-4">

                    <button className="bg-gray-200 text-base font-medium text-gray-600 rounded w-32 py-2 px-4 "> Sort </button>

                    <button className="bg-gray-200 text-base font-medium text-gray-600 rounded w-32 py-2 px-4 " onClick = {this.togglePriceFilter}>Filter</button>

                    <button className="bg-gray-200 text-base font-medium text-gray-600 rounded  py-2 px-4 ">Cart</button>

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
     
        if((this.state.filterIsOpen && this.context.isTabletOrMobile)||!this.context.isTabletOrMobile){

            itemFilter = (<PriceFilter/>);

        }

        return itemFilter;
    }


}
 

export default Filter;