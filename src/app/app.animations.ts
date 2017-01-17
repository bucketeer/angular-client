import {animate, state, style, transition, trigger} from '@angular/core';

export const AppAnimations: any = [trigger('appState', [
  state('loading', style({opacity: 0})), state('loaded', style({opacity: 1})),
  transition('loading <=> loaded', animate('.5s ease-in-out'))
])];
