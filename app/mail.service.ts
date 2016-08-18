import { Injectable } from '@angular/core';

import { HEROES } from './mock-heroes';
import { Hero } from './hero';

@Injectable()
export class MailService {
    
    getMails() {
        return Promise.resolve(HEROES);
    }

    getMailsSlowly() {
        return new Promise<Hero[]>(resolve => setTimeout(() => resolve(HEROES), 2000)); // wait for 2 seconds
    }
}