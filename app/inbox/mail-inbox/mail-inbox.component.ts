import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RecievedMail } from '../../models/recieved-mail';
import { MailService } from '../../services/mail.service';

import { UtilHelper } from '../../utils/util.helper';

@Component({
    selector: 'mail-inbox',
    templateUrl: './mail-inbox.template.html',
    styleUrls: ['./mail-inbox.styles.css', '../../styles.css'],
    providers: [MailService]
})
export class MailInboxComponent implements OnInit {
    title = 'My web mail';
    dateFormat: string = 'H:mm:ss (Z), dd MMMM y';
    selectedMail: RecievedMail;
    mails: Array<Object>;
    errorMessage: any;

    constructor(private mailService: MailService, private router: Router, private route: ActivatedRoute, private utilHelper: UtilHelper) {
        this.mails = new Array<Object>();
    }

    ngOnInit() {
        this.route.data.forEach((data: { emails: RecievedMail[] }) => {
            this.mails = data.emails;
        })
    }

    getNextPage() {
        let token = this.mailService.PageToken;
        this.mailService.getAllMails('', token).map((data: RecievedMail[]) => {
            // Emails should be sorted in descending order by Date and Time of arrival
            data = this.utilHelper.sortByDate(data);
            this.mails = data;
        });
    }

    onSelect(mail: RecievedMail) {
        console.log('clicked on mail');
        this.router.navigate(['/inbox', mail.id]);
    }

}