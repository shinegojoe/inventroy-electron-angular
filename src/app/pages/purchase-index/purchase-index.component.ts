import { Component, OnInit } from '@angular/core';
import { ICategory, Vender, Item, IItem, Purchase, IPurchase, IPurchaseItem, IInventory } from '../../shared/model';
import { IAutoCompleteSearch } from '../../shared/UIInterface';
import { ItemService } from '../../service/itemService.service';
import { ItemPriceService } from '../../service/itemPriceService.service';
import { InventoryService } from '../../service/inventoryService.service';
import { IAddPurchase, IFieldSearch } from '../../shared/plyload';
import { PurchaseService } from '../../service/purchaseService.service';
import { IPurchaeVO, PurchaseItemVO } from '../../shared/vo';
import { VenderService } from '../../service/venderService.service';
import { getOffsetDateStr, getOffsetDate } from '../../shared/utils/dateHelper';
import { copyModel, IPurchaseSearch, VenderSearch, PurchaseSearch } from './purchaseHelper';
import { ToastService } from '../../service/toastService.service';

interface IItemView {
  itemName: string
  itemNo: string
  price: number
  amount: number
  itemId: number
  itemNote: string
  venderId: number
  size: string
  model: string
  color: string
}

@Component({
  selector: 'app-purchase-index',
  templateUrl: './purchase-index.component.html',
  styleUrls: ['./purchase-index.component.sass']
})
export class PurchaseIndexComponent implements OnInit {

  itemList: Array<Item> = [];
  itemSerialSuggList: Array<IItem> = [];
  selectedItem: Item = new Item();
  orderItemList: Array<Item> = [];
  purchaseItemList: Array<IPurchaseItem> = [];
  price: number = 0;
  priceHistoryList: Array<any> = [];
  priceHint: string = "";
  date: Date = new Date();
  startDate: any;
  endDate: any;
  purchaseDate: Date = new Date();

  purchaseNo: string = "";
  amount: number = 1;
  
  payment: string = "";
  purchaseSerialNo: string = "";
  totalPrice: number = 0;
  purchaseTotalPrice: number = 0;


  purchaseList: Array<IPurchaeVO> = [];
  // venderList: Array<any> = [];
  selectedVender: Vender = new Vender();
  ingredient: any;


  searchTypeList: Array<ICategory> = [{ name: "序號", code: "serialNo" }, { name: "名稱", code: "name" }];
  selectedSearchType: ICategory = { name: "序號", code: "serialNo" };

  searchHistoryTypeList: Array<ICategory> = [{ name: "廠商序號", code: "serialNo" }, { name: "廠商名稱", code: "name" }, { name: "單號", code: "purchaseNo" }];
  selectedSearchHistoryType: ICategory = { name: "序號", code: "serialNo" };
  venderList: Array<Vender> = [];
  venderSuggList: Array<Vender> = [];
  itemNameSuggList: Array<Item> = [];
  itemNoSuggList: Array<Item> = [];
  selectedItemModel: Item = new Item();
  newItemModel: Item = new Item();
  itemViewList: Array<IItemView> = [];
  selectedVenderSerch: Vender = new Vender();


  selectedSearchItem: Item = new Item();
  selectedSearchPurchase: Purchase = new Purchase();
  // venderSuggList: Array<any> = [];
  purchaseSuggList: Array<Purchase> = [];

  venderSearch: IPurchaseSearch<Vender>;
  purchaseSearch: IPurchaseSearch<Purchase>;
  searchHelper: IPurchaseSearch<any>;

  model: string = "";
  size: string = "";
  color: string = "";
  purchaseNote: string = "";
  itemNote: string = "";




  constructor(private itemService: ItemService, private itemPriceService: ItemPriceService,
    private purchaseService: PurchaseService, private inventoryService: InventoryService,
     private venderService: VenderService, private toastService: ToastService) {
      this.venderSearch = new VenderSearch(this.venderService, this.purchaseService);
      this.purchaseSearch = new PurchaseSearch(this.purchaseService);
      this.searchHelper = this.venderSearch;
    }


  ngOnInit(): void {
    // this.dateInit();
    // this.itemList = this.getItemList();
    this.purchaseList = this.getPurchaseList();
    // console.log("pur list: ", this.purchaseList);
    // this.getVenderList();
    // this.listByVenderId();

  }

  dateInit() {
    let today = new Date();
    let lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    this.startDate = lastMonth;
    this.endDate = today;
  }


  selectedVenderUpdate(model: Vender) {
    this.selectedVender = model;
  }

  // selectedVenderSerachUpdate(model: Vender) {
  //   this.selectedVenderSerch = model;
  // }

  cleanInput() {
    this.size = "";
    this.model = "";
    this.color = "";
    this.itemNote = "";
  }

  nameInputOnBlur() {
    const newItem = copyModel(this.selectedItemModel, "name");
    this.newItemModel = newItem;
    this.getPriceHistoryList(this.newItemModel.id);
    this.cleanInput();
  }

  serialNoInputOnBlue() {
    const newItem = copyModel(this.selectedItemModel, "serialNo");
    this.newItemModel = newItem;
    this.getPriceHistoryList(this.newItemModel.id);
    this.cleanInput();

  }


  listByVenderId() {
    // if(this.selectedVender.id === 0) {
    //   return;
    // }
    // this.itemList = this.itemService.listByVenderId(this.selectedVender.id);
    this.itemList = this.itemService.listByVenderId(1);
    console.log("itemList: ", this.itemList);

  }

  getVenderList() {
    const res = this.venderService.list();
    console.log("res: ", res);
    this.venderList = res;
    // this.items = res;
    // this.viewList = this.items.map((item)=> {
    //   item.view = `${item.serialNo} / ${item.name}`;
    //   return item;
    // })
  }



  searchItemNo(event: any) {
    const val = event.query;
    console.log("val: ", val);
    if(val !=="") {
      const payload: IFieldSearch = {
        field: "serialNo",
        val:val
      }
      this.itemNoSuggList = this.itemService.listByLikeFieldAndVenderId(payload, this.selectedVender.id);
    }

    // this.itemNoSuggList = this.itemList.filter((item)=> {
    //   return item.serialNo.includes(event.query);
    // })
  }

  searchItemName(event: any) {
    const val = event.query;
    if(val !=="") {
      const payload: IFieldSearch = {
        field: "name",
        val:val
      }
      this.itemNameSuggList = this.itemService.listByLikeFieldAndVenderId(payload, this.selectedVender.id);
    }
    // console.log(event.query);
    // console.log("model", this.selectedItemModel);
    // this.itemNameSuggList = this.itemList.filter((item)=> {
    //   return item.name.includes(event.query);
    // })
  }

  getItemList() {
    const res = this.itemService.list();
    console.log("itemList: ", res);
    return res;
  }

  getPurchaseList() {
    const res = this.purchaseService.list();
    // let count = 1;
    // return res.map((item: any)=> {
    //   item.id = count;
    //   count++;
    //   return item;
    // })
    return res;
  }

  itemSerialAutoComplete(event: IAutoCompleteSearch) {
    this.itemSerialSuggList = this.itemList.filter((item) => {
      return item.serialNo.includes(event.query);
    })
  }

  updateTotalPrice() {
    let res = 0;
    for(let item of this.itemViewList) {
      res += item.price * item.amount;
    }
    this.totalPrice = res;
  }

  addToPurchaseItemList() {
    let id = this.newItemModel.id;
    if(this.selectedItemModel.name !== this.newItemModel.name && this.selectedItemModel.serialNo !== this.newItemModel.serialNo) {
      id = 0;
    }
    const itemView: IItemView = {
      itemName: this.newItemModel.name,
      itemNo: this.newItemModel.serialNo,
      amount: this.amount,
      price: this.price,
      itemId: id,
      itemNote: this.itemNote,
      venderId: this.selectedVender.id,
      color: this.color,
      size: this.size,
      model: this.model
      
    }
    this.amount = 1;
    this.price = 0;
    this.itemViewList.push(itemView);
    this.updateTotalPrice();

  }

  buildPurchaseItem(itemId: number, item: IItemView) {
    const purchaseItem: IPurchaseItem = {
      itemId: itemId,
      amount: item.amount,
      price: item.price,
      purchaseId: 0,
      size: this.size,
      color: this.color,
      model: this.model,
      note: this.itemNote
    }
    return purchaseItem;
  }

  addPriceHistory(itemId: number, currentPrice: number) {
    const res = this.itemPriceService.getPriceHistoryList(itemId);
    console.log("addPriceHistory", res);
    const dateStr = getOffsetDateStr(new Date())
    if(res.length === 0) {
      if(currentPrice !==0) {
        this.itemPriceService.addPrice(currentPrice, itemId, dateStr);
      }
    } else {
      const priceItem = res[0];
      if(currentPrice !== priceItem.price) {
        // add new price
        if(currentPrice !==0) {
          this.itemPriceService.addPrice(currentPrice, itemId, dateStr);

        }
      }
    }



  }

  addNewItem() {
    const purchaseItemList: Array<IPurchaseItem> = [];

    for(let item of this.itemViewList) {
      if(item.itemId ===0) {
        const addItem: IItem = {
          // id: item.itemId,
          name: item.itemName,
          serialNo: item.itemNo,
          venderId: item.venderId
        };
        const insertedId = this.itemService.add(addItem);
        console.log("insertedId: ", insertedId);
        // add new purchase to this.purchaseList
        const purchaseItem = this.buildPurchaseItem(insertedId, item);

        purchaseItemList.push(purchaseItem);
        this.addPriceHistory(insertedId, item.price);


      } else {
        const purchaseItem = this.buildPurchaseItem(item.itemId, item);
        purchaseItemList.push(purchaseItem);
        this.addPriceHistory(item.itemId, item.price);


      }
    }
    return purchaseItemList;
  }

  // 如果商品不存在，先加入商品
  // 檢查價格歷史， 若沒有歷史價格and輸入價格不為0, 則新增
  addNewPurchase() {
    // add new item first
    this.purchaseItemList = this.addNewItem();
    const dateStr = getOffsetDateStr(this.purchaseDate);

    const data: IPurchase = {
      serialNo: this.purchaseSerialNo,
      createDate: dateStr,
      payment: this.payment,
      totalPrice: this.totalPrice,
      note: this.purchaseNote,
      isDone: 0
    }

    const body: IAddPurchase = {
      purchase: data,
      purchaseItem: this.purchaseItemList
    };
    console.log("body: ", body);
    this.purchaseService.add(body);
    this.purchaseList = this.getPurchaseList();
    this.purchaseItemList = [];
    this.itemViewList = [];
    this.newItemModel = new Item();
    this.toastService.ok();


  }

  getPriceHistoryList(itemId: number) {
    const res = this.itemPriceService.getPriceHistoryList(itemId);
    console.log("res: ", res);
    if (res.length === 0) {
      this.priceHint = "無歷史紀錄";
      this.price = 0;
    } else {
      this.price = res[0].price;
    }
    this.priceHistoryList = res;
  }


  // addToInventory(item: IPurchaseItemVO) {
  //   console.log("item: ", item);
  //   const body: IInventory = {
  //     itemId: item.itemId,
  //     returnDate: getOffsetDateStr(new Date()),
  //     amount: item.amount,
  //     price: item.price,
  //     purchaseId: 0
  //   };
  //   this.inventoryService.add(body);
  // }

  // searchTest() {
  //   // const res = this.purchaseService.searchByVenderId(1);
  //   const startStr = getOffsetDateStr(this.startDate);
  //   const endStr = getOffsetDateStr(this.endDate);
  //   const res = this.searchHelper.search(startStr, endStr);
  //   console.log("search: ", res);
  //   this.purchaseList = res;
  // }

  searchTypeUpdate(event: ICategory) {
    console.log(event);
    if(event.code === "purchaseNo") {
      this.searchHelper = this.purchaseSearch;
    } else {
      this.searchHelper = this.venderSearch;
    }

  }

  venderAutoComplete(event: any) {
    const val = event.query;
    console.log("val: ", val);
    if(val !== "") {
      // const payload: IFieldSearch = {
      //   field: this.selectedSearchHistoryType.code,
      //   val: val
      // }
      // const res = this.venderService.listByLikeField(payload);
      const res = this.searchHelper.autoUpdate(val, this.selectedSearchHistoryType.code);
      this.venderSuggList= res;

    }
  }

  purchaseAutoComplete(event: any) {
    const val = event.query;
    console.log("val: ", val);
    if(val !== "") {
      // const payload: IFieldSearch = {
      //   field: "serialNo",
      //   val: val
      // }
      // const res = this.purchaseService.listByLikeField(payload);
      const res = this.searchHelper.autoUpdate(val, "serialNo");
      this.purchaseSuggList= res;

    }
  }

  removeItem(selectedItem: IItemView) {
    this.itemViewList = this.itemViewList.filter((item)=> {
      return selectedItem.itemId !== item.itemId;
    })
  }

}
