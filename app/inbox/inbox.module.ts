import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';

import { MailService } from '../services/mail.service';

import { MailInboxResolve } from './resolves/mail-inbox-resolve.service';

import { EmailBodyDirective } from './directives/email-body.directive';

import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';

@NgModule({
    imports: [
        CommonModule,
        InboxRoutingModule
    ],
    declarations: [
        MailInboxComponent,
        MailDetailComponent,
        EmailBodyDirective
    ],
    providers: [
        MailService,
        MailInboxResolve
    ]
})
export class InboxModule { }