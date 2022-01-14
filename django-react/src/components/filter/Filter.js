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
        brands: [],
        colours: [],
        sizes: [],
        category: 0,
        displayOption:{brands:false,colours:false,sizes:false},
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
        this.getBrands();
        this.getColours();
        this.getSizes();

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

    getColours = () =>{

        axios.get("api/colours")
             .then(res => this.setState({colours:res.data}))
             .catch(err=>console.log(err));

    }

    getSizes = () => {

        axios.get("api/sizes")
             .then(res=>this.setState({sizes:res.data}))
             .catch(err=>console.log(err))

    }

    getBrands = () => {

        axios.get("api/brands")
             .then(res=>this.setState({sizes:res.data}))
             .catch(err=>console.log(err))

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
                    <div className="hidden">
                        <RadioGroup onChange={this.setRadioValue.bind(this,"radioValue")} value={this.state.radioValue}>

                            <Stack direction="column">
                                <Radio value='0'>All</Radio>
                                {this.state.productTypes.map(item=>(<Radio value={item.value.toString()}>{item.label}</Radio>))}
                            </Stack>

                        </RadioGroup>
                    </div>    

                    <button className="w-full flex flex-row" onClick={()=>this.toggleDisplayOption("brand")}>
                        
                        <span> Brand </span>

                        {this.showToggleIcon(this.state.displayOption.brands)}
                    
                    </button>
                    
                    <button className="w-full flex flex-row" onClick={()=>this.toggleDisplayOption("colour")}>
                        
                        <span> Colour </span>

                        {this.showToggleIcon(this.state.displayOption.colours)}
                        
                        
                    </button>

                    <button className="w-full flex flex-row" onClick={()=>this.toggleDisplayOption("size")}>
                        
                        <span> Size </span>

                        {this.showToggleIcon(this.state.displayOption.sizes)}
                        
                    </button> 
                    
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


    toggleDisplayOption = (option) => {

        switch(option){

            case "size":
                this.state.displayOption.sizes ? this.setState({displayOption:{sizes:false,colours:this.state.displayOption.colours,brands:this.state.displayOption.brands}}) : this.setState({displayOption:{sizes:true,colours:this.state.displayOption.colours,brands:this.state.displayOption.brands}});
                break;
            
            case "colour":
                this.state.displayOption.colours ? this.setState({displayOption:{colours:false,sizes:this.state.displayOption.sizes,brands:this.state.displayOption.brands}}) : this.setState({displayOption:{colours:true,sizes:this.state.displayOption.sizes,brands:this.state.displayOption.brands}});
                break;
            
            case "brand":
                this.state.displayOption.brands ? this.setState({displayOption:{brands:false,sizes:this.state.displayOption.sizes,colours:this.state.displayOption.colours}}) : this.setState({displayOption:{brands:true,sizes:this.state.displayOption.sizes,colours:this.state.displayOption.colours}});
                break;
            
            default:
                console.log(`Toggle option:${option}`)    

        }
       

        
    }

    showToggleIcon = (option) =>{
        
        return option ? 
                        (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                         </svg>)
                      :
                        (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>);  

    }

}
 

export default Filter;