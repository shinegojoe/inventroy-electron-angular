const { ipcMain } = require('electron')
import { itemStr, testStr, venderStr } from '../../app/shared/apiString';
import { VenderService } from '../service/venderService';
import { IVender, Resp, Vender } from '../../app/shared/model';
import { IFieldSearch } from '../../app/shared/plyload';
import { LoggerService } from '../service/loggerService';

export class VenderController {

  logger: LoggerService
  venderService: VenderService
  constructor() {
    this.logger = LoggerService.getInstance();
    this.venderService = new VenderService();
    this.routeInit();
  }

  private routeInit() {
    // this.test123();
    this.add();
    this.listByLikeField();
    this.update();
  }

  // public test123() {
  //   ipcMain.on(venderStr.list, async (event: any, arg: any) => {
  //     const res = await this.venderService.list();
  //     event.returnValue = res;
  //   })
  // }

  add() {
    ipcMain.on(venderStr.add, async (event: any, payload: IVender) => {
      console.log("payload: ", payload);
      try {
        const data = await this.venderService.add(payload);
        const res = new Resp<any>(data);
        event.returnValue = res;
      } catch (e) {
        const msg = "add vender err!!";
        this.logger.error({msg: msg, err: e});
        event.returnValue = new Resp<string>(msg, true);
      }

    })
  }

  update() {
    ipcMain.on(venderStr.update, async (event: any, payload: Vender) => {
      try {
        const data = await this.venderService.update(payload);
        const resp = new Resp<any>(data);
        event.returnValue = resp;
      } catch (e) {
        // throw new Error("add error");
        const msg = "update vender err!!";
        this.logger.error({msg: msg, err: e});
        event.returnValue = new Resp<string>(msg, true);
      }

    })
  }


  public listByLikeField() {
    ipcMain.on(venderStr.listByLikeField, async (event: any, payload: IFieldSearch) => {
      try {
        const data = await this.venderService.listByLikeField(payload);
        const resp = new Resp<any>(data);
        event.returnValue = resp;
      } catch (e) {
        const msg = "listByLikeField vender err!!";
        this.logger.error({msg: msg, err: e});
        event.returnValue = new Resp<string>(msg, true);
      }
    })
  }
}
