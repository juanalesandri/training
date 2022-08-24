import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input('srvElement') element: { type: string, name: string, content: string };

  constructor() {
    console.log('CONSTRUCTOR');
  }

  ngOnInit(): void {
    console.log('NG ON INIT');
  }

  ngOnChanges(changes: SimpleChanges) { //es el unnico que recibe un argumento
    console.log('NG ON CHANGE', changes);
  }

  ngDoCheck(): void {
    console.log('NG DO CHECK');
  }

  ngAfterContentInit(): void {
    console.log('NG AFTER CONTENT INIT');
  }

  ngAfterContentChecked(): void {
    console.log('NG AFTER CONTENT CHECKED');
  }

  ngAfterViewInit(): void {
    console.log('NG AFTER VIEW INIT');
  }

  ngAfterViewChecked(): void {
    console.log('NG AFTER VIEW CHECKED');
  }

  ngOnDestroy(): void {
    console.log('ON DESTROY');
  }

}
