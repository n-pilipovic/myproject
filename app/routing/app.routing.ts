import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { MailInboxComponent } from '../mail-inbox/mail-inbox.component';
import { MailDetailComponent } from '../mail-detail/mail-detail.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'inbox',
        component: MailInboxComponent
    },
    {
        path: 'inbox/:id',
        component: MailDetailComponent
    }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);