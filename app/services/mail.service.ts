import { Injectable } from '@angular/core';

import { HEROES } from '../consts/mock-heroes';
import { Hero } from '../models/hero';

@Injectable()
export class MailService {
    
    getMails() {
        return Promise.resolve(HEROES);
    }

    getMailsSlowly() {
        return new Promise<Hero[]>(resolve => setTimeout(() => resolve(HEROES), 2000)); // wait for 2 seconds
    }
}