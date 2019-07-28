const myCanvas = document.getElementById("myCanvas"); 
myCanvas.width = 800;
myCanvas.height = 500;

const ctx = myCanvas.getContext("2d");

let bgReady, heroReady, monsterReady, monster1Ready, monster2Ready, monster3Ready, monster4Ready, monster5Ready, princessReady;
let bgImage, heroImage, monsterImage, monster1Image, monster2Image, monster3Image, monster4Image, monster5Image, princessImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 60;
let elapsedTime = 0;


let game = {
  startspeed: 1,
  difficulty: 1,
  listeningToKeyboard: true,
  level: 1,

};


var score = 0

// Setting the position when first display
let princessX = 10;
let princessY = 10;

let heroX = 800 ;
let heroY = 450;

let monsterX = 400;
let monsterY = 1;

let monster1X = 10;
let monster1Y = 330;

let monster2X = 770;
let monster2Y = 280;

let monsterDirectionY = 1;
let monster1DirectionX = 1; //monster moving
let monster2DirectionX = 1;










function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    bgReady = true;
  };
  bgImage.src = "images/Game_Background_110.jpg";

  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/viking-icon.png";

  princessImage = new Image();
  princessImage.onload = function () {
    // show the monster image
    princessReady = true;
  };
  princessImage.src = "images/princess-icon.png";


  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/lumberjack-icon.png";

  monster1Image = new Image();
  monster1Image.onload = function () {
    // show the monster image
    monster1Ready = true;
  };
  monster1Image.src = "images/lumberjack-icon.png";

  monster2Image = new Image();
  monster2Image.onload = function () {
    // show the monster image
    monster2Ready = true;
  };
  monster2Image.src = "images/lumberjack-icon.png";
}

let keysDown = {};
function setupKeyboardListeners() {
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
    game.listeningToKeyboard = true;
  }, false);
}


let update = function () {
  if(SECONDS_PER_ROUND - elapsedTime <= 0){
    console.log ("test")
    return
  }

  if (
    heroX <= (monsterX + 32)
    && monsterX <= (heroX + 32)
    && heroY <= (monsterY + 30)
    && monsterY <= (heroY + 30)
    || heroX <= (monster1X + 32)
    && monster1X <= (heroX + 32)
    && heroY <= (monster1Y + 30)
    && monster1Y <= (heroY + 30)
    || heroX <= (monster2X + 32)
    && monster2X <= (heroX + 32)
    && heroY <= (monster2Y + 30)
    && monster2Y <= (heroY + 30)
  ) {
    return
  }





  const highScore = localStorage.getItem("high score")
  //console.log("high score", highScore)
  document.getElementById("highscore").innerHTML = highScore

  //elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  let monsterspeed = game.startspeed * game.difficulty + 2
  monsterY += monsterspeed * monsterDirectionY;
  monsterX = monsterX;
  if (
    monsterY >= 200
  ) {
    monsterY = 0
    monsterDirectionX = -1;
  } else if (
    monsterY <=0
  ) {
    monsterY = 0
    monsterDirectionY = 1;
  }

  
  let monster1speed = game.startspeed * game.difficulty + 2 //monster moving
  monster1X += monster1speed * monster1DirectionX;
  monster1Y = monster1Y;
  if (
    monster1X >= 200
  ) {
    monster1X = 170
    monster1DirectionX = -1;
  } else if (
    monster1X <= 0
  ) {
    monster1X = 0
    monster1DirectionX = 1;
  }

  let monster2speed = game.startspeed * game.difficulty + 1.5
  monster2X += monster2speed * monster2DirectionX;
  monster2Y = monster2Y;
  if (
    monster2X <= 350
  ) {
    monster2X = 350
    monster2DirectionX = 1;
  } else if (
    monster2X >=750
  ) {
    monster2X = 750
    monster2DirectionX = -1;
  }




  if (38 in keysDown) { // Player is holding up key
    heroY -= 5;
  }
  if (40 in keysDown) { // Player is holding down key
    heroY += 5;
  }
  if (37 in keysDown) { // Player is holding left key
    heroX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    heroX += 5;
  }
  //Prevent the hero goes beyond the canvas
if(heroX <= 0){
  heroX = 0
}
if (heroX >= 800){
  heroX = 740
}
if (heroY <= 0){
  heroY = 0
}
if(heroY >= 460){
  heroY = 460
} 
const whenPrincessIsRescused = heroX <= (princessX + 32)
&& princessX <= (heroX + 32)
&& heroY <= (princessY + 32)
&& princessY <= (heroY + 32)
if (whenPrincessIsRescused){
  score += 1
  document.getElementById("scores").innerHTML = score;
  const currentHighScore = localStorage.getItem("high score")
  
  if(score > currentHighScore){
    localStorage.setItem("high score", score)
  }
  princessX = Math.floor(Math.random() * 500) + 1;
  princessY = Math.floor(Math.random() * 500) + 1;
}
};

setInterval(() => {
  elapsedTime +=1
  document.getElementById("my interval").innerHTML = SECONDS_PER_ROUND - elapsedTime
},1000)

//Render function
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  ctx.fillStyle = "grey";
  let obstacle1 = ctx.fillRect(100, 0, 20, 170);
  ctx.fillRect(250, 0, 20, 100);
  ctx.fillRect(360, 50, 20, 100);
  ctx.fillRect(480, 0, 20, 130);

  ctx.fillRect(250, 280, 20, 130);
  ctx.fillRect(400, 350, 20, 100);
  ctx.fillRect(100, 400, 20, 130);

  ctx.fillRect(0, 250, 180, 20);
  ctx.fillRect(180, 180, 20, 130);

  ctx.fillRect(480, 250, 130, 20);
  ctx.fillRect(400, 350, 100, 20);
  
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }

  if (monster1Ready) {
    ctx.drawImage(monster1Image, monster1X, monster1Y);
  }

  if (monster2Ready) {
    ctx.drawImage(monster2Image, monster2X, monster2Y);
  }

  if (princessReady) {
    ctx.drawImage(princessImage, princessX, princessY);
  }
  const isOutOfTime= SECONDS_PER_ROUND - elapsedTime <= 0
  if(isOutOfTime){
    ctx.fillText("Game Over", 300, 100);
    
  }

  if (
    heroX <= (monsterX + 32)
    && monsterX <= (heroX + 32)
    && heroY <= (monsterY + 30)
    && monsterY <= (heroY + 30)
    || heroX <= (monster1X + 32)
    && monster1X <= (heroX + 32)
    && heroY <= (monster1Y + 30)
    && monster1Y <= (heroY + 30)
    || heroX <= (monster2X + 32)
    && monster2X <= (heroX + 32)
    && heroY <= (monster2Y + 30)
    && monster2Y <= (heroY + 30)
  ) {
    ctx.fillText("Game Over", 20, 100);
    
  }
    

};

var main = function () {
  update(); 
  render();
  requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();



function resetTheGame(){
  elapsedTime = 0;
  document.getElementById("scores").innerHTML = 0;
  startTime = Date.now();
   princessX = 10;
   princessY = 10;

   heroX = 800 ;
   heroY = 450;

   monsterX = 400;
   monsterY = 1;

   monster1X = 10;
   monster1Y = 330;

   monster2X = 770;
   monster2Y = 280;

   monsterDirectionY = 1;
   monster1DirectionX = 1; 
   monster2DirectionX = 1;
  

}