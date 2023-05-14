import { Component, OnInit } from '@angular/core';
import { IInventory, IOrder, IOrderItem, Inventory, Item, Order, OrderItem, Vender } from '../../shared/model';
import { InventoryService } from '../../service/inventoryService.service';
import { IInventoryItemVO, IInventoryVO } from '../../shared/vo';
import { IAddOrder, IFieldSearch} from '../../shared/plyload';
import { OrderService } from '../../service/orderService.service';
import { ItemService } from '../../service/itemService.service';
import { EditItemController, EditItem} from '../../shared/utils/editItemHelper';
import { ToastService } from '../../service/toastService.service';

interface IOrderItemVO {
  itemId: number
  price: number
  amount: number
  note: string
  orderId: number
  itemName: string
  itemNo: string
}

@Component({
  selector: 'app-inventory-index',
  templateUrl: './inventory-index.component.html',
  styleUrls: ['./inventory-index.component.sass']
})
export class InventoryIndexComponent implements OnInit {

  inventoryList: Array<IInventoryVO> = [];
  inventorySearchList: Array<IInventoryItemVO> = [];

  orderItemVOList: Array<IOrderItemVO> = [];
  orderNo: string = "";
  customerName: string = "";
  address: string = "";
  phone: string = "";
  totalPrice: number = 0;
  itemNo: string = "";

  selectedVender: Vender = new Vender();
  selectedItemModel: Item = new Item();
  itemNameSuggList: Array<Item> = [];
  inventoryItemBuf: Inventory = new Inventory();
  editController: EditItemController = new EditItemController();



  constructor(private inventoryService: InventoryService, private orderService: OrderService,
     private itemService: ItemService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.inventoryList = this.getInventoryList();
  }

  getInventoryList(): Array<any> {
    const res: Array<IInventoryVO> = this.inventoryService.list();
    const qq = res.map((item, index)=> {
      // return item.id = index;
      this.editController.add(item.inventory.id);
      return item;
    })
    return qq
  }

  selectedVenderUpdate(model: Vender) {
    this.selectedVender = model;
  }

  searchItemName(event: any) {
    console.log(event);
    const val = event.query;
    if(val !== "") {
      const payload: IFieldSearch = {
        field: "name",
        val: val
      }
      this.itemNameSuggList = this.itemService.listByLikeFieldAndVenderId(payload, this.selectedVender.id);
    } else {
      this.itemNameSuggList = [];
    }
  }

  searchClick() {
    const res = this.inventoryService.searchByItemId(this.selectedItemModel.id);
    console.log("res: ", res);
    this.inventoryList = res;
  }

  copyVal(source: any, target: any) {
    for(let [k,v] of Object.entries(source)) {
      target[k] = v;
    }
  }

  editClick(item: Inventory) {
    console.log("edit click", item);
    this.editController.edit(item.id, item);

  }

  editCancel(item: Inventory) {
    console.log("cancel click", item);
    this.editController.cancel(item.id, item);


  }

  editConfirm(item: Inventory) {
    this.editController.confirm(item.id, item);
    console.log("confirm", item);
    this.inventoryService.setAmount(item.amount, item.id);
    this.toastService.ok();
    this.getInventoryList();

  }

}
