class Items {

  // constructor() {
  //   this.items = [];
  // }
  static itemsList = [];

  static all() {
    return Items.itemsList;
  }

  static add(newItem) {
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