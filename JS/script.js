var canvas = document.getElementById('spel');
var c = canvas.getContext('2d');
var cwidth = window.innerWidth;
var cheight = window.innerHeight;
var x = 50;
var y = 50;
var frames = 60;
var stars = [];
var starId = 0;
var keyLog = {
  up:false,
  down:false,
  right:false,
  left:false
};
var player = {
  x: cwidth/2,
  y: cheight/1.5,
  speed: 4.9,
  playerHealth: 5,
  width: 20,
  height: 20,
  score: 0,
  update: function() {
   if(keyLog.up && this.y > 0) this.y -= this.speed;
   if(keyLog.down && this.y < cheight-this.height) this.y += this.speed;
   if(keyLog.right && this.x < cwidth-this.width) this.x += this.speed;
   if(keyLog.left && this.x > 0) this.x -= this.speed;
  },
  render: function() {
    c.fillStyle = 'lime';
    c.fillRect(this.x, this.y, this.width, this.height);
  }
};


addEventListener ("keydown", function (e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.which;
  switch(keyCode) {
    case 87: //W
    keyLog.up = true;
    break;
    case 83: // S
    keyLog.down = true;
    break;
    case 68: // D
    keyLog.right = true;
    break;
    case 65: // A
    keyLog.left = true;
    break;
  }
}, false);
addEventListener ("keyup", function (e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.which;
  switch(keyCode) {
    case 87: //W
    keyLog.up = false;
    break;
    case 83: // S
    keyLog.down = false;
    break;
    case 68: // D
    keyLog.right = false;
    break;
    case 65: // A
    keyLog.left = false;
    break;
  }
}, false);


function star(x, y) {
  this.x = x;
  this.y = y;
  this.width = 8;
  this.id = JSON.parse(JSON.stringify(starId));
  starId++;
  this.height = 8;
  this.render = function() {
    c.fillStyle = 'white';
    c.fillRect(this.x, this.y, this.width, this.height);
  };
  this.update = function() {
    if(collision(this, player)){
      player.score ++;
      breakStar(star);
    }
  };
}

function breakStar(star) {
  function arrayObjectIndexOf(starArray, searchTerm) {
    for(var i = 0, len = starArray.length; i < len; i++) {
        if (starArray[i]["id"] === searchTerm) return i;
    }
    return -1;
    }
  arrayObjectIndexOf()
  var index = arrayObjectIndexOf(stars, star.id);
  if(index !== -1){
    stars.splice(index, 1);
  }
}
function createStars(amount) {
  for(i = 0; i < amount; i++){
    stars.push(new star(Math.random()*cwidth, Math.random()*cheight));
  }
}
function renderStars() {
  for(i in stars) {
    stars[i].render();
  }
}
function updateStars() {
  for(i in stars) {
    stars[i].update();
  }
}


function collision(obj1, obj2) {
    return (obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
}


function render() {
  c.clearRect(0,0,window.innerWidth,window.innerHeight);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  c.fillStyle = 'lime';
  c.font = "bold 18px monospace";
  c.fillText('Score:' + player.score, 10, 20);
  player.render();
  renderStars();
}


function update() {
  player.update();
  updateStars();
}

function init() {
 createStars(20);
}


init();
setInterval (function () {
  update();
  render();
}, 1000/frames)
