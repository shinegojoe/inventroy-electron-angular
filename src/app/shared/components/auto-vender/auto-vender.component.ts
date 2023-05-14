import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICategory, Vender } from '../../model';
import  { IFieldSearch } from '../../../shared/plyload';
import { VenderService } from '../../../service/venderService.service';

@Component({
  selector: 'app-auto-vender',
  templateUrl: './auto-vender.component.html',
  styleUrls: ['./auto-vender.component.sass']
})
export class AutoVenderComponent implements OnInit {
  
  
  
  @Output()
  selectUpdate: EventEmitter<any> = new EventEmitter();
  
  venderSuggList: Array<Vender> = [];
  searchTypeList: Array<ICategory> = [{ name: "序號", code: "serialNo" }, { name: "名稱", code: "name" }];
  selectedSearchType: ICategory = { name: "序號", code: "serialNo" };
  selectedVender: Vender = new Vender();

  
  constructor(private venderService: VenderService) {

  }

  ngOnInit(): void {
  
  }


  venderAutoComplete(event: any) {
    console.log(event);
    const val = event.query;
    const payload: IFieldSearch = {
      field: this.selectedSearchType.code,
      val: val
    };

    if(val !== "") {
      this.venderSuggList = this.venderService.listByLikeField(payload);
    } else {
      this.venderSuggList = [];
    }

  }

  update(event: any) {
    console.log("update: ", event);
    this.selectUpdate.emit(event);

  }

  

}
