window.addEventListener('load', init);

const numOfTiles = 12;
const maxElementsInTheLine = 3;
const containerHeight = 300;

var tilesLine = new TilesLine();
var containersLine = [];

function init() {
  let body = document.getElementsByTagName('body')[0];

  // Create tiles
  for (let i = 0; i < numOfTiles; i++) {
    let tile = new Tile();
    tilesLine.push(tile);
    body.appendChild(tile._htmlElem);
  }

  // Create the same amount of containers
  for (let i = 0; i < numOfTiles; i++) {
    let container = new Container();
    container.takeIn(tilesLine._elements, 1);
    containersLine.push(container);
  }

  console.log(containersLine);

  updateTheContainers();
  window.addEventListener('resize', updateTheContainers);
}

function updateTheContainers() {

  const windowSize = getWindowSize();
  const containerWidth = windowSize.width / maxElementsInTheLine;
  // let theCopy = tilesLine.getCopy();
  let column = 0;
  let row = 0;
  // let i = 0;

  for (let i = 0; i < containersLine.length; i++) {

    tilesLine.getCopy();

    let container = containersLine[i];

    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);

    if(column == maxElementsInTheLine - 1) {
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
  }
}
