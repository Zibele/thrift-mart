

import React, {Component} from "react";
import Select from "react-select";
import ScreenContext from "helpers/Screen";

class Filter extends Component {


    static contextType = ScreenContext;
    

    state = {
        priceMin: 0,
        priceMax: 500,
        category: 0,
        filterIsOpen: false,
    }

    options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ];

    render(){


        return (

            <div className="flex w-full justify-center bg-gray-400 space-x-4 p-4">

                <button className=""> Order by </button>
                <div className="w-64">    
                    <Select options={this.options}/>
                </div>
                <button onClick = {this.openFilter}>Filter</button>

                <div class="bg-white">{this.renderFilter()}</div>

            </div>

        );

    }


    renderFilter = () => {

        let itemFilter;
     
        if(this.state.filterIsOpen && this.context.isTabletOrMobile){

            itemFilter = (<h1>filter</h1>);

        }

        return itemFilter;
    }



    openFilter = () => {
        console.log("Opening filter");

        this.setState({filterIsOpen:true});

    }






}

export default Filter;