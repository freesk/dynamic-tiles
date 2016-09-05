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
    this._counter = 0;
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
    key: "clear",
    value: function clear() {
      this._elements = [];
    }
  }, {
    key: "push",
    value: function push(elem) {
      // console.log(elem);
      elem._parent = this;
      this._elements.push(elem);
    }
  }, {
    key: "count",
    value: function count() {
      var _this = this;

      this._counter = 0;
      this._elements.map(function (item) {
        return _this._counter += item._value;
      });
    }
  }, {
    key: "fill",
    value: function fill() {}
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      this._elements.forEach(function (item, i) {
        var elem = _this2._elements[i];
        elem._width = _this2._width;
        elem._height = _this2._height / _this2._elements.length;
        elem._x = _this2._x;
        elem._y = _this2._y + _this2._height / _this2._elements.length * i;
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
    this._value = 3;
    this._debugHtmlElem = document.createElement('div');
    this._debugHtmlElem.className = 'debug';
    this._container = null;

    var index = 0;
    var group = document.createElement('div');
    group.className = 'group';

    var btn1 = new Button('1/1', 'button btn1', 3, this);
    var btn2 = new Button('1/2', 'button btn1', 1.5, this);
    var btn3 = new Button('1/3', 'button btn1', 1, this);

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

  _createClass(Tile, [{
    key: "setDebugMessage",
    value: function setDebugMessage(text) {
      this._debugHtmlElem.innerHTML = text;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var index = this._buttons.findIndex(checkTheValue);

      function checkTheValue(element) {
        return element._value == value;
      }

      this._buttons.forEach(function (item, i) {
        if (i != index) item.setAsInactive();else item.setAsActive();
      });

      this._value = value;
      this.setDebugMessage(value);
    }
  }, {
    key: "catchTheClick",
    value: function catchTheClick(e) {
      var index = this._buttons.findIndex(checkTheHtmlElem);
      var button = this._buttons[index];

      function checkTheHtmlElem(element) {
        return element._htmlElem == e.target;
      }

      if (button._value == this._value) return;

      this.setValue(button._value);

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
'use strict';

window.addEventListener('load', init);

var numOfTiles = 12;
var maxElementsInTheLine = 3;
var containerHeight = 300;

var theArrayOfTheTiles = [];

function init() {
  var body = document.getElementsByTagName('body')[0];

  for (var i = 0; i < numOfTiles; i++) {
    var tile = new Tile();
    theArrayOfTheTiles.push(tile);
    body.appendChild(tile._htmlElem);
  }

  updateTheContainers();
  window.addEventListener('resize', updateTheContainers);
}

function updateTheContainers() {

  var windowSize = getWindowSize();
  var containerWidth = windowSize.width / maxElementsInTheLine;
  var theCopy = theArrayOfTheTiles.slice();
  var column = 0;
  var row = 0;
  var i = 0;

  var _loop = function _loop() {

    var container = new Container();

    var tile1 = theCopy[0];
    var tile2 = theCopy[1];
    var tile3 = theCopy[2];

    function push(tile, value) {
      if (!tile) return;
      if (value) tile.setValue(value);
      container.push(tile);
      theCopy.splice(0, 1);
    }

    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);

    console.log(tile1._value);

    push(tile1);

    if (tile1._value == 1.5) {
      push(tile2, 1.5);
    } else if (tile1._value == 1) {
      push(tile2, 1);
      push(tile3, 1);
    } else {}

    container.update();

    if (column == maxElementsInTheLine - 1) {
      row++;
      column = 0;
    } else {
      column++;
    }

    i++;
  };

  while (theCopy.length) {
    _loop();
  }
}

function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}
//# sourceMappingURL=bundle.js.map
