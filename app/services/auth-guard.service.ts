import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isAuthenticated()) {
            return true;
        }

        // Store the attempted URL for redirecting
        this._authService.redirectUrl = state.url;

        // Navigate to the login page
        this._router.navigate(['/login']);
        return false;
    }
}