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
    this._value = 1;
    this._debugHtmlElem = document.createElement('div');
    this._debugHtmlElem.className = 'debug';
    this._container = null;

    let group = document.createElement('div');
    group.className = 'group';

    let btn1 = new Button('1/1', 'button btn1', 1, this);
    let btn2 = new Button('1/2', 'button btn1', 2, this);
    let btn3 = new Button('1/3', 'button btn1', 3, this);

    this._buttons.push(btn1, btn2, btn3);

    this._buttons.map(item => {
      item._htmlElem.addEventListener('click', e => this.catchTheClick(e));
      group.appendChild(item._htmlElem);
    });

    this._htmlElem.appendChild(this._debugHtmlElem);
    this._htmlElem.appendChild(group);
  }

  // setDebugMessage(text) {
  //   this._debugHtmlElem.innerHTML = text;
  // }

  catchTheClick(e) {
    const index = this._buttons.findIndex(checkTheHtmlElem);
    const button = this._buttons[index];

    function checkTheHtmlElem(element) {
      return element._htmlElem == e.target;
    }

    this._parent.parseIncomingValue(button._value);

    updateTheContainers();
  }

  update() {
    this._htmlElem.style.width = this._width + 'px';
    this._htmlElem.style.height = this._height + 'px';
    this._htmlElem.style.left = this._x + 'px';
    this._htmlElem.style.top = this._y + 'px';
  }

}
