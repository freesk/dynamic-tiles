
window.addEventListener('load', init);

const numOfTiles = 12;
const maxElementsInTheLine = 3;
const containerHeight = 300;
const maxElementsPerContainer = 3;

var theArrayOfTheTiles = [];
var theArrayOfTheContainers = [];

function init() {
  let body = document.getElementsByTagName('body')[0];

  for (let i = 0; i < numOfTiles; i++) {
    let tile = new Tile();
    let container = new Container();

    theArrayOfTheTiles.push(tile);
    theArrayOfTheContainers.push(container);

    body.appendChild(tile._htmlElem);
  }

  onResize();

  window.addEventListener('resize', onResize);

}

function onResize() {
  updateTheContainers();
}

function updateTheContainers() {

  let windowSize = getWindowSize();
  let containerWidth = windowSize.width / maxElementsInTheLine;
  let column = 0;
  let row = 0;

  for(let i = 0; i < numOfTiles; i++) {

    let container = theArrayOfTheContainers[i];
    let tile = theArrayOfTheTiles[i];

    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);
    container.push(tile);
    container.updateElements();

    if(column == maxElementsInTheLine - 1) {
      row++;
      column = 0;
    } else {
      column++;
    }

  }

}

function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

class Button {

  constructor(text = "", className = "button", value = 0, parent) {
    this._htmlElem = document.createElement('div');
    this._htmlElem.className = className;
    this._htmlElem.addEventListener('click', e => this.catchTheClick(e));
    this._htmlElem.innerHTML = text;
    this._value = value;
    this._parent = parent;
    this._parent._htmlElem.appendChild(this._htmlElem);
    this._parent._buttons.push(this);
  }

  catchTheClick(e) {
    var target = this._parent._buttons.findIndex(isClickedButton);

    function isClickedButton(element, index, array) {
      return element.htmlElem == e.target;
    }

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

    console.log(this._htmlElem);

    this._htmlElem.style.width = this._width + 'px';
    this._htmlElem.style.height = this._height + 'px';
    this._htmlElem.style.left = this._x + 'px';
    this._htmlElem.style.top = this._y + 'px';
  }

}

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

  calculateTheSum() {
    let counter = 0;
    this._elements.map(element => {
      counter += element._value;
    })
  }

  setSize(width, height) {
    this._width = width;
    this._height = height;
  }

  push(elem) {
    if(this._elements.length == maxElementsPerContainer) {
      return false;
    } else {
      this._elements.push(elem);
      return true;
    }
  }

  updateElements() {
    let length = this._elements.length;
    for (let i = 0; i < length; i++) {
      let elem = this._elements[i];
      elem._x = this._x;
      elem._y = /*(this._height / (length + 1)) * i*/this._y;
      elem._width = this._width;
      elem._height = this._height/* / length*/;
      elem.update();
    }
  }
}
