

import React, {Component} from "react";


import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb
} from "@chakra-ui/react";


class PriceFilter extends Component {


    state = {
     
        selectedPrice:{
            min:0,
            max:2000
        },
        
    }

    render(){

        return (

            <div className = "flex flex-col pb-4">
                    <div className = "">
                        <RangeSlider aria-label={['min', 'max']} defaultValue={[this.props.minPrice,this.props.maxPrice]} step={25} min={this.props.minPrice} max={this.props.maxPrice} onChangeEnd = {(val) => this.updateSelectedPrices(val)}>
                            
                            <RangeSliderTrack>
                                    <RangeSliderFilledTrack/>
                            </RangeSliderTrack> 

                            <RangeSliderThumb index={0}/>

                            <RangeSliderThumb index={1}/>
                        
                        </RangeSlider>
                    </div>
                    <div className ="flex justify-between">
                        <strong>R{this.state.selectedPrice.min}</strong>
                        <strong>R{this.state.selectedPrice.max}</strong>
                    </div>

                </div>
           

        );

    }


    updateSelectedPrices = (val) => {
        console.log(val);
        const selectedPrice = {min:val[0],max:val[1]};
        this.setState({selectedPrice:selectedPrice});
        this.props.updatePrices(val[0],val[1]);
    }



}

export default PriceFilter;