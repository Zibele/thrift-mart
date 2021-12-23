import {Component} from "react";
import ScreenContext from "helpers/Screen";
import Select from "react-select";
import PriceFilter from "components/priceFilter/PriceFilter";

class Filter extends Component {

    
    static contextType = ScreenContext;

    state = {

        category: 0,
        filterIsOpen: false,

    };

    options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ];


    render(){

        return (
            <div className="flex flex-col h-full">
                <div className="flex w-full justify-center bg-gray-400 space-x-4 p-4">

                    <button className=""> Order by </button>
                        <div className="w-64">    
                            <Select options={this.options}/>
                        </div>
                    <button onClick = {this.togglePriceFilter}>Filter</button>
                </div>
                {this.renderFilter()}
            </div>

        );

    }



    togglePriceFilter = () => {
        this.state.filterIsOpen ? this.setState({filterIsOpen:false}):this.setState({filterIsOpen:true});
    }    


    renderFilter = () => {

        let itemFilter;
     
        if(this.state.filterIsOpen && this.context.isTabletOrMobile){

            itemFilter = (<PriceFilter/>);

        }

        return itemFilter;
    }


}





export default Filter;