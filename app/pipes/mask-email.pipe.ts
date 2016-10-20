import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maskEmail'
})
export class MaskEmailPipe implements PipeTransform {
    transform(value: string): string {
        let garbage = value.substr(value.indexOf(' <'), value.indexOf('>'));
        // some emails (those sent from this app) does not have User's full name, so email address should be presented
        if (garbage) {
            return value.slice(0, value.indexOf(garbage));
        } else {
            return value;
        }
    }
}