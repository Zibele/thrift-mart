import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private _menuToggle : boolean;

  constructor() { this._menuToggle = false}

  ngOnInit(): void {
    
  }

  public get isToggled() {
    return this._menuToggle;
  }

  public toggle(){
    this._menuToggle ? this._menuToggle = false : this._menuToggle = true;
  }

}
