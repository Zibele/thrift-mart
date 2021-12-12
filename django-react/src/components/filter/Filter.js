

import {Component} from "react";
import Select from "react-select";

class Filter extends Component {

    state = {
        priceMin: 0,
        priceMax: 500,
        category: 0
    }

    options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ];

    render(){

        return (

            <div class="flex w-full bg-gray-400">

                <button> Order by </button>
                <div class="w-72">    
                    <Select options={this.options} isMulti/>
                </div>
                

            </div>

        
        
        );

    }






}

export default Filter;