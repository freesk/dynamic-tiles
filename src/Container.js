class Container {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._elements = [];
    this._value = 0;
  }
  // Set new position
  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }
  // Set new size
  setSize(width, height) {
    this._width = width;
    this._height = height;
  }
  // Add an element
  push(elem) {
    this._value++;
    elem._parent = this;
    this._elements.push(elem);
  }
  // Set a new value of required elements
  setValue(value) {
    this._value = value;
  }
  // Reset
  reset() {
    this._value = 0;
    this._elements = [];
  }
  // Update its elements
  update() {
    // try.. catch.. for an error that occurs for the last tile in the main array. See main.js for the main array
    try {
      this._elements.forEach((item, i) => {
        let elem = this._elements[i];
        elem._width = this._width;
        elem._height = this._height / this._elements.length;
        elem._x = this._x;
        elem._y = this._y + this._height / this._elements.length * i;
        elem.update();
      });
    } catch (e) {
      // console.log(e);
    }
  }
}
