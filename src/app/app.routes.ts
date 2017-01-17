import { GoalsListComponent } from './goals-list/goals-list.component';

export const AppRoutes: any = [
  // {path: 'signup', component: LoginComponent},
  {path: 'home', component: GoalsListComponent},
  {path: '**', component: GoalsListComponent}
];
