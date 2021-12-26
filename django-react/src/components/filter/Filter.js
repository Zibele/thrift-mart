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

    };

    options = [];

    radioValue = "Tops";


    render(){

        return (
            <div className="flex flex-col h-full">
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
                <div className="flex w-full justify-center bg-gray-400 space-x-4 p-4">
                    <button className=""> Order by </button>
                    <div className="w-64">    
                        <Select options={this.state.productTypes}/>
                    </div>
                    <button onClick = {this.togglePriceFilter}>Filter</button>
                </div>
                );
        }

        else{
            filter = (

                <div className="flex flex-col bg-gray-400">

                    <div className="p-4 divide-y divide-gray-200">Refine by</div>
                    
                    <RadioGroup onChange={this.setRadioValue} value={this.radioValue}>

                        <Stack direction="column">
                            {this.options.map(item=>(<Radio value={item}>{item}</Radio>))}
                        </Stack>

                    </RadioGroup>


                </div>




            )
        }
        return filter;
    }

    setRadioValue = (radioValue) =>{

        this.radioValue = radioValue;

    }
    renderPriceFilter = () => {

        let itemFilter;
     
        if(this.state.filterIsOpen && this.context.isTabletOrMobile){

            itemFilter = (<PriceFilter/>);

        }

        return itemFilter;
    }


}





export default Filter;