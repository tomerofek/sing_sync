import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
 })
 export class HeaderComponent implements OnInit {
    @Input() sidebar!: MatSidenav;

    constructor() {}

    ngOnInit(): void {}

    toggleSideBar(){
        this.sidebar.toggle();
    }

}
