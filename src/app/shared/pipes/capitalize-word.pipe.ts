import {Pipe} from '@angular/core';
import {PipeTransform} from '@angular/core';

@Pipe({name: 'capitalizeWord'})
export class CapitalizeWordPipe implements PipeTransform {

    transform(value:any) {
        if (value) {
            let tokens = value.split(' ');
            let capsString = '';
            for(let token of tokens){
                capsString = `${capsString} ${token.charAt(0).toUpperCase() + token.slice(1)}`;
            }
            return capsString.trim();
        }
        return value;
    }

}