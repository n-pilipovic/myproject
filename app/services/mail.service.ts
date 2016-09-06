import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Auth } from './auth.service';
import { MailHelper } from '../utils/mail.helper';
import { RecievedMail } from '../models/recieved-mail';

import { HEROES } from '../consts/mock-heroes';
import { Hero } from '../models/hero';

@Injectable()
export class MailService {

    private GMAIL_ROOT: string = 'https://www.googleapis.com/gmail/v1/users/me';

    constructor(private auth: Auth, private authHttp: AuthHttp) {}

    getAllMails(): any {
        this.authHttp.get(`https://www.googleapis.com/gmail/v1/users/me/messages`).toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
    }
    
    getMails() {
        return Promise.resolve(HEROES);
    }

    getMailsSlowly() {
        return new Promise<Hero[]>(resolve => setTimeout(() => resolve(HEROES), 2000)); // wait for 2 seconds
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}