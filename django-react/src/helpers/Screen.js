import React from "react";


const context = React.createContext({
    isSmallScreen:null,
    isExtraSmallScreen:null,
    isMediumScreen:null,
    isLargeScreen:null,
    isExtraLargeScreen:null,
});

export default context;