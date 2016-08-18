import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { MailService } from './mail.service';

@Component({
    selector: 'mail-client',
    templateUrl: 'app/app.template.html',
    styleUrls: [ 'app/app.styles.css' ],
    providers: [ MailService ]
})
export class AppComponent implements OnInit {
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