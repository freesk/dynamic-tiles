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

  for (var i = 0; i < numOfTiles; i++) {

    var container = theArrayOfTheContainers[i];
    var tile = theArrayOfTheTiles[i];

    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);
    container.push(tile);
    container.updateElements();

    if (column == maxElementsInTheLine - 1) {
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
  };
}

var Button = function () {
  function Button() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var className = arguments.length <= 1 || arguments[1] === undefined ? "button" : arguments[1];

    var _this = this;

    var value = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var parent = arguments[3];

    _classCallCheck(this, Button);

    this._htmlElem = document.createElement('div');
    this._htmlElem.className = className;
    this._htmlElem.addEventListener('click', function (e) {
      return _this.catchTheClick(e);
    });
    this._htmlElem.innerHTML = text;
    this._value = value;
    this._parent = parent;
    this._parent._htmlElem.appendChild(this._htmlElem);
    this._parent._buttons.push(this);
  }

  _createClass(Button, [{
    key: 'catchTheClick',
    value: function catchTheClick(e) {
      var target = this._parent._buttons.findIndex(isClickedButton);

      function isClickedButton(element, index, array) {
        return element.htmlElem == e.target;
      }
    }
  }, {
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
    this._value = 0;

    var group = document.createElement('div');
    group.className = 'group';

    var btn1 = new Button('1/1', 'button btn1', 3, this);
    var btn2 = new Button('1/2', 'button btn1', 2, this);
    var btn3 = new Button('1/3', 'button btn1', 1, this);

    group.appendChild(btn1._htmlElem);
    group.appendChild(btn2._htmlElem);
    group.appendChild(btn3._htmlElem);

    this._htmlElem.appendChild(group);
  }

  _createClass(Tile, [{
    key: 'setValue',
    value: function setValue(value) {
      this._value = value;
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
    }
  }, {
    key: 'setSize',
    value: function setSize(width, height) {
      this._width = width;
      this._height = height;
    }
  }, {
    key: 'push',
    value: function push(elem) {
      if (this._elements.length == maxElementsPerContainer) {
        return false;
      } else {
        this._elements.push(elem);
        return true;
      }
    }
  }, {
    key: 'updateElements',
    value: function updateElements() {
      var length = this._elements.length;
      for (var i = 0; i < length; i++) {
        var elem = this._elements[i];
        elem._x = this._x;
        elem._y = /*(this._height / (length + 1)) * i*/this._y;
        elem._width = this._width;
        elem._height = this._height /* / length*/;
        elem.update();
      }
    }
  }]);

  return Container;
}();
//# sourceMappingURL=bundle.js.map
