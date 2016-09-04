
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
    const tile = new Tile();
    const container = new Container();

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

  const windowSize = getWindowSize();
  const containerWidth = windowSize.width / maxElementsInTheLine;
  let column = 0;
  let row = 0;

  for(let i = 0; i < theArrayOfTheContainers.length; i++) {

    let container = theArrayOfTheContainers[i];
    let theCopy = theArrayOfTheTiles.slice();

    container.clear();
    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);

    let tile = theCopy[0];
    container.push(tile);
    theCopy.splice(0, 1);

    console.log(container.calculateTheSum());

    // console.group();
    // console.log(theCopy[0]._value);
    // console.log(theCopy[1]._value);
    // console.log(theCopy[2]._value);
    // console.groupEnd();

    // if(tile._value == 1) {
      // theCopy[1]._value = 1;
      // container.push(theCopy[1]);
      // theCopy[2]._value = 1;
      // container.push(theCopy[2]);
      // theCopy.splice(0, 3);
    // }

    container.updateElements();

    if(column == maxElementsInTheLine - 1) {
      row++;
      column = 0;
    } else {
      column++;
    }

  }

  console.log(theArrayOfTheContainers);

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
    this._htmlElem.innerHTML = text;
    this._value = value;
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
    this._value = 3;
    this._currentButtonIndex = 0;

    let index = 0;
    let group = document.createElement('div');
    group.className = 'group';

    let btn1 = new Button('1/1', 'button btn1', 3, this);
    let btn2 = new Button('1/2', 'button btn1', 2, this);
    let btn3 = new Button('1/3', 'button btn1', 1, this);

    this._buttons.push(btn1, btn2, btn3);

    for (let i = 0; i < this._buttons.length; i++) {
      let btn = this._buttons[i];
      btn._htmlElem.addEventListener('click', e => this.catchTheClick(e));
      group.appendChild(btn._htmlElem);
    }

    this._htmlElem.appendChild(group);
  }

  catchTheClick(e) {
    const index = this._buttons.findIndex(isClickedButton);

    function isClickedButton(element) {
      return element._htmlElem == e.target;
    }

    if(index == this._currentButtonIndex) return;

    this._buttons[this._currentButtonIndex].setAsInactive();
    this._buttons[index].setAsActive();
    this._value = this._buttons[index]._value;
    this._currentButtonIndex = index;

    updateTheContainers();
  }

  update() {
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
    });
    return counter;
  }

  setSize(width, height) {
    this._width = width;
    this._height = height;
  }

  clear() {
    this._elements = [];
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
      elem._height = (this._height / maxElementsPerContainer) * elem._value;
      // console.group();
      // console.log(elem);
      // console.groupEnd()
      elem.update();
    }
  }
}
