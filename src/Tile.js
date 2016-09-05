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

    let group = document.createElement('div');
    let btn1 = new Button('1/1', 'button btn1', 1, this);
    let btn2 = new Button('1/2', 'button btn1', 2, this);
    let btn3 = new Button('1/3', 'button btn1', 3, this);

    group.className = 'group';

    this._buttons.push(btn1, btn2, btn3);

    // Iterate through the buttons
    this._buttons.map(item => {
      item._htmlElem.addEventListener('click', e => this.catchTheClick(e));
      group.appendChild(item._htmlElem);
    });

    // Append the group html element to the Tile html element
    this._htmlElem.appendChild(group);
  }

  catchTheClick(e) {
    // Find target button index
    const index = this._buttons.findIndex(checkTheHtmlElem);
    // Save target button
    const button = this._buttons[index];
    // Filtering function
    function checkTheHtmlElem(element) {
      return element._htmlElem == e.target;
    }
    // Break execution if the update is unnecessary
    if(this._parent._value == button._value) return;
    // Pass an amount of reqired elements in to the parent (container)
    this._parent.setValue(button._value);
    // Update all containers. See main.js for this function
    update();
  }

  update() {
    // Save the parent
    let parent = this._parent;
    // Find target button index
    const index = this._buttons.findIndex(checkTheValue);
    // Filtering function
    function checkTheValue(element) {
      return element._value == parent._value;
    }
    // Press the buttons
    this._buttons.forEach((item, i) => {
      if(i == index)
        item.setAsActive();
      else
        item.setAsInactive();
    });
    // Update its css style
    this._htmlElem.style.width = this._width + 'px';
    this._htmlElem.style.height = this._height + 'px';
    this._htmlElem.style.left = this._x + 'px';
    this._htmlElem.style.top = this._y + 'px';
  }

}
