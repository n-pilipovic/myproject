import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';

import { MailInboxResolve } from './resolves/mail-inbox-resolve.service';

import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'inbox', component: MailInboxComponent, canActivate: [AuthGuard], resolve: { emails: MailInboxResolve } },
            { path: 'inbox/:id', component: MailDetailComponent, canActivate: [AuthGuard] }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
export class InboxRoutingModule { }
