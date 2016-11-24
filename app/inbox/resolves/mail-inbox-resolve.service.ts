import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MailService } from '../../services/mail.service';
import { RecievedMail } from '../../models/recieved-mail';

import { UtilHelper } from '../../utils/util.helper';

@Injectable()
export class MailInboxResolve implements Resolve<RecievedMail[]> {
    constructor(private mailService: MailService, private router: Router, private utilHelper: UtilHelper) { }
    resolve(): Observable<any> | boolean {
        return this.mailService.getAllMails().map((data: RecievedMail[]) => {
            if (data) {
                // Emails should be sorted in descending order by Date and Time of arrival
                data = this.utilHelper.sortByDate(data);
                return data;
            } else { // id not found
                this.router.navigate(['/']);
                return false;
            }
        });
    }

}
