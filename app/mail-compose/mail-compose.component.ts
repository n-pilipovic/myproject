import { Component } from '@angular/core';

import { MailService } from '../services/mail.service';

import { OutgoingMail } from '../models/outgoing-mail';

@Component({
    selector: 'mail-compose',
    templateUrl: './mail-compose.template.html',
    styleUrls: ['./mail-compose.styles.css']
})
export class MailComposeComponent {

    mail: OutgoingMail;

    constructor(private mailService: MailService) {
        this.mail = new OutgoingMail('', '', '', '', '');
    }

    sendMail() {
        this.mailService.sendMail(this.mail)
            .subscribe(res => console.log(res));
    }
}