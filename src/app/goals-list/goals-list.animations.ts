import { animate, state, style, transition, trigger } from '@angular/core';

export const GoalsListAnimations: any = [
	trigger('goalsListState', [
		state('loading', style({ transform: 'translateY(1.5em)', opacity: 0 })),
		state('loaded', style({ transform: 'translateY(0)', opacity: 1 })),
		transition('loading <=> loaded', animate('.5s ease-in-out'))
	]),
	trigger('goalState', [
		state('loaded', style({ transform: 'translateY(1em)', opacity: 1 })),
		transition('void => *', animate('.5s ease-in-out'))
	])
];
