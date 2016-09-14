import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { WindowService } from './services/window.service';
import { MailHelper } from './utils/mail.helper';
import { routing, appRoutingProviders } from './routing/app.routing';

import { LoginComponent } from './login/login.component';
import { MenuComponent} from './menu/menu.component';
import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';

@NgModule({
    imports: [ 
        BrowserModule, 
        FormsModule,
        HttpModule,
        NgbModule,
        routing 
    ],
    declarations: [ 
        AppComponent,
        LoginComponent,
        MenuComponent,
        MailInboxComponent,
        MailDetailComponent
    ],
    providers: [
        appRoutingProviders,
        WindowService,
        MailHelper,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }