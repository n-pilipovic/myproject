import { Component } from '@angular/core';

import { MenuItem } from '../models/menu-item';
import { MENUITEMS } from '../consts/menu-items';

@Component({
    selector: 'menu',
    templateUrl: './menu.template.html',
    styleUrls: ['./menu.styles.css', '../styles.css']
})
export class MenuComponent {
    items: MenuItem[] = MENUITEMS;
}