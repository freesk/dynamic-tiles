class Button {
  constructor(text = "", className = "button", value, parent) {
    this._htmlElem = document.createElement('div');
    this._htmlElem.className = className;
    this._htmlElem.innerHTML = text;
    this._value = value;
  }
  // Add class active to the button htmlElem
  setAsActive() {
    this._htmlElem.classList.add('active');
  }
  // Remove class active to the button htmlElem
  setAsInactive() {
    this._htmlElem.classList.remove('active');
  }
}
