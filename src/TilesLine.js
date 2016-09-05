class TilesLine {

  constructor() {
    this._elements = [];
  }

  push(elem) {
    this._elements.push(elem);
  }

  getCopy() {
    this._copy = [];
    this._copy = this._elements.slice();
  }

}
