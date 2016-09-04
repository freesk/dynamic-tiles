
window.addEventListener('load', init);

const num = 12;
const maxWidth = 3;

var theArray = [];

function init() {
  var body = document.getElementsByTagName('body')[0];
  for (let i = 0; i < num; i++) {
    let tile = new Tile();
    body.appendChild(tile._htmlElem);
    theArray.push(tile);
  }
  updateTheArray();
}

function updateTheArray() {

  let col = 0;
  let row = 0;
  let array = theArray.slice();

  for (let i = 0; i < maxWidth.length; i++) {

    let column = new Column();

    for (let i = 0; i < array.length; i++) {
      let tile = array[i];
    }

  }
}

class Button {

  constructor(text = "", className = "button", value = 0, parent) {
    this._htmlElem = document.createElement('div');
    this._htmlElem.className = className;
    this._htmlElem.addEventListener('click', catchTheClick);
    this._htmlElem.innerHTML = text;
    this._value = value;
    this._parent = parent;
    this._parent.htmlElem.appendChild(this._htmlElem);
    this._parent.buttons.push(this);
  }

  catchTheClick(e) {
    // If it's not a current active button
    this.parent._buttons.map(button => {


    });
  }

  setAsActive() {
    this._htmlElem.classList.add('active');
  }

  setAsInactive() {
    this._htmlElem.classList.remove('active');
  }

}

class Tile {

  constructor(x = 0, y = 0, width = 0, height = 0, color = "#eee") {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._htmlElem = document.createElement('div');
    this._htmlElem.style.backgroundColor = color;
    this._htmlElem.className = "tile";
    this._buttons = [];
    this._value = 0;

    let btn1 = new Button('1/1', 'button btn1', 3, this);
    let btn2 = new Button('1/2', 'button btn1', 2, this);
    let btn3 = new Button('1/3', 'button btn1', 1, this);
  }

  setValue(value) {
    this._value = value;
  }

  update() {
    this._htmlElem.style.width = this._width;
    this._htmlElem.style.height = this._height;
    this._htmlElem.style.left = this._x;
    this._htmlElem.style.top = this._y;
  }

}

class Column {

  constructor(width, height) {
    this._x = 0;
    this._y = 0;
    this._width = width;
    this._height = height;
    this._elements = [];
  }

  push(elem) {
    const maxLength = 3;
    if(this._elements.length == maxLength) {
      return false;
    } else {
      this._elements.push(elem);
      this.update()
      return true;
    }
  }

  updateElements() {
    this._elements.map((elem, i) => {

      console.log(i);

      let length = this._elements.length;
      elem.x = this._x;
      elem.y = (this._height / this._elements.length) * i;
      elem.width = this._width;
      elem.height = this._height / this._elements.length;
    });
  }
}
