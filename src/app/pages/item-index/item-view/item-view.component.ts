import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../shared/model';


@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.sass']
})
export class ItemViewComponent implements OnInit {

  @Input()
  item: Item = new Item();

  constructor() { }

  ngOnInit(): void {
  }

}
