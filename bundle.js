'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', init);

var num = 12;
var maxWidth = 3;

var theArray = [];

function init() {
  var body = document.getElementsByTagName('body')[0];
  for (var i = 0; i < num; i++) {
    var tile = new Tile();
    body.appendChild(tile._htmlElem);
    theArray.push(tile);
  }
  updateTheArray();
}

function updateTheArray() {

  var col = 0;
  var row = 0;
  var array = theArray.slice();

  for (var i = 0; i < maxWidth.length; i++) {

    var column = new Column();

    for (var _i = 0; _i < array.length; _i++) {
      var tile = array[_i];
    }
  }
}

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
  }

  _createClass(Tile, [{
    key: 'update',
    value: function update() {
      this._htmlElem.style.width = this._width;
      this._htmlElem.style.height = this._height;
      this._htmlElem.style.left = this._x;
      this._htmlElem.style.top = this._y;
    }
  }]);

  return Tile;
}();

var Column = function () {
  function Column(width, height) {
    _classCallCheck(this, Column);

    this._x = 0;
    this._y = 0;
    this._width = width;
    this._height = height;
    this._elements = [];
  }

  _createClass(Column, [{
    key: 'push',
    value: function push(elem) {
      var maxLength = 3;
      if (this._elements.length == maxLength) {
        return false;
      } else {
        this._elements.push(elem);
        this.update();
        return true;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      this._elements.map(function (elem, i) {

        console.log(i);

        var length = _this._elements.length;
        elem.x = _this._x;
        elem.y = _this._height / _this._elements.length * i;
        elem.width = _this._width;
        elem.height = _this._height / _this._elements.length;
      });
    }
  }]);

  return Column;
}();
//# sourceMappingURL=bundle.js.map
