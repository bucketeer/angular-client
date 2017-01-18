import { animate, state, style, transition, trigger } from '@angular/core';

export const UsersListAnimations: any = [
	trigger('usersListState', [
		state('loading', style({ transform: 'translateY(1.5em)', opacity: 0 })),
		state('loaded', style({ transform: 'translateY(0)', opacity: 1 })),
		state('destroyed', style({ transform: 'translateY(1.5em)', opacity: 0 })),
		transition('loading <=> loaded', animate('.5s ease-in-out'))
	]),
	trigger('userState', [
		state('loaded', style({ transform: 'translateY(1em)', opacity: 1 })),
		state('clicked', style({ transform: 'translateY(0em)' })),
		transition('void <=> *', animate('.5s ease-in-out'))
	])
];
