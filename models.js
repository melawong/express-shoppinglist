const [ items ]  = require("./fakeDb");

class Item {

  /** Find item by name and throw error if item not found */
  static find(name) {
    let [item] = db.items.find(item => item.name == name);
    if (!item) throw new Error(`No such item: ${item}`);
    return item;
  }

  /** Returns list of all items. */
  static showAllItems() {
    return db.items;
  }

  /** Get item by name; returns item */
  static get(name) {
    return Item.find(name);
  }

  /** Add new item to items list */
  static add(item) {
    db.items.push(item);
  }

  /** Delete item; returns true or throws if cannot find. */
  static _delete(name) {
    let item = Item.find(name);
    let index = db.items.indexOf(item);
    db.items.splice(index, 1);
    return true;
  }
}

module.exports = {
  find: this.find,
  showAllItems: this.showAllItems,
  get: this.get,
  add: this.add,
  _delete: this._delete
};