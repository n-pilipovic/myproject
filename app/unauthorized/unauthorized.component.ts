import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'unauthorized',
    template: `Please login!`
})
export class UnauthorizedComponent implements OnInit {

    constructor(private router: Router, private auth: AuthService) { }

    ngOnInit() {
        if (this.isAuthenticated()) {
            this.router.navigate(['/inbox']);
        } else {
            this.auth.logout();
        }
    }

    isAuthenticated(): boolean {
        return this.auth.isAuthenticated();
    }
}