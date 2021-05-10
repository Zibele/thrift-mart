import { Component, OnInit,OnDestroy } from '@angular/core';
import { Breakpoints,BreakpointState,BreakpointObserver} from '@angular/cdk/layout';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  isMobile : boolean = false;
  sub : Subscription = new Subscription();

  constructor(private breakpointObserver : BreakpointObserver) { }

  ngOnInit(): void {

    this.sub = this.breakpointObserver.
                observe([Breakpoints.Large,Breakpoints.XLarge]).
                subscribe( (state : BreakpointState) => {
                    if(state.breakpoints[Breakpoints.Large] || state.breakpoints[Breakpoints.XLarge]){
                        this.isMobile = false;
                        console.log("Is not mobile home");
                    }
                    else{
                        console.log("Is mobile home observer");
                        this.isMobile = true;
                    }
                });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
