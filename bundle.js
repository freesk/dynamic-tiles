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
  // Set new position


  _createClass(Container, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this._x = x;
      this._y = y;
    }
    // Set new size

  }, {
    key: "setSize",
    value: function setSize(width, height) {
      this._width = width;
      this._height = height;
    }
    // Add an element

  }, {
    key: "push",
    value: function push(elem) {
      this._value++;
      elem._parent = this;
      this._elements.push(elem);
    }
    // Set a new value of required elements

  }, {
    key: "setValue",
    value: function setValue(value) {
      this._value = value;
    }
    // Reset

  }, {
    key: "reset",
    value: function reset() {
      this._value = 0;
      this._elements = [];
    }
    // Update its elements

  }, {
    key: "update",
    value: function update() {
      var _this = this;

      // try.. catch.. for an error that occurs for the last tile in the main array. See main.js for the main array
      try {
        this._elements.forEach(function (item, i) {
          var elem = _this._elements[i];
          elem._width = _this._width;
          elem._height = _this._height / _this._elements.length;
          elem._x = _this._x;
          elem._y = _this._y + _this._height / _this._elements.length * i;
          elem.update();
        });
      } catch (e) {
        // console.log(e);
      }
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

    var group = document.createElement('div');
    var btn1 = new Button('1/1', 'button btn1', 1, this);
    var btn2 = new Button('1/2', 'button btn1', 2, this);
    var btn3 = new Button('1/3', 'button btn1', 3, this);

    group.className = 'group';

    this._buttons.push(btn1, btn2, btn3);

    // Iterate through the buttons
    this._buttons.map(function (item) {
      item._htmlElem.addEventListener('click', function (e) {
        return _this.catchTheClick(e);
      });
      group.appendChild(item._htmlElem);
    });

    // Append the group html element to the Tile html element
    this._htmlElem.appendChild(group);
  }

  _createClass(Tile, [{
    key: "catchTheClick",
    value: function catchTheClick(e) {
      // Find target button index
      var index = this._buttons.findIndex(checkTheHtmlElem);
      // Save target button
      var button = this._buttons[index];
      // Filtering function
      function checkTheHtmlElem(element) {
        return element._htmlElem == e.target;
      }
      // Break execution if the update is unnecessary
      if (this._parent._value == button._value) return;
      // Pass an amount of reqired elements in to the parent (container)
      this._parent.setValue(button._value);
      // Update all containers. See main.js for this function
      update();
    }
  }, {
    key: "update",
    value: function update() {
      // Save the parent
      var parent = this._parent;
      // Find target button index
      var index = this._buttons.findIndex(checkTheValue);
      // Filtering function
      function checkTheValue(element) {
        return element._value == parent._value;
      }
      // Press the buttons
      this._buttons.forEach(function (item, i) {
        if (i == index) item.setAsActive();else item.setAsInactive();
      });
      // Update its css style
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

var numberOfTiles = 12;
var elementsInTheLine = 3;
var containerHeight = 300;

var tiles = [];
var containers = [];

function init() {
  // Get body element
  var body = document.getElementsByTagName('body')[0];
  // Create tiles and containers
  for (var i = 0; i < numberOfTiles; i++) {
    var tile = new Tile();
    var container = new Container();
    tiles.push(tile);
    body.appendChild(tile._htmlElem);
    container.push(tile);
    containers.push(container);
  }
  // Default call
  update();
  // Call for each resize event
  window.addEventListener('resize', update);
}

function update() {
  console.log('update');
  // Get window size
  var windowSize = getWindowSize();
  // Get container width
  var containerWidth = windowSize.width / elementsInTheLine;
  // Create a copy of the array
  var theCopy = tiles.slice();
  // Define column and row
  var column = 0;
  var row = 0;

  for (var i = 0; i < containers.length; i++) {

    var container = containers[i];
    var value = container._value;

    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);
    container.reset();

    for (var _i = 0; _i < value; _i++) {
      if (theCopy[0]) {
        // Pick the first element and then delete it from the array
        container.push(theCopy[0]);
        theCopy.splice(0, 1);
      } else {
        container.push({});
      }
    }

    container.update();

    // Each 3rd iteration row++ then reset col
    if ((i + 1) % elementsInTheLine == 0) {
      row++;
      column = 0;
    } else {
      column++;
    }
  }
}
// Get current window size
function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}
//# sourceMappingURL=bundle.js.map
