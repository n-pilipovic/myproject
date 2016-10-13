import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maskEmail'
})
export class MaskEmailPipe implements PipeTransform {
    transform(value: string): string {
        return value.substring(0, value.indexOf(' <'));
    }
}