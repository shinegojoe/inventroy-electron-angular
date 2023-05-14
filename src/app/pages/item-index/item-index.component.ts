import { Component, OnInit } from '@angular/core';
import { ICategory, Vender, Item, IItem } from '../../shared/model';
import { IAutoCompleteSearch } from '../../shared/UIInterface';
import { VenderService } from '../../service/venderService.service';
import { ItemService } from '../../service/itemService.service';
import { IFieldSearch } from 'src/app/shared/plyload';



@Component({
  selector: 'app-item-index',
  templateUrl: './item-index.component.html',
  styleUrls: ['./item-index.component.sass']
})
export class ItemIndexComponent implements OnInit {

  categoryList: Array<string> = [];
  selectedCategory: string = "";
  venderList: Array<Vender> = [];
  selectedVender: Vender = new Vender();
  venderSuggList: any = [];
  newItem: Item = new Item();
  itemList: Array<Item> = [];
  selectedItem: Item = new Item();
  itemSuggList: Array<Item> = [];
  historyList: Array<Item> = [];
  itemSerialSuggList: Array<IItem> = [];

  testItemList: Array<IItem> = [];
  testItemModel: Item = new Item();
  testItemSugg: Array<Item> = [];

  testItemAutoComplete(event: any) {
    console.log(event.query);
    const payload: IFieldSearch = {
      field: "name",
      val: event.query
    }
    const res = this.itemService.listByLikeField(payload);
    // console.log(res);
    this.testItemSugg = res;

  }

  constructor(private venderService: VenderService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.venderList = this.getVenderList();
    this.itemList = this.getItemList();

  }

  getVenderList() {
    const res = this.venderService.list();
    return res;
  }

  getItemList() {
    const res = this.itemService.list();
    console.log("itemList: ", res);
    return res;
  }

  // venderChange(event: Vender) {
  //   console.log(event);
  // }

  venderAutoComplete(event: IAutoCompleteSearch) {
    console.log(event);
    this.venderSuggList = this.venderList.filter((item)=> {
      return item.name.includes(event.query);
    })
  }

  itemAutoComplete(event: IAutoCompleteSearch) {
    this.itemSuggList = this.itemList.filter((item)=> {
      return item.name.includes(event.query);
    })
  }

  itemSerialAutoComplete(event: IAutoCompleteSearch) {
    this.itemSerialSuggList = this.itemList.filter((item)=> {
      return item.serialNo.includes(event.query);
    })
  }


  makeItemBody(item: Item): IItem {
    const body: IItem = {
      name: item.name,
      venderId: 1,
      serialNo: item.serialNo,
    }
    return body;
  }

  addItem() {
    const body = this.makeItemBody(this.newItem);
    this.itemService.add(body);
    this.newItem = new Item();
    this.itemList = this.getItemList();
  }

  setIsCurrentFalse(id: number) {
    const payload = {
      id: id
    };
    this.itemService.setIsCurrentFalse(payload);
  }



}
