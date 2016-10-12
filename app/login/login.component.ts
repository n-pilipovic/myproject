import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GoogleConfig } from '../consts/google-config';

import { AuthService } from '../services/auth.service';

import { Hero } from '../models/hero';
// import { MailService } from '../services/mail.service';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.template.html',
    styleUrls: ['login.styles.css']
})
export class LoginComponent implements OnInit {

    constructor(public auth: AuthService, private router: Router) { }

    ngOnInit() {
        if (this.isAuthenticated()) {
            this.router.navigate(['/inbox']);
        }
    }

    login() {
        this.auth.login();
        this.router.navigate(['/inbox']);
    }

    isAuthenticated(): boolean {
        return this.auth.isAuthenticated();
    }

    logout() {
        this.auth.logout();
        if (!this.isAuthenticated()) {
            this.router.navigate(['/login']);
        }
    }
}