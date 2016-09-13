import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from '../login/login.component';
import { MailInboxComponent } from '../mail-inbox/mail-inbox.component';
import { MailDetailComponent } from '../mail-detail/mail-detail.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/inbox',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'inbox',
        component: MailInboxComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'inbox/:id',
        component: MailDetailComponent,
        canActivate: [ AuthGuard ]
    }
];

export const appRoutingProviders: any[] = [
    AuthGuard,
    AuthService
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);