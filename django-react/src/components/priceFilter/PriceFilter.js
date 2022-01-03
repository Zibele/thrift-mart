

import React, {Component} from "react";


import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb
} from "@chakra-ui/react";


class PriceFilter extends Component {


    state = {
        priceRange: {
            min:0,
            max:500
        },
        selectedPrice:{
            min:0,
            max:500
        },
        
    }

    render(){

        return (

            <div className = "flex flex-col px-4 pb-4">
                    <div className = "">
                        <RangeSlider aria-label={['min', 'max']} defaultValue={[0,500]} step={25} min={0} max={500} onChangeEnd = {(val) => this.updateSelectedPrices(val)}>
                            
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
    }



}

export default PriceFilter;