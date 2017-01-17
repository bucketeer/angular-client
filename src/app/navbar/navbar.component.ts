import { Component, OnInit } from '@angular/core';

import { NavbarAnimations } from './navbar.animations';

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  animations: NavbarAnimations
})
export class NavbarComponent implements OnInit {
  _navState: string = 'loading';

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this._navState = 'loaded';
    }, 500);
  }
}