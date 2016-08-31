import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';

@NgModule({
    imports: [ 
        BrowserModule, 
        FormsModule,
        NgbModule 
    ],
    declarations: [ 
        AppComponent,
        MailInboxComponent,
        MailDetailComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }