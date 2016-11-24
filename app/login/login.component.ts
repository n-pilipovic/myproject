import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.template.html',
    styleUrls: ['./login.styles.css'],
    encapsulation: ViewEncapsulation.None   // Important to add in order to override PrimeNG classes
})
export class LoginComponent implements OnInit {

    private profile: MenuItem[];

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

    setProfile(): void {
        let name = 'Name: '.concat(this.auth.getUserInfo().displayName);
        let email = 'Email: '.concat(this.auth.getUserInfo().emails[0].value);
        this.profile = [
            { label: name },
            { label: email }
        ];
    }
}