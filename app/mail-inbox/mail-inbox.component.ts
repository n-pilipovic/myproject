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
export class MailInboxComponent implements OnInit {
    title = 'My web mail';
    selectedHero: Hero;
    heroes: Observable<Object[]>;
    errorMessage: any;

    constructor(private mailService: MailService) {
        this.heroes = this.mailService.getAllMails();
    }

    ngOnInit() {
        // this.getHeroes();
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    getHeroes() {
        this.mailService.getAllMails();
        // this.mailService.getMailsSlowly().then(heroes => this.heroes = heroes);
    }
 }