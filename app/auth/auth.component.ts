import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GoogleConfig } from '../consts/google-config';

// import { Auth } from '../services/auth.service';

import { Hero } from '../models/hero';
// import { MailService } from '../services/mail.service';

@Component({
    moduleId: module.id,
    selector: 'auth',
    template: '',
    // styleUrls: [ 'app.styles.css' ],
    // providers: [ MailService ]
})
export class AuthComponent implements OnInit {
    token: Observable<string>;
    googleHeader: Headers;
    accessToken: string;

    constructor(private http:Http, private route: ActivatedRoute) {
        this.googleHeader = new Headers();
        this.googleHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    ngOnInit() {
        this.token = this.route.queryParams.map(params => params['code'] || '');
        this.getAccessToken(this.token)
            .subscribe(data => this.accessToken = data.access_token);
    }

    getAccessToken(token:Observable<string>):any {
        let reqConfig = {
            data: token,
            headers: this.googleHeader
        }
        this.http.post(GoogleConfig.TOKEN_URL, reqConfig)
            .map(resp => resp.json());
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