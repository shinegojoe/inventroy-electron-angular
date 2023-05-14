import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventoryService.service';
import { OrderService } from '../../service/orderService.service';
import { ICategory, IVender, Vender, Order, Item, OrderItem, IOrder, IOrderItem, IPurchaseItem, PurchaseItem } from '../../shared/model';
import { IFieldSearch, IAddOrder } from 'src/app/shared/plyload';
import { ItemService } from "../../service/itemService.service";
import { IInventoryVO } from '../../shared/vo';
import { getOffsetDateStr } from '../../shared/utils/dateHelper';
import { ToastService } from '../../service/toastService.service';

interface IOrderItemView {
  inventoryVO: IInventoryVO 
  amount: number
  note: string
}

@Component({
  selector: 'app-order-index',
  templateUrl: './order-index.component.html',
  styleUrls: ['./order-index.component.sass']
})
export class OrderIndexComponent implements OnInit {

 

  inventoryList: Array<IInventoryVO> = [];
  selectedList: Array<IOrderItemView> = [];

  itemNo: string = "";
  autoBuf: string = "";
  autoStr: string = "";
  isAutoDone: boolean = true;
  val: string = "";
  t: number = 0;
  lenBuf: number = 0;
  orderSuggList: Array<Order> = [];
  order: Order = new Order();
  createDate: Date = new Date();
  orderPrice: number = 0;


  // orderList = [
  //   {order: {id: 1, date: "20220101", serialNo: "#00123"}, orderItemList: [
  //     {name: "莫蘭迪-3人沙發", amount: 1, state: "未出貨", price: 10000},
  //     {name: "莫蘭迪-QQ沙發", amount: 2, state: "未出貨", price: 1000}
  //   ]}
  // ]
  orderList: Array<any> = [];
  queue: Array<any> = [];

  selectedVender: Vender = new Vender();
  selectedItemModel: Item = new Item();
  itemNameSuggList: Array<Item> = [];

  constructor(private inventoryService: InventoryService, private orderService: OrderService, 
    private itemService: ItemService, private toastService: ToastService) { }



  ngOnInit(): void {
    // this.getBySerialNo();
    // this.test();
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

  addSelectedList(item: IInventoryVO) {
    const orderItemView: IOrderItemView = {
      inventoryVO: item,
      amount: 1,
      note: ""
    }
    this.selectedList.push(orderItemView);
    this.updatePrice();
  }

  copyObjWithNoId(order: any): IOrder {
    const res = {} as any;
    for(let [k, v] of Object.entries(order)) {
      if(k !== "id") {
        res[k] = v;
      }
    }

    return res;
  }

  buildOrderBody() {
    // const order: IOrder = {
    //   recipient: '',
    //   purchaser: '',
    //   driver: '',
    //   recipientPhone: '',
    //   purchaserPhone: '',
    //   driverPhone: '',
    //   address: '',
    //   orderItemId: 0,
    //   createDate: '',
    //   isClosed: 0,
    //   totalPrice: 0,
    //   note: '',
    //   serialNo: this.order.serialNo,
    //   receiptDate: '',
    //   payment: '',
    //   isSuck: 0
    // }
    const dateStr = getOffsetDateStr(this.createDate);
    this.order.createDate = dateStr;
    const order = this.copyObjWithNoId(this.order);

    const orderItemList: Array<IOrderItem> = [];
    const purchaseItemList: Array<PurchaseItem> = [];
    for(let item of this.selectedList) {
      const orderItem = this.buildOrderItemBody(item.inventoryVO, item.amount, item.note);
      purchaseItemList.push(item.inventoryVO.purchaseItem);
      orderItemList.push(orderItem);
    }

    const data: IAddOrder = {
      order: order,
      orderItemList: orderItemList
    };
    return data;
  }

  buildOrderItemBody(vo: IInventoryVO, amount: number, note: string) {
    const orderItem: IOrderItem = {
      itemId: vo.item.id,
      sellPrice: vo.purchaseItem.price,
      amount: amount,
      note: note,
      orderId: 0,
      inventoryId: vo.inventory.id,
      isArrive: 0,
      arriveDate: '',
      returnDate: ''
    }
    return orderItem;
    
  }

  addNewOrder() {
    const body = this.buildOrderBody();
    this.orderService.addOrder(body);

  }

  checkSuck(val: any, field: string) {
    if(val !== "") {
      const res = this.orderService.checkSuck(val, field);
      if(res) {
        this.toastService.custom("warn", "有機掰紀錄");
      }

    }

  }

  removeItem(selectedItem: IOrderItemView) {
    this.selectedList = this.selectedList.filter((item)=> {
      return selectedItem.inventoryVO.purchaseItem.id !== item.inventoryVO.purchaseItem.id;
    })
    this.updatePrice();

  }

  amountUpdate(event: any) {
    console.log("amount: ", event)
    setTimeout(()=> {
      this.updatePrice();

    }, 150)

  }

  updatePrice() {
    let total = 0;
    for(let item of this.selectedList) {
        const price = item.amount * item.inventoryVO.purchaseItem.price;
        total += price;
    }
    this.orderPrice = total;

  }

  orderAutoComplete(event: any) {

    // const val = event.query;
    // console.log(val);
    // if(val !== "") {
    //   const payload: IFieldSearch = {
    //     field: this.selectedCategory.code,
    //     val: val
    //   }
    //   const suggList = this.orderService.listByLikeField(payload);
    //   this.orderSuggList = suggList;
    // } else {
    //   this.orderSuggList = [];
    // }
  }

  getBySerialNo() {
    this.inventoryList = this.inventoryService.getBySerialNo(this.itemNo);
    console.log("in: ", this.inventoryList);
  }

  selectUpdate(item: any) {
    console.log("select: ", item);
  }

  test() {
    const res = this.orderService.list();
    console.log("test: ", res);
    this.orderList = res;
  }

  getData(c: string) {
    const p = new Promise((resolve, reject)=> {


      setTimeout(()=> {
        const data = [];
        for(let i=0; i<5; i++) {
          let x = "";
          for(let j=0; j<i+1; j++) {
            x += c;
          };
          data.push(x);
        }
        resolve(data);

      }, 1500)
    });
    return p
  }

  async getAutoData(current: string) {
    // while(this.queue.length > 0) {
    //   console.log("len: ", this.queue.length);
    //   const val = this.queue.shift() as string;
    //   console.log("val: ", val);
    //   if(val === current) {
    //     const res = await this.getData(val);
    //     console.log(res);

    //   }


    // }
    // let c = 0;
    // for(let q of this.queue) {
    //   console.log("c: ", c);
    //   const res = await this.getData(q);

    //   c++;
    // }
    // while(this.queue.length > 0) {
    //   console.log("len: ", this.queue.length);
    // }
  }

  checkSend() {
    console.log("cc");
    if(this.lenBuf != this.queue.length) {
      setTimeout(()=> {
        this.checkSend()
      }, 500)
    }

  }

  autoCompleteTest(val: any) {
    console.log(val);
    // const item = {val: val, t: Date.now()};
    this.queue.push(val);
    this.lenBuf = this.queue.length;
    this.checkSend();

    // if(this.queue.length<2) {
    //   // const x = this.queue.shift();
    //   const index = this.queue.length -1;
    //   const x = this.queue[index];

    //   this.getData(x).then((res)=> {
    //     console.log("res: ", res);
    //     this.queue.shift();

    //   })
    // } else {
    //   const x = this.queue.shift();

    // }

    // this.getAutoData(item);
    // this.autoBuf = item;

    // const x = this.queue.shift();
    // if(x != this.autoBuf && this.isAutoDone) {
    //   this.autoBuf = item;
    //   this.isAutoDone = false;
    //   const data = await this.getData(item);
    //   this.isAutoDone = true;
    //   console.log("data: ", data);
    // }




  }

  test123() {
    const payload = {
      field: "name",
      val: "莫蘭迪-3人沙發"
    }
    const res = this.orderService.listByItemField(payload);
    console.log("res: ", res);
  }

}
