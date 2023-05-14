import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../../service/orderService.service';
import { Order } from '../../../../app/shared/model';
import { ToastService} from '../../../service/toastService.service';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.sass']
})
export class OrderViewComponent implements OnInit {

  @Input()
  visible: boolean = false;

  @Input()
  order: Order = new Order();

  @Output()
  closeEvent = new EventEmitter();

  x: boolean = false;
  constructor(private orderService: OrderService, private toastService: ToastService) {

   }

  ngOnInit(): void {
    // this.getOrder();
   


  }

  
  onShow(event: any) {
    this.x = this.parseCheckBox(this.order.isSuck);
    console.log("x", this.x);
  }
  
  onHide(event: any) {
    // console.log(event);
    this.closeEvent.emit();
  }

  parseCheckBox(x: number) {
    if(x ===1) {
      return true;
    } else {
      return false;
    }
  }

  checkBoxChange(event: any) {
    console.log("??", event);
    this.order.isSuck = event;
  }

  updateClick() {
    const res = this.orderService.update(this.order);
    this.toastService.ok();
  }

}
