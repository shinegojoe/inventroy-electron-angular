
const test = "test";
const vender = "vender";
const item = "item";
const itemPrice = "itemPrice";
const purchase = "purchase";
const purchaseItem = "purchaseItem";
const inventory = "inventory";
const order = "order";
const orderItem = "orderItem";

const testStr = {
    test: `${test}/test123`
};

const venderStr = {
    list: `${vender}/list`,
    add: `${vender}/add`,
    update: `${vender}/update`,
    listByLikeField: `${vender}/listByLikeField`
}

const itemStr = {
    list: `${item}/list`,
    setIsCurrentFalse: `${item}/setIsCurrent`,
    add: `${item}/add`,
    getHistoryList: `${item}/getHistoryList`,
    upgradeItem: `${item}/upgrateItem`,
    listByVenderId: `${item}/listByVenderId`,
    listByLikeField: `${item}/listByLikeField`,
    listByLikeFieldAndVenderId: `${item}/listByLikeFieldAndVenderId`
}

const itemPriceStr = {
    getPriceHistoryList: `${itemPrice}/getPriceHistoryList`,
    addPrice: `${itemPrice}/addPrice`
}

const purchaseStr = {
  list: `${purchase}/list`,
  add: `${purchase}/add`,
  searchByVenderId: `${purchase}/searchByVenderId`,
  searchByPurchaseNo: `${purchase}/searchByPurchaseNo`,
  listByLikeField: `${purchase}/listByLikeField`,
  purchaseAuto: `${purchase}/purchaseAuto`,
  setIsDone: `${purchase}/setIsDone`,
  searchAllUnpay: `${purchase}/searchAllUnpay`
}

const purchaseItemStr = {
  list: `${purchaseItem}/list`,
  add: `${purchaseItem}/add`,
  update: `${purchaseItem}/update`

}

const inventoryStr = {
  list: `${inventory}/list`,
  add: `${inventory}/add`,
  searchByItemNo: `${inventory}/searchByItemNo`,
  searchByItemId: `${inventory}/searchByItemId`,
  updateAmount: `${inventory}/updateAmount`
}

const orderStr = {
  list: `${order}/list`,
  add: `${order}/add`,
  get: `${order}/get`,
  listByItemField: `${order}/listByItemField`,
  listByLikeField: `${order}/listByLikeField`,
  checkSuck: `${order}/checkSuck`,
  listIOrderVOByField: `${order}/listIOrderVOByField`,
  update: `${order}/update`
  

}

const orderItemStr = {
  list: `${orderItem}/list`,
  add: `${orderItem}/add`,
  returnItem: `${orderItem}/returnItem`,
  setArrive: `${orderItem}/setArrive`,
  returnListByDate: `${orderItem}/returnListByDate`
}



export { testStr, venderStr, itemStr, itemPriceStr, purchaseStr, purchaseItemStr,
inventoryStr, orderStr, orderItemStr };
