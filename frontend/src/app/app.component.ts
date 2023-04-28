import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hackathon-angular';
  items: MenuItem[];

  ngOnInit(): void {

    this.items = [
      {label: 'Stefamon', disabled: true},
      {label: 'Home', icon:'pi pi-home', routerLink:'/home'},
      {label: 'Loja', icon: 'pi pi-shopping-cart', routerLink: '/loja'}
    ];
  }
}
