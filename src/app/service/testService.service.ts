import { ElectronService } from 'ngx-electron';
import { testStr } from '../shared/apiString';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TestService {

    constructor(private _electronService: ElectronService) { }

    public test123() {
        return this._electronService.ipcRenderer.sendSync(testStr.test, "qq123");

    }
}