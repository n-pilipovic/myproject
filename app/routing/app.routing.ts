import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from '../login/login.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const appRoutingProviders: any[] = [
    AuthGuard,
    AuthService
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);