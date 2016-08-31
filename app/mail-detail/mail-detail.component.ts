import { Component, Input } from '@angular/core';

import { Hero } from '../models/hero';

@Component({
    selector: 'my-mail-detail',
    templateUrl: 'app/mail-detail/mail-detail.template.html'
})
export class MailDetailComponent {
    @Input()
    hero: Hero;
}