//Race to Fortune Code
//coded with help from @WhiteHatJr.
//coding by Hiten

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//creating all the characters of the game
var doctor;
var theDoctor;
var bg, ybiker, obiker, doctordriver, horsey, police, tree;
var obstacle1, obstacle2, obstacle3, obstacle4;
var bg;
var count;
var gameOver, restart;
var restarter
var ObstaclesGroup;

function preload() {
  //defining all the images/animations
  bgimg = loadImage("images/bgr.png");
  yBiker = loadImage("images/BikeYoung.png");
  oBiker = loadImage("images/BikeOld.png");
  obstacle1 = loadImage("images/ca.png");
  obstacle2 = loadImage("images/cyclefinale.png");
  obstacle3 = loadImage("images/po.png");
  obstacle4 = loadImage("images/tr.png");
  restarter = loadImage("images/restart.png");
  theDoctor = loadImage("images/doc.png"); //The Player
}

function setup() {
  //creating a canvas
  createCanvas(displayWidth, displayHeight);
  //createCanvas(1550, 750);

  //defining the background
  bg = createSprite(displayWidth/2, displayHeight/2);
  //bg = createSprite(700, 400);
  bg.addImage("bgimage", bgimg);
  bg.scale = 2.36;
  bg.y = height / 2;

  //defining our player The Doctor
  doctor = createSprite(displayWidth/2, displayHeight-250, 50, 50);
  //doctor = createSprite(400, 580, 50, 50);
  doctor.shapeColor = "red";
  doctor.setCollider("rectangle", -10, 0,350,700);
  doctor.addImage(theDoctor);
  doctor.scale = 0.3;
  
  //defining the restart button
  restart = createSprite(displayWidth/2-50, displayHeight/2,100,100);
  //restart = createSprite(700, 365,100,100);
  restart.addImage(restarter);
  restart.scale = 0.2;
  restart.visible = false;

  //creating the Obstacle Group
  ObstaclesGroup = createGroup();

  //score
  count = 0;
}

function draw() {
  //colouring the background
  background(0);

  drawSprites();
  //GameStates
  if (gameState === PLAY) {
    //move the background
    bg.velocityY = (6 + 3 * count / 100);

    //scoring
    // count = count+(getFrameRate()/ 120);
    //OR
    count = count + 0.1;

    //spawn obstacles
    spawnObstacles();

    //to End the game when doctor is touching the obstacle
    if (ObstaclesGroup.isTouching(doctor)) {
      gameState = END;
    }

    //making the restart icon invisible in the PLAY State
    restart.visible = false;

    //making an endless gameArea
    if (bg.y > displayHeight-200) {
      bg.y = height / 2;
    }

  } else if (gameState === END) {
    //set velocity of each game object to 0
    doctor.velocityY = 0;
    doctor.velocityX = 0;
    ObstaclesGroup.setVelocityYEach(0);
    bg.velocityY = 0;

    //making the restart icon visible to click upon
    restart.visible = true;
    //restart.depth = ObstaclesGroup.depth + 10;

    //creating command if clicked on restart
    if(mousePressedOver(restart)){
      reset(); 
    }
    //placing text gameOver on the screen
    textSize(50);
    textFont("jokerman");
    fill('red');
    stroke('yellow');
    strokeWeight(1);
    text("Game Over",width/3+90,height/3);
    //text("Game Over",584,222);

    //increasing text size
    textSize(25);
    textFont("mank");
    fill('lightGrey');
    stroke('lightBlue');
    strokeWeight(1);
    text("Click on Restart to Play Again",width/3+20,height/3.7);
    //text("Click on Restart to Play Again",536,170);

    //set lifetime of the game objects so that they are never destroyed
    //ObstaclesGroup.setLifetimeEach(-1);

  }

  //making the doctor move with the cursor
  doctor.x = mouseX;

  //to display/draw all sprites

  //text settings
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  fill(250);

  //displaying the scoreboard
  text("Score: " + Math.round(count), displayWidth-120, 40);
  //text("Score: " + Math.round(count), 1400, 40);

  //to check the position of the cursor
  // text(mouseX + ", " + mouseY, 30,30);
}

function spawnObstacles() {
  if(World.frameCount % 20 === 0) {

    //creating the obstacle
    var obstacle = createSprite(random(130,1300),-50,10,40);
    obstacle.shapeColor = "blue";
    obstacle.velocityY = (6 + 3*count/100);

    //to generate random images to obstacles
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
    }

    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.6;
    restart.depth = obstacle.depth +10;
    //stop obstacles from colliding with each other
    if(obstacle.isTouching(obstacle)){
      obstacle.x = obstacle.x-50;
    }
    //obstacle.debug = true;
    //obstacle.lifetime = 70;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  doctor.y = 580;
  doctor.x = mouseX;
  count = 0;
  ObstaclesGroup.destroyEach();
  bg.velocityY = (6 + 3 * count / 100);
}