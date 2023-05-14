import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.sass']
})
export class EditItemComponent implements OnInit {

  @Input()
  title: string = "default";

  @Input()
  isEdit: boolean  = false;

  @Input()
  val: any

  @Input()
  type: string = "text" // text or number

  @Input()
  width: string = "100px";

  @Output()
  valChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  
  }

  update(event: any) {
    console.log(event);
    this.valChange.emit(event);
  }


}
