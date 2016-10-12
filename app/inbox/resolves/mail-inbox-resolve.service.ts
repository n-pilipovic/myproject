import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MailService } from '../../services/mail.service';
import { RecievedMail } from '../../models/recieved-mail';

@Injectable()
export class MailInboxResolve implements Resolve<RecievedMail[]> {
    constructor(private mailService: MailService, private router: Router) { }
    resolve(): Observable<any> | boolean {
        return this.mailService.getAllMails().map(data => {
            if (data) {
                return data;
            } else { // id not found
                this.router.navigate(['/']);
                return false;
            }
        });
    }
}
