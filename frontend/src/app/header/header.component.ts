import { Component,OnDestroy, OnInit,Input } from '@angular/core';
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  
   isMobile : Boolean = false;
  _menuToggle = false;;
  
  sub : Subscription;

  constructor(private breakpointObserver : BreakpointObserver) { 
    
    this._menuToggle = false;
    this.sub = new Subscription();
  
  }

  public get isToggled() {
    return this._menuToggle;
  }

  public toggle(){
    this._menuToggle ? this._menuToggle = false : this._menuToggle = true;
  }

  ngOnInit(): void {

     this.sub = this.breakpointObserver.observe([Breakpoints.Large,Breakpoints.XLarge])
                .subscribe( (state : BreakpointState) => {

                  if(state.breakpoints[Breakpoints.XLarge]||state.breakpoints[Breakpoints.Large]){
                    console.log("is not mobile(header)");
                    this.isMobile = false;
                  }
                  else{
                    console.log("Is mobile (header)");
                    this.isMobile = true;
                  }

                });

  }


  ngOnDestroy() : void {
      this.sub.unsubscribe();
  }
}
