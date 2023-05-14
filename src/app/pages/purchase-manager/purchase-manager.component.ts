import { Component, OnInit } from '@angular/core';
import { IItem, Item, IPurchaseItem, Vender, ICategory, Purchase, PurchaseItem } from '../../shared/model';
import { IPurchaeVO, PurchaseItemVO } from 'src/app/shared/vo';
import { IPurchaseSearch, PurchaseSearch, VenderSearch } from '../purchase-index/purchaseHelper';
import { InventoryService } from 'src/app/service/inventoryService.service';
import { ItemPriceService } from 'src/app/service/itemPriceService.service';
import { ItemService } from 'src/app/service/itemService.service';
import { PurchaseService } from 'src/app/service/purchaseService.service';
import { ToastService } from 'src/app/service/toastService.service';
import { VenderService } from 'src/app/service/venderService.service';
import { getOffsetDateStr } from '../../shared/utils/dateHelper';
import { EditItemController, EditItem } from '../../shared/utils/editItemHelper';


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
  selector: 'app-purchase-manager',
  templateUrl: './purchase-manager.component.html',
  styleUrls: ['./purchase-manager.component.sass']
})
export class PurchaseManagerComponent implements OnInit {

  startDate: any;
  endDate: any;
  purchaseDate: any

  purchaseNo: string = "";
  amount: number = 1;
  
  payment: string = "";
  purchaseSerialNo: string = "";
  totalPrice: number = 0;
  purchaseTotalPrice: number = 0;


  purchaseList: Array<IPurchaeVO> = [];
  // venderList: Array<any> = [];
  selectedVender: Vender = new Vender();
  filterType: string = "all";



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

  editPurchaseItemBuf: any
  purchaseListBuf: Array<IPurchaeVO> = [];
  editController: EditItemController = new EditItemController();


  constructor(private purchaseService: PurchaseService,  private venderService: VenderService, private toastService: ToastService) {
      this.venderSearch = new VenderSearch(this.venderService, this.purchaseService);
      this.purchaseSearch = new PurchaseSearch(this.purchaseService);
      this.searchHelper = this.venderSearch;
    }

  ngOnInit(): void {
    this.dateInit();

    this.getPurchaseList();
    

  }

  dateInit() {
    let today = new Date();
    let lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    this.startDate = lastMonth;
    this.endDate = today;
  }

  getPurchaseList() {
    const res = this.purchaseService.list();
    for(let r of res) {
      const newPurchaseItemList = r.purchaseItemList.map((item: PurchaseItemVO)=> {
        // item.isEdit = false;
        // const editItem = new EditItem();
        //this.editController.map[item.purchaseId]= editItem;
        this.editController.add(item.purchaseId);
        return item;
      })
      r.purchaseItemList = newPurchaseItemList
      
    }
    console.log("purchaseList: ", res);
    this.purchaseList = res;
    this.purchaseListBuf = JSON.parse(JSON.stringify(res));
    
  }

  editClick(purchaseItem: PurchaseItemVO) {
    this.editController.edit(purchaseItem.purchaseId, purchaseItem)
  }



 

  editCancel(purchaseItem: PurchaseItemVO) {
    console.log(purchaseItem);
    this.editController.cancel(purchaseItem.purchaseId, purchaseItem);
  }

  buildPurchaseItem(purchaseItem: PurchaseItemVO): PurchaseItem {
    const res = new PurchaseItem();
    res.id = purchaseItem.purchaseId;
    res.itemId = purchaseItem.itemId;
    res.amount = purchaseItem.amount;
    res.price = purchaseItem.price;
    res.purchaseId = purchaseItem.purchaseId;
    res.color = purchaseItem.color;
    res.model = purchaseItem.model;
    res.size = purchaseItem.size;
    res.note = purchaseItem.note;
    return res;
  }

  editConfirm(purchaseItem: PurchaseItemVO) {
  console.log("edit: ", purchaseItem);
  this.editController.confirm(purchaseItem.purchaseId, purchaseItem);
  const item = this.buildPurchaseItem(purchaseItem);
  const res = this.purchaseService.updatePurchaseItem(item);
  console.log("res: ", res);
  if(res.err) {
    this.toastService.err();
  } else {
    this.toastService.ok();
  }
  this.getPurchaseList();
  }



  searchTypeUpdate(event: ICategory) {
    console.log(event);
    if(event.code === "purchaseNo") {
      this.searchHelper = this.purchaseSearch;
    } else {
      this.searchHelper = this.venderSearch;
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

  searchTest() {
    // const res = this.purchaseService.searchByVenderId(1);
    const startStr = getOffsetDateStr(this.startDate);
    const endStr = getOffsetDateStr(this.endDate);
    console.log("start: ", startStr, "end: ", endStr);
    const res = this.searchHelper.search(startStr, endStr);
    console.log("search: ", res);
    this.purchaseList = res;
    this.listFilterUpdate(this.filterType);

    // this.dateInit();
    
  }

  checkPurchaseState(isDone: number):string {
    if(isDone === 0) {
      return "未完成";
    } else {
      return "已完成";
    }
  }

  setIsDone(purchase: Purchase) {
    this.purchaseService.setIsDone(purchase.id);
    this.toastService.ok();
    this.getPurchaseList();

  }

  listFilterUpdate(event: any) {
    console.log("event: ", event);
    if(event ==="all") {
      this.purchaseList = this.purchaseListBuf.map((item)=> {
        return item;
      })

    } else if(event === "completed") {
      this.purchaseList = this.purchaseListBuf.filter((item)=> {
        return item.purchase.isDone === 1;
      })


    } else if(event === "uncompleted") {
      this.purchaseList = this.purchaseListBuf.filter((item)=> {
        return item.purchase.isDone === 0;
      })
    }
  }

  checkStateTextStyle(isDone: number) {
    if(isDone == 0) {
      return "text-wran";
    } else {
      return "text-done";
    }
  }

  searchAllUnPayList() {
    const res = this.purchaseService.searchAllUnpay();
    this.purchaseList = res;

  }

}
