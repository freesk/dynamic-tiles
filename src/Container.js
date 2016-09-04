class Container {

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._elements = [];
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }

  setSize(width, height) {
    this._width = width;
    this._height = height;
  }

  clear() {
    this._elements = [];
  }

  push(elem) {
    this._elements.push(elem);
  }

  update() {
    let length = this._elements.length;
    for (let i = 0; i < length; i++) {
      let elem = this._elements[i];
      elem._width = this._width;
      elem._height = this._height / length;
      elem._x = this._x;
      elem._y = this._y + this._height / length * i;
      elem.update();
    }
  }
}
