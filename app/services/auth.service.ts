/* ===== app/auth.service.ts ===== */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { GoogleConfig } from '../consts/google-config';
import { WindowService } from './window.service';

@Injectable()
export class AuthService {

    private oAuthCallbackUrl: string;
    private oAuthTokenUrl: string;
    private oAuthUserUrl: string;
    private oAuthUserNameField: string;
    private locationWatcher = new Subject();
    private authenticated: boolean = false;
    // used for window session
    private windowHandle: any = null;
    private loopCount = 600;
    private intervalId: any = null;
    private intervalLength = 100;

    // used for token
    private token: string;
    private expires: any = 0;
    private expiresTimerId: any = null;

    //Store profile object in auth class
    public picSize: string = '?sz=36';
    public redirectUrl: string;
    public userProfile: any;

    constructor(private _window: WindowService, private _http: Http, private _router: Router) {
        this.oAuthCallbackUrl = GoogleConfig.REDIRECT_URL;
        this.oAuthTokenUrl = GoogleConfig.AUTH_URL;
        this.oAuthTokenUrl = this.oAuthTokenUrl
            .replace('{callbackUrl}', GoogleConfig.REDIRECT_URL)
            .replace('{responseType}', GoogleConfig.RESPONSE_TYPE)
            .replace('{clientId}', GoogleConfig.CLIENT_ID)
            .replace('{scopes}', GoogleConfig.AUTH_SCOPE);
        this.oAuthUserUrl = GoogleConfig.USER_INFO_URL;

        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }

    public login(path) {
        // Call the method to redirect to google for getting access token.
        this.getAccess(path);
    };

    public subscribe(onNext: (value: any) => void, onError?: (exception: any) => void, onComplete?: () => void) {
        return this.locationWatcher.subscribe(onNext, onError, onComplete);
    }

    public unsubscribe() {
        return this.locationWatcher.unsubscribe();
    }

    public isAuthenticated(offsetSeconds?: number) {
        let token = JSON.parse(localStorage.getItem('id_token'));
        offsetSeconds = offsetSeconds || 0;
        if (token == null) {
            return false;
        }
        let date = new Date(token.exp);
        console.log('Token date: ', date.getTime());
        console.log('Current date: ', new Date().getTime() + (offsetSeconds * 1000));
        return (date.valueOf() > (new Date().getTime() + (offsetSeconds * 1000)));
    };

    public logout() {
        // Remove token and profile from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.authenticated = false;
        this.userProfile = undefined;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
        this.emitAuthStatus(true);
        console.log('Session has been cleared');
    };

    public getSession() {
        return { authenticated: this.isAuthenticated(), token: this.token, expires: this.expires };
    }

    public getUserInfo() {
        return this.userProfile;
    }

    private getAccess(path) {
        let loopCount = this.loopCount;
        this.windowHandle = this._window.createWindow(this.oAuthTokenUrl, 'OAuth2 Login');

        this.intervalId = setInterval(() => {
            // if response from Google is not recieved yet
            if (loopCount-- < 0) {
                clearInterval(this.intervalId);
                this.emitAuthStatus(false);
                this.windowHandle.close();
            } else {
                var href: string;
                try {
                    href = this.windowHandle.location.href; // check if response from Google is recieved
                } catch (e) {
                    console.error('Error while waiting response url from Google: ', e);
                }
                if (href !== null) {
                    let reg = /access_token=(.*)/;
                    let found = href.match(reg);
                    if (found) {
                        console.log('Callback URL: ', href);
                        clearInterval(this.intervalId);
                        var pathData = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
                        var expiresSeconds = Number(pathData.expires_in) || 1800;
                        this.token = pathData.access_token;
                        if (this.token) {
                            let tokenDate = new Date();
                            console.log('Token expires on: ', expiresSeconds);
                            console.log('TokenDate started: ', tokenDate.getTime());
                            tokenDate = new Date(tokenDate.getTime() + expiresSeconds * 1000);
                            console.log('Final Token expires on: ', tokenDate.getTime());
                            let googleObject = {
                                token: this.token,
                                exp: tokenDate
                            }
                            localStorage.setItem('id_token', JSON.stringify(googleObject));
                            this.authenticated = true;
                            this.startExpiresTimer(expiresSeconds);
                            this.expires = new Date();
                            this.expires = this.expires.setSeconds(this.expires.getSeconds() + expiresSeconds);

                            this.windowHandle.close();
                            this.emitAuthStatus(true);
                            this.fetchUserInfo(path);
                        } else {
                            this.authenticated = false;
                            this.emitAuthStatus(false); // so we are still going to fail the login
                        }
                    } else {
                        // http://localhost:3000/auth/callback#error=access_denied
                        if (href.indexOf(this.oAuthCallbackUrl) == 0) {
                            clearInterval(this.intervalId);
                            var pathData = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
                            this.windowHandle.close();
                            this.emitAuthStatusError(false, pathData);
                        }
                    }
                }
            }
        }, this.intervalLength);
    }

    private emitAuthStatus(success: boolean) {
        this.emitAuthStatusError(success, null);
    }

    private emitAuthStatusError(success: boolean, error: any) {
        this.locationWatcher.next(
            {
                success: success,
                authenticated: this.authenticated,
                token: JSON.parse(localStorage.getItem('id_token')),
                expires: this.expires,
                error: error
            }
        );
    }

    private fetchUserInfo(path) {
        if (this.token != null) {
            var headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);
            this._http.get(this.oAuthUserUrl, { headers: headers })
                .map(res => res.json())
                .subscribe(
                info => {
                    this.userProfile = info;
                    this.userProfile.image.url = this.userProfile.image.url.replace('?sz=50', '');
                    localStorage.setItem('profile', JSON.stringify(info));
                },
                err => console.error("Failed to fetch user info:", err),
                () => this._router.navigate([path])
                );
        }
    }

    private parse(str) { // lifted from https://github.com/sindresorhus/query-string
        if (typeof str !== 'string') {
            return {};
        }
        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return {};
        }
        return str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            // Firefox (pre 40) decodes `%3D` to `=`
            // https://github.com/sindresorhus/query-string/pull/37
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join('=') : undefined;
            key = decodeURIComponent(key);
            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});
    }

    private startExpiresTimer(seconds: number) {
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            console.log('Session has expired');
            this.logout();
        }, seconds * 1000); // seconds * 1000
        console.log('Token expiration timer set for', seconds, "seconds");
    }
}