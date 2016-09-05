"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
  function Button() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var className = arguments.length <= 1 || arguments[1] === undefined ? "button" : arguments[1];
    var value = arguments[2];
    var parent = arguments[3];

    _classCallCheck(this, Button);

    this._htmlElem = document.createElement('div');
    this._htmlElem.className = className;
    this._htmlElem.innerHTML = text;
    this._value = value;
  }

  _createClass(Button, [{
    key: "setAsActive",
    value: function setAsActive() {
      this._htmlElem.classList.add('active');
    }
  }, {
    key: "setAsInactive",
    value: function setAsInactive() {
      this._htmlElem.classList.remove('active');
    }
  }]);

  return Button;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    this._value = 0;
  }

  _createClass(Container, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this._x = x;
      this._y = y;
    }
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      this._width = width;
      this._height = height;
    }
  }, {
    key: "push",
    value: function push(elem) {
      elem._parent = this;
      this._elements.push(elem);
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this._value = value;
    }
  }, {
    key: "takeIn",
    value: function takeIn(arr, int) {
      this._value += int;
      // Repeat int times
      for (var i = 0; i < int; i++) {
        // Save the first element from the passed array
        var elem = arr[0];
        // Remove the element from the passed array
        arr.splice(0, 1);
        // Save itself into the element
        elem._parent = this;
        // Push the element into its array
        this._elements.push(elem);
      }
    }
  }, {
    key: "takeOut",
    value: function takeOut(arr, int) {
      this._value -= int;
      // Repeat int times
      for (var i = 0; i < int; i++) {
        // Save the last element index
        var index = this._elements.length;
        // Save the last element
        var elem = this._elements[index];
        // Remove itself from the element
        elem._parent = null;
        // Remove the element from the array
        this._elements.splice(index, 1);
        // Push the element to the passed array
        arr.push(elem);
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      this._elements.forEach(function (item, i) {
        var elem = _this._elements[i];
        elem._width = _this._width;
        elem._height = _this._height / _this._elements.length;
        elem._x = _this._x;
        elem._y = _this._y + _this._height / _this._elements.length * i;
        elem.update();
      });
    }
  }]);

  return Container;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    this._value = 1;
    this._debugHtmlElem = document.createElement('div');
    this._debugHtmlElem.className = 'debug';
    this._container = null;

    var group = document.createElement('div');
    group.className = 'group';

    var btn1 = new Button('1/1', 'button btn1', 1, this);
    var btn2 = new Button('1/2', 'button btn1', 2, this);
    var btn3 = new Button('1/3', 'button btn1', 3, this);

    this._buttons.push(btn1, btn2, btn3);

    this._buttons.map(function (item) {
      item._htmlElem.addEventListener('click', function (e) {
        return _this.catchTheClick(e);
      });
      group.appendChild(item._htmlElem);
    });

    this._htmlElem.appendChild(this._debugHtmlElem);
    this._htmlElem.appendChild(group);
  }

  // setDebugMessage(text) {
  //   this._debugHtmlElem.innerHTML = text;
  // }

  _createClass(Tile, [{
    key: "catchTheClick",
    value: function catchTheClick(e) {
      var index = this._buttons.findIndex(checkTheHtmlElem);
      var button = this._buttons[index];

      function checkTheHtmlElem(element) {
        return element._htmlElem == e.target;
      }

      this._parent.parseIncomingValue(button._value);

      updateTheContainers();
    }
  }, {
    key: "update",
    value: function update() {
      this._htmlElem.style.width = this._width + 'px';
      this._htmlElem.style.height = this._height + 'px';
      this._htmlElem.style.left = this._x + 'px';
      this._htmlElem.style.top = this._y + 'px';
    }
  }]);

  return Tile;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TilesLine = function () {
  function TilesLine() {
    _classCallCheck(this, TilesLine);

    this._elements = [];
  }

  _createClass(TilesLine, [{
    key: "push",
    value: function push(elem) {
      this._elements.push(elem);
    }
  }, {
    key: "getCopy",
    value: function getCopy() {
      this._copy = [];
      this._copy = this._elements.slice();
    }
  }]);

  return TilesLine;
}();
'use strict';

window.addEventListener('load', init);

var numOfTiles = 12;
var maxElementsInTheLine = 3;
var containerHeight = 300;

var tilesLine = new TilesLine();
var containersLine = [];

function init() {
  var body = document.getElementsByTagName('body')[0];

  // Create tiles
  for (var i = 0; i < numOfTiles; i++) {
    var tile = new Tile();
    tilesLine.push(tile);
    body.appendChild(tile._htmlElem);
  }

  // Create the same amount of containers
  for (var _i = 0; _i < numOfTiles; _i++) {
    var container = new Container();
    container.takeIn(tilesLine._elements, 1);
    containersLine.push(container);
  }

  console.log(containersLine);

  updateTheContainers();
  window.addEventListener('resize', updateTheContainers);
}

function updateTheContainers() {

  var windowSize = getWindowSize();
  var containerWidth = windowSize.width / maxElementsInTheLine;
  // let theCopy = tilesLine.getCopy();
  var column = 0;
  var row = 0;
  // let i = 0;

  for (var i = 0; i < containersLine.length; i++) {

    tilesLine.getCopy();

    var container = containersLine[i];

    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);

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
//# sourceMappingURL=bundle.js.map
