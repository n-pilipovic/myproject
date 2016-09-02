import { Component, OnInit } from '@angular/core';

import { Auth } from './services/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.template.html',
    providers: [ Auth ]
})
export class AppComponent {
    constructor(private auth: Auth) {}
}