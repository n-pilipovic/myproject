import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/primeng';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { InboxRoutingModule } from './inbox-routing.module';

import { MaskEmailPipe } from '../pipes/mask-email.pipe';
import { TodayPipe } from '../pipes/today.pipe';

import { MailService } from '../services/mail.service';

import { MailInboxResolve } from './resolves/mail-inbox-resolve.service';

import { EmailBodyDirective } from './directives/email-body.directive';

import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InfiniteScrollModule,
        InboxRoutingModule
    ],
    declarations: [
        MailInboxComponent,
        MailDetailComponent,
        EmailBodyDirective,
        MaskEmailPipe,
        TodayPipe
    ],
    providers: [
        MailService,
        MailInboxResolve
    ]
})
export class InboxModule { }