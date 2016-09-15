import { Injectable } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthService } from './auth.service';
import { MailHelper } from '../utils/mail.helper';
import { RecievedMail } from '../models/recieved-mail';

import { HEROES } from '../consts/mock-heroes';
import { Hero } from '../models/hero';

@Injectable()
export class MailService {

    private GMAIL_ROOT: string = 'https://www.googleapis.com/gmail/v1/users/me';
    private recieveMailInFormat: string = 'full';
    private googleHeader: Headers = new Headers();
    private mails: Array<{}> = new Array<{}>();

    constructor(private auth: AuthService, private http: Http, private mailHelper: MailHelper) {
        this.googleHeader.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    }

    getAllMails(): any {
        return this.http.get(`${this.GMAIL_ROOT}/messages`, { headers: this.googleHeader })
                .switchMap(res => {
                    let requests = [];
                    for (let message in res.json().messages) {
                        requests.push(this.http.get(`${this.GMAIL_ROOT}/messages/${res.json().messages[message].id}?format=${this.recieveMailInFormat}`, { headers: this.googleHeader }).map(res => res.json()));
                    }
                    return Observable.forkJoin(requests).map(data => {
                        for (let item in data) {
                            this.mails.push({id: data[item].id, 
                                             from: this.mailHelper.getHeader(data[item].payload.headers, 'From'), 
                                             subject: this.mailHelper.getHeader(data[item].payload.headers, 'Subject'),
                                             date: this.mailHelper.getHeader(data[item].payload.headers, 'Date'),
                                             body: this.mailHelper.getBody(data[item].payload)});
                        }
                        return this.mails;
                    });
                });
    }
    
}