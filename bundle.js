'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', init);

var numOfTiles = 12;
var maxElementsInTheLine = 3;
var containerHeight = 300;
var maxElementsPerContainer = 3;

var theArrayOfTheTiles = [];
var theArrayOfTheContainers = [];

function init() {
  var body = document.getElementsByTagName('body')[0];

  for (var i = 0; i < numOfTiles; i++) {
    var tile = new Tile();
    var container = new Container();

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

  var windowSize = getWindowSize();
  var containerWidth = windowSize.width / maxElementsInTheLine;
  var column = 0;
  var row = 0;
  var theCopy = theArrayOfTheTiles.slice();

  for (var i = 0; i < theArrayOfTheContainers.length; i++) {

    var tile = theCopy[0];

    if (!tile) return;

    var container = theArrayOfTheContainers[i];

    container.clear();
    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);

    container.push(tile);

    if (tile._value == 2) {
      var tile2 = theCopy[1];
      if (tile2) {
        tile2.setTileValue(2);
        container.push(tile2);
        theCopy.splice(0, 2);
      }
    } else if (tile._value == 1) {
      var _tile = theCopy[1];
      var tile3 = theCopy[2];
      if (_tile) {
        _tile.setTileValue(1);
        container.push(_tile);
      }
      if (tile3) {
        tile3.setTileValue(1);
        container.push(tile3);
      }
      theCopy.splice(0, 3);
    } else {
      theCopy.splice(0, 1);
    }

    container.updateElements();

    console.log(theArrayOfTheContainers);

    if (column == maxElementsInTheLine - 1) {
      row++;
      column = 0;
    } else {
      column++;
    }
  }

  // console.log(theArrayOfTheContainers);
}

function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

var Button = function () {
  function Button() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var className = arguments.length <= 1 || arguments[1] === undefined ? "button" : arguments[1];
    var value = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var parent = arguments[3];

    _classCallCheck(this, Button);

    this._htmlElem = document.createElement('div');
    this._htmlElem.className = className;
    this._htmlElem.innerHTML = text;
    this._value = value;
  }

  _createClass(Button, [{
    key: 'setAsActive',
    value: function setAsActive() {
      this._htmlElem.classList.add('active');
    }
  }, {
    key: 'setAsInactive',
    value: function setAsInactive() {
      this._htmlElem.classList.remove('active');
    }
  }]);

  return Button;
}();

var Tile = function () {
  function Tile() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    var _this = this;

    var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var color = arguments.length <= 4 || arguments[4] === undefined ? "#eee" : arguments[4];

    _classCallCheck(this, Tile);

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

    var index = 0;
    var group = document.createElement('div');
    group.className = 'group';

    var btn1 = new Button('1/1', 'button btn1', 3, this);
    var btn2 = new Button('1/2', 'button btn1', 2, this);
    var btn3 = new Button('1/3', 'button btn1', 1, this);

    this._buttons.push(btn1, btn2, btn3);

    for (var i = 0; i < this._buttons.length; i++) {
      var btn = this._buttons[i];
      btn._htmlElem.addEventListener('click', function (e) {
        return _this.catchTheClick(e);
      });
      group.appendChild(btn._htmlElem);
    }

    this._htmlElem.appendChild(group);
  }

  _createClass(Tile, [{
    key: 'setTileValue',
    value: function setTileValue(index) {
      if (index == this._currentButtonIndex) return false;
      this._buttons[this._currentButtonIndex].setAsInactive();
      this._buttons[index].setAsActive();
      this._value = this._buttons[index]._value;
      this._currentButtonIndex = index;
      return true;
    }
  }, {
    key: 'catchTheClick',
    value: function catchTheClick(e) {
      var index = this._buttons.findIndex(isClickedButton);

      function isClickedButton(element) {
        return element._htmlElem == e.target;
      }

      if (this.setTileValue(index)) updateTheContainers();
    }
  }, {
    key: 'update',
    value: function update() {
      this._htmlElem.style.width = this._width + 'px';
      this._htmlElem.style.height = this._height + 'px';
      this._htmlElem.style.left = this._x + 'px';
      this._htmlElem.style.top = this._y + 'px';
    }
  }]);

  return Tile;
}();

var Container = function () {
  function Container() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    _classCallCheck(this, Container);

    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._elements = [];
  }

  _createClass(Container, [{
    key: 'setPosition',
    value: function setPosition(x, y) {
      this._x = x;
      this._y = y;
    }
  }, {
    key: 'calculateTheSum',
    value: function calculateTheSum() {
      var counter = 0;
      this._elements.map(function (element) {
        counter += element._value;
      });
      return counter;
    }
  }, {
    key: 'setSize',
    value: function setSize(width, height) {
      this._width = width;
      this._height = height;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._elements = [];
    }
  }, {
    key: 'push',
    value: function push(elem) {
      this._elements.push(elem);
    }
  }, {
    key: 'updateElements',
    value: function updateElements() {
      var length = this._elements.length;
      for (var i = 0; i < length; i++) {
        var elem = this._elements[i];
        elem._width = this._width;
        elem._height = this._height / length;
        elem._x = this._x;
        elem._y = this._y + this._height / length * i;
        elem.update();
      }
    }
  }]);

  return Container;
}();
//# sourceMappingURL=bundle.js.map
