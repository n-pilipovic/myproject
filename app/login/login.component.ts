import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.template.html',
    styleUrls: ['./login.styles.css']
})
export class LoginComponent implements OnInit {

    constructor(public auth: AuthService, private router: Router) { }

    ngOnInit() {
        if (this.isAuthenticated()) {
            this.router.navigate(['/inbox']);
        }
    }

    login() {
        this.auth.login('/inbox');
    }

    isAuthenticated(): boolean {
        return this.auth.isAuthenticated();
    }

    logout() {
        this.auth.logout();
        if (!this.isAuthenticated()) {
            this.router.navigate(['/unauthorized']);
        }
    }
}