import {Component} from "react";
import ScreenContext from "helpers/Screen";
import {Link} from 'react-router-dom';

class Header extends Component {

    static contextType = ScreenContext;

    state = {
        showHeaderMenu : false
    };


    render(){

        return (

            <header class ="bg-gray-300 w-full shadow-sm mb-0.5">

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

                    <button name="hide-header-menu" onClick={this.toggleHeaderMenu} class="w-8 h-8"> 
                
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg> 

                    </button> );
            }
            else{

                headerMenuButton = ( 

                    <button name="show-header-menu" onClick={this.toggleHeaderMenu} class="w-8 h-8"> 
                
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
          
           
           navButtons = (<ul  className="flex flex-col w-full space-y-4 items-center  py-3 lg:w-auto lg:flex-row lg:space-y-0 lg:space-x-4 lg:justify-center " id="nav-items">
                            
                            <li> <Link className="border-transparent border-b-4 pb-2 px-2 hover:border-green-300" to="/products"> Catalog    </Link> </li>
                            
                            <li> <Link className="border-transparent border-b-4 pb-2 px-2 hover:border-green-300" to="/Login"> Login     </Link> </li>

                            <li> <Link className="border-transparent border-b-4 pb-2 px-2 hover:border-green-300" to="/Register"> Sign up   </Link> </li>
                        </ul>);
        }

        return navButtons;

    }

    toggleHeaderMenu = (event) => {

        let btn = event.currentTarget;

        if(btn.name === "show-header-menu"){
            this.setState({showHeaderMenu:true});
        }
        else{
            this.setState({showHeaderMenu:false});
        }

    }

    showHeaderMenu = () => {

        this.setState({showHeaderMenu:true});

    }

    hideHeaderMenu = () => {
        this.setState({showHeaderMenu:false});
    }

}

export default Header;


