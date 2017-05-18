import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MailService } from '../services/mail.service';

import { OutgoingMail } from '../models/outgoing-mail';

@Component({
    selector: 'mail-compose',
    templateUrl: './mail-compose.template.html',
    styleUrls: ['./mail-compose.styles.css']
})
export class MailComposeComponent implements OnInit {

    private EMAIL_REGEX: RegExp = /(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i;
    mail: OutgoingMail;
    composeform: FormGroup;
    info = {
        msg: '',
        show: false
    };

    constructor(private mailService: MailService, private route: ActivatedRoute) {
        this.mail = new OutgoingMail([], [], [], '', '');
    }

    ngOnInit() {
        this.route.data.subscribe(mail => console.log(mail));
        this.composeform = new FormGroup({
            to: new FormControl('', [<any>Validators.required, <any>Validators.pattern(this.EMAIL_REGEX)]),
            cc: new FormControl('', <any>Validators.pattern(this.EMAIL_REGEX)),
            bcc: new FormControl('', <any>Validators.pattern(this.EMAIL_REGEX)),
            subject: new FormControl('', <any>Validators.required),
            body: new FormControl('', <any>Validators.required),
        });
    }

    sendMail() {
        this.mailService.sendMail(this.composeform.value)
            .subscribe(res => {
                console.log(res);
                this.info.msg = 'Sent!';
                this.info.show = true;
                setTimeout(() => {
                    this.info.show = false;
                }, 1500);
            },
            err => {
                console.log(err);
                this.info.msg = err;
                this.info.show = true;
                setTimeout(() => {
                    this.info.show = false;
                }, 1500);
            });
    }
}