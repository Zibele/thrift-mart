import {Component} from "react";
import ScreenContext from "helpers/Screen";

class Header extends Component {

    static contextType = ScreenContext;

    state = {
        showHeaderMenu : false
    };


    render(){



        return (

            <header class ="bg-gray-300 w-full">

                <nav class="flex w-full px-2 py-4 lg:px-4 flex-wrap items-center">

                    <span class = ""> Logo </span>

                    <div class = "flex-grow"></div>
                        
                     {this.renderHeaderMenuButton()}  

                     {this.renderNavButtons()}
                
                </nav>
            </header>

            );

    }


    renderHeaderMenuButton = () => {
        let headerMenuButton;
        if(this.context.isMediumScreen || this.context.isSmallScreen){
            if(this.state.showHeaderMenu) {

                headerMenuButton = ( 

                    <button onClick={this.hideHeaderMenu} class="w-8 h-8"> 
                
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg> 

                    </button> );
            }
            else{

                headerMenuButton = ( 

                    <button onClick={this.showHeaderMenu} class="w-8 h-8"> 
                
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                        
                    </button> );
            }
        } 

        return headerMenuButton;
    }
    renderNavButtons = () => {

        let navButtons;

        if((!this.context.isMediumScreen) || (this.context.isMediumScreen && this.state.showHeaderMenu)){
          
           
           navButtons = (<ul  class="flex flex-col w-full space-y-4 items-center bg-gray-200 py-3 lg:w-auto lg:bg-gray-300  lg:flex-row lg:space-y-0 lg:space-x-4 lg:justify-center " id="nav-items">
            
                            <li> <a class=" border-transparent border-b-4 pb-2 px-2 hover:border-green-300" href="#About"> About      </a> </li>
                            
                            <li> <a class="border-transparent border-b-4 pb-2 px-2 hover:border-green-300" href="#Catalog"> Catalog    </a> </li>
                            
                            <li> <a class="border-transparent border-b-4 pb-2 px-2 hover:border-green-300" href="#Login"> Login     </a> </li>

                            <li> <a class="border-transparent border-b-4 pb-2 px-2 hover:border-green-300" href="#SignUp"> Sign up   </a> </li>
                        </ul>);
        }

        return navButtons;

    }


    showHeaderMenu = () => {

        this.setState({showHeaderMenu:true});

    }

    hideHeaderMenu = () => {
        this.setState({showHeaderMenu:false});
    }

}

export default Header;


