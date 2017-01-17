import { Component, OnInit } from '@angular/core';

import { AppAnimations } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: AppAnimations
})
export class AppComponent implements OnInit {
  appState:String = 'loading';

  ngOnInit(): void {
    setTimeout(() => {
      this.appState = 'loaded';
    }, 500);
  }
}
