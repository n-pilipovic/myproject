import { Component, OnInit } from '@angular/core';

import { Hero } from '../models/hero';
import { MailService } from '../services/mail.service';

@Component({
    selector: 'mail-inbox',
    templateUrl: 'app/mail-inbox/mail-inbox.template.html',
    styleUrls: [ 'app/app.styles.css' ],
    providers: [ MailService ]
})
export class MailInboxComponent implements OnInit {
    title = 'My web mail';
    selectedHero: Hero;
    heroes: Hero[];

    constructor(private mailService: MailService) {

    }

    ngOnInit() {
        this.getHeroes();
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    getHeroes() {
        this.mailService.getMails().then(heroes => this.heroes = heroes);
        // this.mailService.getMailsSlowly().then(heroes => this.heroes = heroes);
    }
 }