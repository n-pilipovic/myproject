import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailInboxComponent } from '../mail-inbox/mail-inbox.component';
import { MailDetailComponent } from '../mail-detail/mail-detail.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/inbox',
        pathMatch: 'full'
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