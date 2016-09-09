import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// import { Auth } from '../services/auth.service';

import { Hero } from '../models/hero';
// import { MailService } from '../services/mail.service';

@Component({
    moduleId: module.id,
    selector: 'mail-inbox',
    templateUrl: 'mail-inbox.template.html',
    // styleUrls: [ 'app.styles.css' ],
    // providers: [ MailService ]
})
export class AuthComponent implements OnInit {
    accessToken: Observable<string>;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.accessToken = this.route.queryParams.map(params => params['code'] || '');
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    getHeroes() {
        // this.mailService.getAllMails()
        //                 .then(
        //                     heroes => this.heroes = heroes,
        //                     error => this.errorMessage = <any>error);
        // this.mailService.getMailsSlowly().then(heroes => this.heroes = heroes);
    }
 }