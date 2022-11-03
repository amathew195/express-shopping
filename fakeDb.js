class Items {

  // constructor() {
  //   this.items = [];
  // }
  static itemsList = [];

  static all() {
    return Items.itemsList;
  }

  static add(newItem) {
    console.log('New Item Price', typeof newItem.price);
    newItem.price = newItem.price.toFixed(2);
    Items.itemsList.push(newItem);
    return newItem;
  }

  static get(itemName) {
    console.log(itemName);
    return Items.itemsList.find(item => item.name === itemName);
  }

  static delete(deleteItemName) {
    const idx = Items.itemsList.findIndex(item => item.name === deleteItemName);
    return Items.itemsList.splice(idx, 1);
  }

  static update(originalItemName, modifyItem) {
    // const idx = Items.itemsList.findIndex(item => item.name === modifyItem.name);
    // Items.itemList[idx].name = modifyItem.name;
    // Items.itemList[idx].price = modifyItem.price;
    // return Items.itemList[idx];

    const item = Items.itemsList.find(item => item.name === originalItemName);
    item.name = modifyItem.name;
    item.price = modifyItem.price.toFixed(2);
    return item;
  }

  static deleteAll() {
    Items.itemsList = [];
  }
}



module.exports = { Items };