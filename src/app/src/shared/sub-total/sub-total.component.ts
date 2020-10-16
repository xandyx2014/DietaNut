import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-total',
  templateUrl: './sub-total.component.html',
  styleUrls: ['./sub-total.component.scss'],
})
export class SubTotalComponent implements OnInit {
 @Input() value;
 @Input() type;
  constructor() { }
  ngOnInit() {}

}
