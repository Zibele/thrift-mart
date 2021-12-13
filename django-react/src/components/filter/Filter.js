

import {Component} from "react";
import Select from "react-select";

class Filter extends Component {

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
                <button>Filter</button>

                

            </div>

        );

    }



    openFilter = () => {

        this.setState({filterIsOpen:true});

    }






}

export default Filter;