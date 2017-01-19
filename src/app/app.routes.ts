import { NavbarComponent } from './navbar/navbar.component';
import { GoalsListComponent } from './goals-list/goals-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const AppRoutes: any = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'goals', component: GoalsListComponent },
  { path: '**', component: GoalsListComponent }
];
