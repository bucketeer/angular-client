import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GoalsListComponent } from './goals-list/goals-list.component';

import { GoalsService } from './shared/services/goals.service';
import { AppRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    GoalsListComponent
  ],
  providers: [
    GoalsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
