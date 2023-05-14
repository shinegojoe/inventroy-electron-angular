import { Component, OnInit } from '@angular/core';
import { TestService } from '../../service/testService.service';
import { VenderService } from '../../service/venderService.service';
import { ICategory, IVender, Vender } from '../../shared/model';
import { IFieldSearch } from 'src/app/shared/plyload';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../service/toastService.service';
import { EditItemController } from '../../../app/shared/utils/editItemHelper';


@Component({
  selector: 'app-vender-index',
  templateUrl: './vender-index.component.html',
  styleUrls: ['./vender-index.component.sass']
})
export class VenderIndexComponent implements OnInit {


  searchTypeList: Array<ICategory> = [{ name: "序號", code: "serialNo" }, { name: "名稱", code: "name" }];
  selectedSearchType: ICategory = { name: "序號", code: "serialNo" };
  name: string = "";
  serialNo: string = "";
  phone: string = "";
  address: string = "";
  note: string = "";

  selectedItem: Vender = new Vender();

  venderList: Array<Vender> = [];
  venderSuggList: Array<Vender> = [];
  editItemController: EditItemController = new EditItemController();
  controllerId: number = 0;

  constructor(private venderService: VenderService, private toastService: ToastService) {
   this.editItemController.add(this.controllerId);
  }



  ngOnInit(): void {
    // this.getVenderList();
  }

  clearInput() {
    this.name = "",
    this.serialNo = "",
    this.address = "",
    this.phone = "",
    this.note = ""
  }

  getVenderList() {
    const res = this.venderService.list();
    console.log("res: ", res);
    this.venderList = res;

  }

  async addVender() {
    if(this.name === "" && this.serialNo === "") {
      this.toastService.custom('warn', '名稱序號不得同時為空');
      return;
    }
    const body: IVender = {
      name: this.name,
      serialNo: this.serialNo,
      address: this.address,
      phone: this.phone,
      note: this.note,
    };
      const res = await this.venderService.add(body);
      console.log("res: ", res);
      this.toastService.ok();
      this.clearInput();
  }

  venderAutoComplete(event: any) {
    console.log(event);
    this.selectedItem = event;
   
  }

  checkIsSelected() {
    return this.selectedItem.id !==0 && typeof this.selectedItem !== "string";
  }

  editClick(vender: Vender) {
    this.editItemController.edit(this.controllerId, vender);
  }

  editConfirm(vender: Vender) {
    this.editItemController.confirm(this.controllerId, vender);
    this.venderService.update(vender);
    this.toastService.ok();

  }

  editCancel(vender: Vender) {
    this.editItemController.cancel(this.controllerId, vender);

  }

}
