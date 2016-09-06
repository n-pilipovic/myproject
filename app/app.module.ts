import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';

import { Auth } from './services/auth.service';
import { routing, appRoutingProviders } from './routing/app.routing';

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
        MenuComponent,
        MailInboxComponent,
        MailDetailComponent
    ],
    providers: [
        appRoutingProviders,
        AUTH_PROVIDERS,
        Auth
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }