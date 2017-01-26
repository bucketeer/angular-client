import { animate, state, style, transition, trigger } from '@angular/core';

export const NavbarAnimations: any = [
	trigger('navState', [
		state('loading', style({ transform: 'translateY(-100%)' })),
		state('loaded', style({ transform: 'translateY(0)' })),
		transition('loading <=> loaded', animate('1s ease-in-out'))
	]),
	trigger('searchResultState', [
		state('empty', style({ display: 'none' })),
		state('results', style({ display: 'block' })),
		transition('empty <=> results', animate('.5s ease-in-out'))
	]),
	trigger('bannerState', [
		state('clicked', style({ display: 'none' })),
		state('signedin', style({ display: 'none' })),
		transition('* <=> clicked', animate('.5s ease-in-out'))
	])
];
