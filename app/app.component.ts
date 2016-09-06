import { Component, OnInit } from '@angular/core';

import { Auth } from './services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html',
    styleUrls: [ 'app.styles.css' ],
    providers: [ Auth ]
})
export class AppComponent {
    constructor(private auth: Auth) {}
}