class Container {

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._elements = [];
    this._value = 0;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }

  setSize(width, height) {
    this._width = width;
    this._height = height;
  }

  push(elem) {
    elem._parent = this;
    this._elements.push(elem);
  }

  setValue(value) {
    this._value = value;
  }

  takeIn(arr, int) {
    this._value += int;
    // Repeat int times
    for (let i = 0; i < int; i++) {
      // Save the first element from the passed array
      let elem = arr[0];
      // Remove the element from the passed array
      arr.splice(0, 1);
      // Save itself into the element
      elem._parent = this;
      // Push the element into its array
      this._elements.push(elem);
    }
  }

  takeOut(arr, int) {
    this._value -= int;
    // Repeat int times
    for (let i = 0; i < int; i++) {
      // Save the last element index
      let index = this._elements.length;
      // Save the last element
      let elem = this._elements[index];
      // Remove itself from the element
      elem._parent = null;
      // Remove the element from the array
      this._elements.splice(index, 1);
      // Push the element to the passed array
      arr.push(elem);
    }
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
