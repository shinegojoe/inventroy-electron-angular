import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  index: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  handleChange(e: any) {
    const index = e.index;
    console.log("index: ", index);
    this.index = index;

  }

}
