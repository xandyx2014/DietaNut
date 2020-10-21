import { Component, Input, OnInit } from '@angular/core';
import { Compocision } from 'src/app/model/alimento.composicion.model';

@Component({
  selector: 'app-sub-total',
  templateUrl: './sub-total.component.html',
  styleUrls: ['./sub-total.component.scss'],
})
export class SubTotalComponent implements OnInit {
 @Input() value;
 @Input() type;
 @Input() total = true;
  constructor() { }
  ngOnInit() {}

}
