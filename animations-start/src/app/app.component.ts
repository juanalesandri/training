import { trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [

    ])
  ]
})
export class AppComponent {
  state: string = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item) {
    this.list.push(item);
  }
}
