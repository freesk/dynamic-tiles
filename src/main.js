// import { Container } from "Container";

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
  let theCopy = theArrayOfTheTiles.slice();
  let i = 0;

  while (theCopy.length) {

    let container = theArrayOfTheContainers[i];
    let tile = theCopy[0];

    container.clear();
    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);
    container.push(tile);

    if(tile._value == 2) {
      let tile2 = theCopy[1];
      if(tile2) {
        tile2.setTileValue(2)
        container.push(tile2);
        theCopy.splice(0, 2);
      }
    } else if(tile._value == 1) {
      let tile2 = theCopy[1];
      let tile3 = theCopy[2];
      if(tile2) {
        tile2.setTileValue(1);
        container.push(tile2);
      }
      if(tile3) {
        tile3.setTileValue(1);
        container.push(tile3);
      }
      theCopy.splice(0, 3);
    } else {
      theCopy.splice(0, 1);
      // Need to pull out elements and place it back to the array
    }

    container.update();

    if(column == maxElementsInTheLine - 1) {
      row++;
      column = 0;
    } else {
      column++;
    }

    i++;

  }

}

function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
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
    this._parent = null;

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

  setTileValue(index) {
    if(index == this._currentButtonIndex) return false;
    this._buttons[this._currentButtonIndex].setAsInactive();
    this._buttons[index].setAsActive();
    this._value = this._buttons[index]._value;
    this._currentButtonIndex = index;
    return true;
  }

  catchTheClick(e) {
    const index = this._buttons.findIndex(isClickedButton);

    function isClickedButton(element) {
      return element._htmlElem == e.target;
    }

    if(this.setTileValue(index)) updateTheContainers();
  }

  update() {
    this._htmlElem.style.width = this._width + 'px';
    this._htmlElem.style.height = this._height + 'px';
    this._htmlElem.style.left = this._x + 'px';
    this._htmlElem.style.top = this._y + 'px';
  }

}
