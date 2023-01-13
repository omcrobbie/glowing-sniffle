import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string;
  useReact = true;

  constructor() {
    this.title = 'Spring Boot - Angular Application';
  }
}
