import { Injectable } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthService } from './auth.service';
import { MailHelper } from '../utils/mail.helper';
import { UtilHelper } from '../utils/util.helper';
import { RecievedMail } from '../models/recieved-mail';
import { RecievedMailRaw } from '../models/recieved-mail-raw';
import { OutgoingMail } from '../models/outgoing-mail';

@Injectable()
export class MailService {

    private GMAIL_ROOT: string = 'https://www.googleapis.com/gmail/v1/users/me';
    private recieveMailInFormat: string = 'full';
    private returnMailsCount: number = 50;
    private googleHeader: Headers = new Headers();
    public pageToken: string;
    private mails: Array<RecievedMail> = Array<RecievedMail>();

    constructor(private auth: AuthService, private http: Http, private mailHelper: MailHelper, private utilHelper: UtilHelper) {
        this.googleHeader.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('id_token')).token);
    }

    getAllMails(query?: string, pageToken?: string): Observable<RecievedMail[]> {
        let url = `${this.GMAIL_ROOT}/messages?maxResults=${this.returnMailsCount}`;
        url = (pageToken) ? `${this.GMAIL_ROOT}/messages?maxResults=${this.returnMailsCount}&pageToken=${pageToken}` : `${this.GMAIL_ROOT}/messages?maxResults=${this.returnMailsCount}`;
        // let localMails: Array<RecievedMail> = new Array<RecievedMail>();
        if (query) {
            url.concat('&q=', query);
        }
        return this.http.get(url, { headers: this.googleHeader })
            .switchMap(res => {
                let requests = [];
                console.log("getAllMails() -> this: ", this);
                this.PageToken = res.json().nextPageToken;
                for (let message in res.json().messages) {
                    requests.push(this.http.get(`${this.GMAIL_ROOT}/messages/${res.json().messages[message].id}?format=${this.recieveMailInFormat}`, { headers: this.googleHeader }).map(res => res.json()));
                }
                return Observable.forkJoin(requests).distinctUntilChanged().map((data: RecievedMailRaw[]) => {
                    for (let item in data) {
                        this.mails.push(new RecievedMail(data[item].id,
                            this.mailHelper.getHeader(data[item].payload.headers, 'From'),
                            this.mailHelper.getHeader(data[item].payload.headers, 'Subject'),
                            this.mailHelper.getHeader(data[item].payload.headers, 'Date'),
                            this.mailHelper.getBody(data[item].payload)));
                    }
                    // this.Mails = localMails;
                    this.utilHelper.sortByDate(this.mails);
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
        let rawMail = this.mailHelper.encodeEmailData(data, this.auth.getUserInfo());
        return this.http.post(`${this.GMAIL_ROOT}/messages/send`, { raw: rawMail }, { headers: this.googleHeader })
            .map(res => res.json());
    }

    set PageToken(pageToken: string) {
        this.pageToken = pageToken;
    }

    get PageToken(): string {
        return this.pageToken;
    }

    set Mails(emails: RecievedMail[]) {
        if (this.mails.length > 0) {
            for (var i = 0; i < emails.length; i++) {
                for (var j = 0; j < this.mails.length; j++) {
                    if (this.mails[j].id == emails[i].id) {
                        console.log('Two emails are the same!');
                    } else {
                        this.mails.push(emails[i]);
                    }
                }
            }
        } else {
            this.mails = this.mails.concat(emails);
        }
    }

    get Mails(): RecievedMail[] {
        return this.mails;
    }

}