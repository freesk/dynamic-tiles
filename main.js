$(function(){

  console.log('init');

  var $body = $('body');
  var tiles = [];
  var colors = randomColor({ count: 18 });

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function Tile(params) {
    this.init(params);
  };

  Tile.prototype.changeSize = function (params) {
    this.width = params.width;
    this.height = params.height;
    this.x = params.x;
    this.y = params.y;
  };

  Tile.prototype.update = function () {
    this.$htmlElem.css({
      width: this.width + "px",
      height: this.height / (this.state + 1) + "px",
      left: this.x + "px",
      top: this.y + "px",
      backgroundColor: this.color});
  };

  Tile.prototype.setState = function(int) {
    var index = findIndex(tiles, this);

    // console.log(tiles);

    var pre = tiles[index - 1];
    var pre2 = tiles[index - 2];
    var next = tiles[index + 1];
    var next2 = tiles[index + 2];

    var lock = false;

    // 2 rows
    if(this.missing == 1 && this.state == 1 && int == 0) {
      next.state = 0;
      next.currentBtnIndex = 0;
    } else if (this.missing == 0 && this.state == 1 && int == 0) {
      pre.state = 0;
      pre.currentBtnIndex = 0;
      pre.missing = 0;
    } else if (this.missing == 1 && this.state == 1 && int == 2) {
      next.missing = 1;
      next.state = 2;
      next.currentBtnIndex = 2;
      next2.missing = 0;
      next2.state = 2;
      next2.currentBtnIndex = 2;
    } else if (this.missing == 0 && this.state == 1 && int == 2) {
      pre.missing = 2;
      pre.state = 2;
      pre.currentBtnIndex = 2;
      next.missing = 0;
      next.state = 2;
      next.currentBtnIndex = 2;
    // 3 rows
    } else if (this.missing == 2 && this.state == 2 && int == 0) {
      next.missing = 1;
      next.state = 1;
      next.currentBtnIndex = 1;
      next2.missing = 0;
      next2.state = 1;
      next2.currentBtnIndex = 1;
    } else if (this.missing == 1 && this.state == 2 && int == 0) {
      pre.missing = 0;
      pre.state = 0;
      pre.currentBtnIndex = 0;
      next.missing = 0;
      next.state = 0;
      next.currentBtnIndex = 0;
    } else if (this.missing == 0 && this.state == 2 && int == 0) {
      pre2.missing = 1;
      pre2.state = 1;
      pre2.currentBtnIndex = 1;
      pre.missing = 0;
      pre.state = 1;
      pre.currentBtnIndex = 1;
    // next button condition
    } else if (this.missing == 2 && this.state == 2 && int == 1) {
      next.missing = 0;
      next.state = 1;
      next.currentBtnIndex = 1;
      next2.missing = 0;
      next2.state = 0;
      next2.currentBtnIndex = 0;
    } else if (this.missing == 1 && this.state == 2 && int == 1) {

      // special condition
      lock = true;

      this.missing = 0;
      this.state = 1;
      next.currentBtnIndex = 1;

      pre.missing = 1;
      pre.state = 1;
      pre.currentBtnIndex = 1;
      next.missing = 0;
      next.state = 0;
      next.currentBtnIndex = 0;
    } else if (this.missing == 0 && this.state == 2 && int == 1) {
      pre2.missing = 1;
      pre2.state = 1;
      pre2.currentBtnIndex = 1;
      pre.missing = 0;
      pre.state = 1;
      pre.currentBtnIndex = 1;
    }

    if(lock) return;

    this.missing = int;
    this.state = int;

  }

  function findIndex(arr, elem) {
    return arr.indexOf(elem);
  }

  function Button(params) {
    return this.init(params);
  }

  Button.prototype.init = function(params) {
    this.htmlElem = document.createElement('div');
    this.htmlElem.className = params.className;
    this.htmlElem.innerHTML = params.txt;
    if(params.active) {
      this.update(true);
    } else {
      this.update(false);
    }
    return this;
  }

  Button.prototype.addClass = function(className) {
    this.htmlElem.classList.add(className);
  }

  Button.prototype.removeClass = function(className) {
    this.htmlElem.classList.remove(className);
  }

  Button.prototype.update = function(active) {
    this.active = active;
  }

  Tile.prototype.setActiveButton = function(index) {
    if(index !== this.currentBtnIndex) {
      this.buttons[this.currentBtnIndex].update(false);
      this.buttons[index].update(true);
      this.currentBtnIndex = index;
      return true;
    } else {
      return false;
    }
  }

  Tile.prototype.init = function (params) {

    var that = this;

    this.$htmlElem = $(document.createElement('div'));
    this.$htmlElem[0].className = "tile";
    this.state = 0;
    this.missing = 0;
    this.buttons = [];
    this.currentBtnIndex = 0;

    var group = document.createElement('div');
    group.className = "group";

    var btn1 = new Button({
      className: "button txt1",
      txt: "1/1",
      active: true
    });

    var btn2 = new Button({
      className: "button txt2",
      txt: "1/2"
    });

    var btn3 = new Button({
      className: "button txt3",
      txt: "1/3"
    });

    this.buttons.push(btn1);
    this.buttons.push(btn2);
    this.buttons.push(btn3);

    function catchTheClick(e) {
      var targetButtonIndex = that.buttons.findIndex(isClickedButton);

      function isClickedButton(element, index, array) {
        return element.htmlElem == e.target;
      }

      if(!(that.setActiveButton(targetButtonIndex))) return;

      console.log('click passed');

      that.setState(targetButtonIndex);
      that.update();

      updateTiles();
    }

    for (var i = 0; i < this.buttons.length; i++) {
      var htmlElem = this.buttons[i].htmlElem;
      htmlElem.addEventListener('click', catchTheClick);
      group.appendChild(htmlElem);
    }

    this.$htmlElem[0].appendChild(group);

    $body.append(this.$htmlElem);

    this.x = params.x || 0;
    this.y = params.y || 0;
    this.color = params.color || "#000";
    this.width = params.width || 0;
    this.height = params.height || 0;

    this.update();
  };

  function updateTiles() {
    var windowSize = getWindowSize();
    var timesW = 3;
    var col = 0;
    var row = 0;

    for (var i = 0; i < tiles.length; i++) {

      var tile = tiles[i];

      tile.width = windowSize.width / timesW;
      tile.x = col * tile.width;
      tile.y = row * tile.height;
      tile.update();

      var next = tiles[i+1];

      if(tile.missing) {
        if(tile.state == 1) {
          if(next) {
            next.state = 1;
            next.currentBtnIndex = 1;
            row = row + 1/2;
          }
        } else if(tile.state == 2) {
          if(next) {
            next.state = 2;
            next.currentBtnIndex = 2;
            if(tile.missing == 2) {
              next.missing = 1;
            }
            row = row + 1/3;
          }
        }
      } else {
        row = Math.floor(row);
        if(col == (timesW - 1)) {
          row++;
          col = 0;
        } else {
          col++
        }
      }

    }

    console.log(tiles);

  }

  function getWindowSize() {
    return {
      width: $(window).width(),
      height: $(window).height()
    }
  };

  for (var i = 0; i < 12; i++) {
    var color = colors[getRandomInt(0, colors.length)];
    var tile = new Tile({width:300, height:300, color:color});
    tiles.push(tile);
  }

  updateTiles();

  $(window).resize(updateTiles);

});
