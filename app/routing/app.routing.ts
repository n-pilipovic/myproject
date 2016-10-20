import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from '../login/login.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { MailComposeComponent } from '../mail-compose/mail-compose.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/unauthorized',
        pathMatch: 'full'
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: 'compose',
        component: MailComposeComponent,
        canActivate: [AuthGuard]
    }
];

export const appRoutingProviders: any[] = [
    AuthGuard,
    AuthService
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);