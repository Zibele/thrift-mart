import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  private _menuToggle : boolean;
  private readonly _LARGE_SCREEN : number = 1024;
  public mobile : boolean;

  constructor(public mediaMatcher : MediaMatcher) { 
  
    this._menuToggle = false
    
    this.mobile = false;
  }

  
  ngOnInit(): void {
  
  }

  public get isToggled() {
    return this._menuToggle;
  }

  public toggle(){
    this._menuToggle ? this._menuToggle = false : this._menuToggle = true;
  }

  @HostListener("window:resize",[])
  public onResize(){
    this.mobile=window.screen.width < this._LARGE_SCREEN;
  }

  

}
