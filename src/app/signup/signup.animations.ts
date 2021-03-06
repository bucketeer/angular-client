import { animate, state, style, transition, trigger } from '@angular/core';

export const SignupAnimations: any = [
	trigger('signupState', [
		state('loading', style({ transform: 'translateY(1.5em)', opacity: 0 })),
		state('loaded', style({ transform: 'translateY(0)', opacity: 1 })),
		state('destroyed', style({ transform: 'translateY(1.5em)', opacity: 0 })),
		transition('loading <=> loaded', animate('.5s ease-in-out'))
	])
];
