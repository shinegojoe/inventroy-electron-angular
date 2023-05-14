import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable({
    providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {

  }

  ok() {
    this.messageService.add({ severity: 'success', detail: '操作完成' });

  }
  err() {
    this.messageService.add({ severity: 'error', detail: '操作失敗' });

  }

  custom(level: string, msg: string) {
    this.messageService.add({ severity: level, detail: msg });

  }

}
