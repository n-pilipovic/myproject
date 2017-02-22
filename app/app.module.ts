import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ButtonModule, MenuModule, ChipsModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { InboxModule } from './inbox/inbox.module';

import { MaskEmailPipe } from './pipes/mask-email.pipe';

import { AuthService } from './services/auth.service';
import { WindowService } from './services/window.service';
import { MailHelper } from './utils/mail.helper';
import { UtilHelper } from './utils/util.helper';
import { routing, appRoutingProviders } from './routing/app.routing';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ButtonModule,
        ChipsModule,
        MenuModule,
        InboxModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MenuComponent,
        UnauthorizedComponent,
        MailComposeComponent
    ],
    providers: [
        appRoutingProviders,
        WindowService,
        MailHelper,
        UtilHelper,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }