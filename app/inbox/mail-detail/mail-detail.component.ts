import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RecievedMail } from '../../models/recieved-mail';
import { MailService } from '../../services/mail.service';

@Component({
    selector: 'my-mail-detail',
    templateUrl: './mail-detail.template.html'
})
export class MailDetailComponent implements OnInit {

    mail: RecievedMail;

    constructor(private route: ActivatedRoute, private mailService: MailService) { }

    ngOnInit() {
        console.log('entered on maildetail');
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            console.log('mail.id: ', id);
            this.mailService.getMail(id)
                .subscribe(mail => {
                    this.mail = mail;
                });
        });
    }
}