import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private _showMenu : boolean;

  constructor() { this._showMenu = false}

  ngOnInit(): void {
    
  }

  public get showMenu() {
    return this._showMenu;
  }

  public set showMenu(showMenu : boolean){
    this._showMenu=showMenu;
    console.log("Clicked")
  }

}
