import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RecievedMail } from '../../models/recieved-mail';
import { MailService } from '../../services/mail.service';

@Component({
    selector: 'mail-inbox',
    templateUrl: './mail-inbox.template.html',
    styleUrls: ['./mail-inbox.styles.css', '../../styles.css'],
    providers: [MailService]
})
export class MailInboxComponent implements OnInit {
    title = 'My web mail';
    selectedMail: RecievedMail;
    mails: Array<Object>;
    errorMessage: any;

    constructor(private mailService: MailService, private router: Router, private route: ActivatedRoute) {
        this.mails = new Array<Object>();
    }

    ngOnInit() {
        this.route.data.forEach((data: { emails: RecievedMail[] }) => {
            this.mails = data.emails;
        })
    }

    onSelect(mail: RecievedMail) {
        console.log('clicked on mail');
        this.router.navigate(['/email', mail.id]);
    }

    getMails() {
        this.mailService.getAllMails().subscribe(data => this.mails = data);
    }
}