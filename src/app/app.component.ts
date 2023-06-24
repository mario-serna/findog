import { Component } from '@angular/core';

@Component({
  selector: 'nid-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nidiro-base-map';
  img = 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png';
  open = false;

  openDialog() {
    this.open = true;
  }
}
