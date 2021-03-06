import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ImageUploadModule } from 'angular2-image-upload';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GoalsListComponent } from './goals-list/goals-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GoalComponent } from './goal/goal.component';
import { NewGoalComponent } from './new-goal/new-goal.component';

import { GoalsService } from './shared/services/goals.service';
import { UsersService } from './shared/services/users.service';

import { CapitalizeWordPipe } from './shared/pipes/capitalize-word.pipe';
import { AppRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    ImageUploadModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    GoalsListComponent,
    UsersListComponent,
    SignupComponent,
    SigninComponent,
    UserProfileComponent,
    GoalComponent,
    NewGoalComponent,
    CapitalizeWordPipe
  ],
  providers: [
    GoalsService,
    UsersService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
