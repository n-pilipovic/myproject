import { Component } from '@angular/core';

import { MenuItem } from '../models/menu-item';
import { MENUITEMS } from '../consts/menu-items';

@Component({
    selector: 'menu',
    templateUrl: 'app/menu/menu.template.html'
})
export class MenuComponent {
    items: MenuItem[] = MENUITEMS;
}