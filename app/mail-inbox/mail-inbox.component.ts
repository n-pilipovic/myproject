import { Component, OnInit } from '@angular/core';

import { Auth } from '../services/auth.service';

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
    heroes: any;
    errorMessage: any;

    constructor(private mailService: MailService, private auth: Auth) {
    }

    ngOnInit() {
        // this.getHeroes();
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    getHeroes() {
        this.mailService.getAllMails()
                        .then(
                            heroes => this.heroes = heroes,
                            error => this.errorMessage = <any>error);
        // this.mailService.getMailsSlowly().then(heroes => this.heroes = heroes);
    }
 }