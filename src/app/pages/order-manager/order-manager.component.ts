import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/orderService.service';
import { IOrderIdVO, IOrderVO, OrderItemVO } from '../../shared/vo';
import { ICategory, IVender, Vender, Order, Item, OrderItem, IOrder, IOrderItem } from '../../shared/model';
import { getOffsetDateStr } from '../../shared/utils/dateHelper';
import { ToastService } from '../../service/toastService.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { IFieldSearch } from 'src/app/shared/plyload';


@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.sass']
})
export class OrderManagerComponent implements OnInit {

  categoryList: Array<ICategory> = [
    { name: "單號", code: "serialNo" },
    { name: "購買人", code: "purchaser" },
    { name: "購買人電話", code: "purchaserPhone" }, 
    { name: "收貨人", code: "recipient" }, 
    { name: "收貨人電話", code: "recipientrPhone" }, 
    { name: "地址", code: "address" }
  ];
  selectedCategory: ICategory = { name: "單號", code: "serialNo" };
  orderList: Array<IOrderVO> = [];
  selectedOrderModel: Order = new Order();
  orderSuggList: Array<Order> = [];
  returnDate: Date = new Date();
  arriveDate: Date = new Date();

  startDate: Date = new Date();
  endDate: Date = new Date();
  isOrderViewOn: boolean = false;
  orderId: number = 1;
  orderView: Order = new Order();
  returnItemList: Array<OrderItem> = [];

  modalTitle: string = "";
  searchSelectedVal: string = "";
  constructor(private orderService: OrderService, private toastService: ToastService,
    private confirmationService: ConfirmationService,) {

  }

  ngOnInit(): void {
    // this.getOrderVOList();
  }

  getOrderVOList() {
    const res = this.orderService.list();
    console.log("res: ", res);
    this.orderList = res;

  }

  selectUpdate(item: any) {
    console.log("select: ", item);
  }
  valuleSelected(event: any) {
    console.log(event);
    this.searchSelectedVal = event[this.selectedCategory.code];
  }

  orderAutoComplete(event: any) {
    const val = event.query;
    if(val !== "") {
      const payload: IFieldSearch = {
        field: this.selectedCategory.code,
        val: val
      }
      // console.log(payload);
      const res = this.orderService.listByLikeField(payload);
      this.orderSuggList = res;
      this.searchSelectedVal = val;
      // this.orderList = res;


    }
   
  }

  copyOrderItem(orderItemVO: any): OrderItem {
    const orderItem = new OrderItem() as any;
    for (let [k, v] of Object.entries(orderItem)) {
      orderItem[k] = orderItemVO[k];
    }
    return orderItem;
  }

  returnItem(orderItemVO: OrderItemVO) {
    const returnStr = getOffsetDateStr(this.returnDate);
    const orderItem = this.copyOrderItem(orderItemVO);
    orderItem.returnDate = returnStr;
    console.log(orderItem);
    this.orderService.returnItem(orderItem);
    this.toastService.ok();
    // this.getOrderVOList();
    this.searchOrderClick();

  }

  returnClick(orderItemVO: OrderItemVO) {
    this.modalTitle = "退貨日期";
    this.confirmationService.confirm({
      message: '退貨確認?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.returnItem(orderItemVO);
        
      },
      reject: () => {

      }

    });
  }

  setArrive(orderItemVO: OrderItemVO) {
    const returnStr = getOffsetDateStr(this.arriveDate);
    const orderItem = this.copyOrderItem(orderItemVO);
    orderItem.arriveDate = returnStr;
    this.orderService.setArrive(orderItem);
    this.toastService.ok();
    this.searchOrderClick();


  }

  setArriveClick(orderItemVO: OrderItemVO) {
    this.modalTitle = "送達日期";
    this.confirmationService.confirm({
      message: '送達確認?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.setArrive(orderItemVO);
        
      },
      reject: () => {

      }

    });
  }
  open(orderId: number) {
    this.isOrderViewOn = true;
    const res = this.orderService.get(orderId);
    console.log("order: ", res);
    this.orderView = res;
  }

  orderViewClose() {
    this.isOrderViewOn = false;
   
  }

  searchClick() {
    const startStr = getOffsetDateStr(this.startDate);
    const endStr = getOffsetDateStr(this.endDate);

    const res = this.orderService.searchReturnList(startStr, endStr);
    console.log("return list: ", res);
    this.returnItemList = res;
  }

  searchOrderClick() {
    const payload: IFieldSearch = {
      field: this.selectedCategory.code,
      val: this.searchSelectedVal
    }
    console.log("pay: ", payload);
    const res = this.orderService.listIOrderVOByField(payload);
    console.log("res: ", res);
    this.orderList = res;

  }

}
