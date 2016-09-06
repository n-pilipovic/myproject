import { Component, Input } from '@angular/core';

import { Hero } from '../models/hero';

@Component({
    moduleId: module.id,
    selector: 'my-mail-detail',
    templateUrl: 'mail-detail.template.html'
})
export class MailDetailComponent {
    @Input()
    hero: Hero;
}