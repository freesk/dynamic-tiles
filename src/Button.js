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
