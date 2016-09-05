window.addEventListener('load', init);

const numberOfTiles = 12;
const elementsInTheLine = 3;
const containerHeight = 300;

var tiles = [];
var containers = [];

function init() {
  // Get body element
  let body = document.getElementsByTagName('body')[0];
  // Create tiles and containers
  for (let i = 0; i < numberOfTiles; i++) {
    let tile = new Tile();
    let container = new Container();
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
  const windowSize = getWindowSize();
  // Get container width
  const containerWidth = windowSize.width / elementsInTheLine;
  // Create a copy of the array
  let theCopy = tiles.slice();
  // Define column and row
  let column = 0;
  let row = 0;

  for (let i = 0; i < containers.length; i++) {

    let container = containers[i];
    let value = container._value;

    container.setPosition(containerWidth * column, containerHeight * row);
    container.setSize(containerWidth, containerHeight);
    container.reset();

    for (let i = 0; i < value; i++) {
      if(theCopy[0]) {
        // Pick the first element and then delete it from the array
        container.push(theCopy[0]);
        theCopy.splice(0, 1);
      } else {
        container.push({});
      }
    }

    container.update();

    // Each 3rd iteration row++ then reset col
    if ( ( (i+1) % elementsInTheLine ) == 0 ) {
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
  }
}
