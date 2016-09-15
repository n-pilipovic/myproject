import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { Auth } from '../services/auth.service';

import { Hero } from '../models/hero';
import { MailService } from '../services/mail.service';

@Component({
    moduleId: module.id,
    selector: 'mail-inbox',
    templateUrl: 'mail-inbox.template.html',
    // styleUrls: [ 'app.styles.css' ],
    providers: [ MailService ]
})
export class MailInboxComponent {
    title = 'My web mail';
    selectedHero: Hero;
    mails: Array<Object>;
    errorMessage: any;

    constructor(private mailService: MailService) {
        this.mails = new Array<Object>();
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    getMails() {
        this.mailService.getAllMails().subscribe(data => this.mails = data);
    }
 }