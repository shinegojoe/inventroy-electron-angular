
export class EditItem  {
    isEdit: boolean = false;
    buf: any
}

export class EditItemController {
    
    map = new Map();
    constructor() {

    }

    add(id: number) {
        this.map.set(id, new EditItem());
    }

    get(id: number): EditItem {
        return this.map.get(id);
    }

    // setBuf(id: number, item: any) {
    //     const editItem = this.map.get(id);
    //     editItem.buf = {...item};
    // }

    copyVal(source: any, target: any) {
        for(let [k,v] of Object.entries(source)) {
          target[k] = v;
        }
      }

    edit(id: number, item: any) {
        const editItem = this.map.get(id);
        editItem.isEdit = true;
        editItem.buf = {...item};

    }

    cancel(id: number, item: any) {
        const editItem = this.map.get(id);
        editItem.isEdit = false;
        this.copyVal(editItem.buf, item);
    }

    confirm(id: number, item: any) {
        const editItem = this.map.get(id);
        editItem.isEdit = false;
        editItem.buf = {...item};
    }

    getIsEdit(id: number) {
        const editItem = this.map.get(id);
        return editItem.isEdit;
    }
   
}