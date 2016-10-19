import { Injectable } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthService } from './auth.service';
import { MailHelper } from '../utils/mail.helper';
import { RecievedMail } from '../models/recieved-mail';
import { RecievedMailRaw } from '../models/recieved-mail-raw';
import { OutgoingMail } from '../models/outgoing-mail';

@Injectable()
export class MailService {

    private GMAIL_ROOT: string = 'https://www.googleapis.com/gmail/v1/users/me';
    private recieveMailInFormat: string = 'full';
    private returnMailsCount: number = 50;
    private pageToken: string = '';
    private googleHeader: Headers = new Headers();
    private mails: Array<RecievedMail> = new Array<RecievedMail>();

    constructor(private auth: AuthService, private http: Http, private mailHelper: MailHelper) {
        this.googleHeader.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('id_token')).token);
    }

    getAllMails(query?: string): Observable<RecievedMail[]> {
        let url = `${this.GMAIL_ROOT}/messages?maxResults=${this.returnMailsCount}`;
        if (query) {
            url.concat('&q=', query);
        }
        return this.http.get(url, { headers: this.googleHeader })
            .switchMap(res => {
                let requests = [];
                this.pageToken = res.json().nextPageToken;
                for (let message in res.json().messages) {
                    requests.push(this.http.get(`${this.GMAIL_ROOT}/messages/${res.json().messages[message].id}?format=${this.recieveMailInFormat}`, { headers: this.googleHeader }).map(res => res.json()));
                }
                return Observable.forkJoin(requests).map((data: RecievedMailRaw[]) => {
                    for (let item in data) {
                        this.mails.push(new RecievedMail(data[item].id,
                            this.mailHelper.getHeader(data[item].payload.headers, 'From'),
                            this.mailHelper.getHeader(data[item].payload.headers, 'Subject'),
                            this.mailHelper.getHeader(data[item].payload.headers, 'Date'),
                            this.mailHelper.getBody(data[item].payload)));
                    }
                    return this.mails;
                });
            });
    }

    getMail(id: string): Observable<RecievedMail> {
        return this.http.get(`${this.GMAIL_ROOT}/messages/${id}?format=${this.recieveMailInFormat}`, { headers: this.googleHeader })
            .map(res => new RecievedMail(res.json().id,
                this.mailHelper.getHeader(res.json().payload.headers, 'From'),
                this.mailHelper.getHeader(res.json().payload.headers, 'Subject'),
                this.mailHelper.getHeader(res.json().payload.headers, 'Date'),
                this.mailHelper.getBody(res.json().payload)));
    }

    sendMail(data: OutgoingMail): Observable<any> {
        let rawMail = this.mailHelper.encodeEmailData(data);
        return this.http.post(`${this.GMAIL_ROOT}/messages/send`, JSON.stringify(data), { headers: this.googleHeader })
            .map(res => res.json());
    }

}