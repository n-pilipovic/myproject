import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'today'
})
export class TodayPipe implements PipeTransform {
    transform(value: string): string {
        var dataDate = new Date(value);
        var date = new Date();
        date.setDate(date.getDate() - 1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        if (dataDate >= date) {
            value = dataDate.toLocaleString();
            return value.slice(value.indexOf(', ') + 2, value.length);
        } else {
            return value.slice(value.indexOf(', ') + 2, value.indexOf(', ') + 8);
        }
    }
}