
import axios from "axios";
import {Component} from "react";
import ScreenContext from "helpers/Screen";
import ProductItem from "components/product-item/product-item";
import Filter from "components/product-filter/product-filter";
import Select from "react-select";


class ProductList extends Component{

    static contextType = ScreenContext;


    state = {
        productItems: [],
        categoryItems: [],
        orderTypes:[{value:'latest',label:'Latest',},{value:'lowest price',label:'Lowest Price',},{value:'highest price',label:'Highest Price',}],
        selectedOrderOption:null
    }

    render(){
      
        const items = this.state.productItems.map((item) => {
        
        let brandName = item.brand != null ? item.brand['brand'] : "None" 
            
        return  <ProductItem 
                id = {item.id}
                title = {item.title}
                price = {item.price}
                primaryImage = {item.primary_image}
                secondaryImage = {item.secondary_image}
                brand = {brandName}
            />    
        }
        )

        return (
            <>
                <div className="flex flex-col justify-center lg:flex-row w-full lg:grid lg:grid-cols-11 lg:px-4 bg-white">
                    
                        <div className="flex flex-col w-full lg:pt-4 lg:col-span-2 ">
                            
                            <Filter productQty={this.state.productItems.length} filterProductList={this.filterProductList}/>
                            
                            {this.displayItemQty()}

                        </div>

                        <div className="flex flex-col w-full lg:col-span-9 bg-white">
                           
                            
                            <div className ="flex flex-row justify-center ">
                                <div class = "flex flex-row justify-center flex-wrap lg:grid lg:grid-cols-4 xl:grid-cols-6">
                                    {this.displayListTopBar()}
                                    {items}
                            
                                </div>
                            </div>
                           
                        </div>
                    
                </div>
            </>
        );
    }


    componentDidMount(){

        this.getProductList();
       
    }
    
    
    getProductList(){
    
        axios
            .get("api/products")
            .then((res)=>this.setState({productItems:res.data}))
            .catch((err)=>console.log(err));
    
    }

    filterProductList = (brand,colour,size,minPrice,maxPrice) => {
        console.log(`Size ${size},Brand ${brand}, Colour ${colour}`);
        let filters = {brand: brand && brand !=='0' ? brand : '',
                       colour: colour && colour !=='0'? colour : '',
                       size: size && size !=='0'? size : '',
                       min_price:minPrice? minPrice:'',max_price:maxPrice? maxPrice:''}

        
        const params = new URLSearchParams(filters);
        console.log(`api/products?${params}`);
        axios
            .get(`api/products?${params}`)
            .then((res)=>this.setState({productItems:res.data}))
            .catch((err)=>console.log(err));

        
    }

   
    displayItemTypeSelect = () => {

        let typeSelect;

        typeSelect = (<div className="flex flex-row justify-between w-auto px-20">
                            <div className="w-64">    
                                <Select options={this.state.orderTypes}/>
                            </div>
                     </div>);

        return typeSelect              


    }


    displayListTopBar = () => {

        let topBar;

        if((this.context.isExtraLargeScreen || this.context.isLargeScreen) && !this.context.isMediumScreen){
            
            topBar = (
                    <div className="flex flex-row justify-between items-baseline shadow-inner w-full py-4 px-2 lg:col-span-4 xl:col-span-6 ">
                        
                        <span>{this.state.productItems.length} Results</span>
                        <div className="w-64">    
                            <Select placeholder="Order by" options={this.state.orderTypes} value={this.state.selectedOrderOption} onChange={this.orderSelectChange}/>
                        </div>

                    </div>

                    
                );
        }

        return topBar;

    }

    orderSelectChange = (selection) => {

    
        this.setState({selectedOrderOption:selection})

        this.sortProductList(selection)


    }

    sortProductList = (selection) =>{

       let productItems = this.state.productItems;
       console.log(selection.value);

       if(selection.value === "lowest price"){

            console.log("lowest price");

            productItems = productItems.sort((a,b)=>{
                return a.price - b.price;
            })

            console.log(productItems);
        }
        else if(selection.value === "highest price"){
            console.log("highest");
            productItems.sort((a,b)=>{
                return  b.price - a.price ;
            })

            console.log(productItems);
        }
        else{
            console.log("latest");
            productItems.sort((a,b)=>{
                return  new Date(b.date_posted) - new Date(a.date_posted);
            })

            console.log(productItems);

        }
        
        this.setState({productItems:productItems})

       }

         

    



    displayItemQty = () => {

        let itemQty;

        if(this.context.isMediumScreen){
            
            itemQty = (
                    <span className="flex flex-row p-4 justify-center shadow-inner w-full text-md text-gray-400 bg-gray-100">
                        {this.state.productItems.length} Results
                    </span>
                );
        }

        return itemQty;

    }
   


}



export default ProductList;