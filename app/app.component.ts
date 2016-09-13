import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html',
    styleUrls: [ 'app.styles.css' ],
    providers: [ AuthService ]
})
export class AppComponent {
    constructor(private auth: AuthService) {}
}