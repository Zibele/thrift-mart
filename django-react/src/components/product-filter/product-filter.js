import {Component} from "react";
import ScreenContext from "helpers/Screen";
import PriceFilter from "components/price-filter/price-filter";
import axios from "axios";

import {
        RadioGroup,
        Stack,
        Radio,
  
    }   from "@chakra-ui/react";

class ProductFilter extends Component {

    
    static contextType = ScreenContext;

    state = {
        productTypes: [],
        brands: [],
        colours: [],
        sizes: [],
        category: 0,
        displayOption:{brands:false,colours:false,sizes:false,prices:false},
        filterIsOpen: false,
        brandRadioValue: '0',
        colourRadioValue:'0',
        sizeRadioValue: '0',
      
    };


    render(){

        return (
            <div className="flex flex-col p-4 bg-gray-400 w-full">
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
             .then(res =>{
                let colours = []
                for(let colour of res.data){
                    colours.push({value:colour.id,label:colour.colour})
                }
                this.setState({colours:colours})
             }
             )
             .catch(err=>console.log(err));

    }

    getSizes = () => {

        axios.get("api/sizes")
             .then(res=>{
                    let sizes = []
                    for(let size of res.data){
                        sizes.push({value:size.id,label:size.size});
                    }
                    this.setState({sizes:sizes})
                }
                 )
             .catch(err=>console.log(err))

    }

    getBrands = () => {

        axios.get("api/brands")
             .then(res=>{
                    let brands = [];
                    
                    for(let brand of res.data){
                        
                        brands.push({value:brand.id,label:brand.brand})
                    }
                
                    this.setState({brands:brands})
                    }
                )    
             .catch(err=>console.log(err))

    }


    togglePriceFilter = () => {
        this.state.filterIsOpen ? this.setState({filterIsOpen:false}):this.setState({filterIsOpen:true});
    }    



    renderFilter = () => {
    
        let filter = (

                <div className="flex flex-col w-full">

                    <div className="pb-4 border-b-2 border-white ">Filter by</div>

                    {this.displayFilteredItems()}
                      

                    <button className="w-full flex flex-row justify-between border-t-2 border-b-2 mt-2" onClick={()=>this.toggleDisplayOption("brand")}>
                        
                        <span className="uppercase"> Brand </span>

                        {this.showToggleIcon(this.state.displayOption.brands)}

                    </button>

                    {this.renderRadioBtns(this.state.displayOption.brands,this.state.brands,"brandRadioValue",this.props.productFilters.brand,this.setBrandRadioValue)}


                    <button className="w-full flex flex-row justify-between border-t-2 border-b-2 mt-2" onClick={()=>this.toggleDisplayOption("colour")}>
                        
                        <span className="uppercase"> Colour </span>

                        {this.showToggleIcon(this.state.displayOption.colours)}
                        
                        
                    </button>

                    {this.renderRadioBtns(this.state.displayOption.colours,this.state.colours,"colourRadioValue",this.props.productFilters.colour,this.setColourRadioValue)}

                    <button className="w-full flex flex-row justify-between border-t-2 border-b-2 mt-2" onClick={()=>this.toggleDisplayOption("size")}>
                        
                        <span className="uppercase"> Size </span>

                        {this.showToggleIcon(this.state.displayOption.sizes)}
                        
                    </button> 

                    {this.renderRadioBtns(this.state.displayOption.sizes,this.state.sizes,"sizeRadioValue",this.props.productFilters.size,this.setSizeRadioValue)}

                    <button className="w-full flex flex-row justify-between border-b-2 border-t-2 mt-2" onClick={()=>this.toggleDisplayOption("price")}>
                        
                        <span className="uppercase"> Price </span>

                        {this.showToggleIcon(this.state.displayOption.prices)}
                        
                    </button> 
 
                </div>


            );
        
        return filter;
    }

    setBrandRadioValue = (value) =>{
     
        this.setState({brandRadioValue:value});
        this.props.updateProductFilters({...this.props.productFilters,brand:value});
        this.props.filterProductList({...this.props.productFilters,brand:value});
       
    }

    getBrandRadioValue  = () =>{
      
        return this.state.brandRadioValue
    }

    setColourRadioValue = (value) =>{

        this.setState({colourRadioValue:value});

        this.props.updateProductFilters({...this.props.productFilters,colour:value});

        this.props.filterProductList({...this.props.productFilters,colour:value});

    }

    setSizeRadioValue = (value) =>{

        this.setState({sizeRadioValue:value});

        this.props.updateProductFilters({...this.props.productFilters,size:value});

        this.props.filterProductList({...this.props.productFilters,size:value});
          
    }

    removeSizeFromFilter = () => {

        this.setState({sizeRadioValue:'0'})
        
    }


    renderPriceFilter = () => {

        let itemFilter;
     
        if(this.state.displayOption.prices){

            itemFilter = (<PriceFilter updatePrices={this.updatePrices} minPrice={this.props.productFilters.minPrice} maxPrice={this.props.productFilters.maxPrice}/>);

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

    updatePrices = (minPrice,maxPrice) =>{

        this.setState({minPrice:minPrice,maxPrice:maxPrice});

        this.props.updateProductFilters({...this.props.productFilters,minPrice:minPrice,maxPrice:maxPrice});

        this.props.filterProductList({...this.props.productFilters,minPrice:minPrice,maxPrice:maxPrice});
          
    }


    toggleDisplayOption = (option) => {

        switch(option){

            case "size":
                this.state.displayOption.sizes ? this.setState({displayOption:{sizes:false,colours:this.state.displayOption.colours,brands:this.state.displayOption.brands,prices:this.state.displayOption.prices}}) : this.setState({displayOption:{sizes:true,colours:this.state.displayOption.colours,brands:this.state.displayOption.brands,prices:this.state.displayOption.prices}});
                break;
            
            case "colour":
                this.state.displayOption.colours ? this.setState({displayOption:{colours:false,sizes:this.state.displayOption.sizes,brands:this.state.displayOption.brands,prices:this.state.displayOption.prices}}) : this.setState({displayOption:{colours:true,sizes:this.state.displayOption.sizes,brands:this.state.displayOption.brands,prices:this.state.displayOption.prices}});
                break;
            
            case "brand":
                this.state.displayOption.brands ? this.setState({displayOption:{brands:false,sizes:this.state.displayOption.sizes,colours:this.state.displayOption.colours,prices:this.state.displayOption.prices}}) : this.setState({displayOption:{brands:true,sizes:this.state.displayOption.sizes,colours:this.state.displayOption.colours,prices:this.state.displayOption.prices}});
                break;

            case "price":
                this.state.displayOption.prices ? this.setState({displayOption:{prices:false,brands:this.state.displayOption.brands,sizes:this.state.displayOption.sizes,colours:this.state.displayOption.colours}}) : this.setState({displayOption:{prices:true,brands:this.state.displayOption.brands,sizes:this.state.displayOption.sizes,colours:this.state.displayOption.colours}});
                break;


            
            default:
                console.log(`Toggle option:${option}`)    

        }
       

        
    }

    showToggleIcon = (option) =>{
        
        return option ? 
                        (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>)
                      :
                        (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>);  

    }

    displayFilteredItems = () => {
        let filteredItems;

        if(this.props.productFilters.brand !== "0" || this.props.productFilters.size !== "0" || this.props.productFilters.colour !== "0"){

            let brand = this.state.brands.find(elem => elem.value.toString() === this.props.productFilters.brand);
            let colour = this.state.colours.find(elem => elem.value.toString() === this.props.productFilters.colour);
            let size = this.state.sizes.find(elem => elem.value.toString() === this.props.productFilters.size);
            
             filteredItems = (
                                    <div className="flex flex-col">
                                        {console.log(`Brand:${this.props.productFilters.brand} Item quantity:${this.state.brands.length}, Colour:${this.props.productFilters.colour}, Size: ${this.props.productFilters.size}`)}
                                        
                                        {this.props.productFilters.brand !== "0" && (<span>Brand: {brand && brand.label} </span>)}
                                        {this.props.productFilters.colour !== "0" && (<span>Colour: {colour && colour.label}</span>)}
                                        {this.props.productFilters.size !== "0" && (<span>Size: {size && size.label}</span>)}
                                    </div>
                            )

        }

        return filteredItems;


    }
    renderRadioBtns = (canRender,items,radioValue,currentValue,setter) => {
        
        let radioButtons;
        if(canRender){
            
            radioButtons = (
                            <div className="w-full">

                                            <RadioGroup onChange={setter.bind(radioValue)} value={currentValue}>

                                                <Stack direction="column">  
                                                    <Radio value='0'>All</Radio>
                                                    {items.map(item=>(<Radio value={item.value.toString()}>{item.label}</Radio>))}
                                                </Stack>

                                            </RadioGroup>


                            </div>)

    }

    return radioButtons;

}

  
}

export default ProductFilter;