window.addEventListener('load', init);

const numOfTiles = 12;
const maxElementsInTheLine = 3;
const containerHeight = 300;

var theArrayOfTheTiles = [];

function init() {
  let body = document.getElementsByTagName('body')[0];

  for (let i = 0; i < numOfTiles; i++) {
    const tile = new Tile();
    theArrayOfTheTiles.push(tile);
    body.appendChild(tile._htmlElem);
  }

  updateTheContainers();
  window.addEventListener('resize', updateTheContainers);
}

function updateTheContainers() {

  const windowSize = getWindowSize();
  const containerWidth = windowSize.width / maxElementsInTheLine;
  let theCopy = theArrayOfTheTiles.slice();
  let column = 0;
  let row = 0;
  let i = 0;

  while (theCopy.length) {

    let container = new Container();

    let tile1 = theCopy[0];
    let tile2 = theCopy[1];
    let tile3 = theCopy[2];

    function push(tile, value) {
      if(!tile) return;
      if(value) tile.setValue(value);
      container.push(tile);
      theCopy.splice(0, 1);
    }

    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);

    console.log(tile1._value);

    push(tile1);

    if(tile1._value == 1.5) {
      push(tile2, 1.5);
    } else if(tile1._value == 1) {
      push(tile2, 1);
      push(tile3, 1);
    } else {

    }

    container.update();

    if(column == maxElementsInTheLine - 1) {
      row++;
      column = 0;
    } else {
      column++;
    }

    i++;

  }

}

function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}
