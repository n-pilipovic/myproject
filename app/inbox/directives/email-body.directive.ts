import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[emailBody]'
})
export class EmailBodyDirective implements OnChanges {

    @Input('emailBody') emailBody: string;

    constructor(private element: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        this.element.nativeElement.innerHTML = this.emailBody;
    }
}