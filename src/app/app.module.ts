import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import { ToastModule } from "primeng/toast";
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';
import {MessageService, ConfirmationService} from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';





import { NgxElectronModule } from 'ngx-electron';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { VenderIndexComponent } from './pages/vender-index/vender-index.component';
import { ItemIndexComponent } from './pages/item-index/item-index.component';
import { OrderIndexComponent } from './pages/order-index/order-index.component';
import { PurchaseIndexComponent } from './pages/purchase-index/purchase-index.component';
import { ItemViewComponent } from './pages/item-index/item-view/item-view.component';
import { InventoryIndexComponent } from './pages/inventory-index/inventory-index.component';
// import { PurchaseIndexComponent } from './purchase-index-2/purchase-index.component';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoVenderComponent } from './shared/components/auto-vender/auto-vender.component';
import { PurchaseSearchComponent } from './pages/purchase-index/purchase-search/purchase-search.component';
import { OrderManagerComponent } from './pages/order-manager/order-manager.component';
import { PurchaseManagerComponent } from './pages/purchase-manager/purchase-manager.component';
import { OrderViewComponent } from './pages/order-manager/order-view/order-view.component';
import { EditItemComponent } from './shared/components/edit-item/edit-item.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    VenderIndexComponent,
    ItemIndexComponent,
    OrderIndexComponent,
    ItemViewComponent,
    PurchaseIndexComponent,
    InventoryIndexComponent,
    AutoVenderComponent,
    PurchaseSearchComponent,
    OrderManagerComponent,
    PurchaseManagerComponent,
    OrderViewComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    CalendarModule,
    InputTextModule,
    ToastModule,
    NgxElectronModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    DividerModule,
    RadioButtonModule,
    MessagesModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    CardModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
