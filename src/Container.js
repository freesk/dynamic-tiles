class Container {

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._elements = [];
    this._counter = 0;
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

  count() {
    this._counter = 0;
    this._elements.map(item => this._counter += item._value);
  }

  fill() {

  }

  update() {
    this._elements.forEach((item, i) => {
      let elem = this._elements[i];
      elem._width = this._width;
      elem._height = this._height / this._elements.length;
      elem._x = this._x;
      elem._y = this._y + this._height / this._elements.length * i;
      elem.update();
    });
  }
}
