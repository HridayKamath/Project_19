var bananaImage;
var obstacleImage;
var monkeyRunning;
var obstacleGroup;
var bg, bgImage;
var score;
var banana, bananasGroup;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var touchCount;



function preload() {

  bgImage = loadImage("jungle.jpg");
  monkeyRunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png",
    "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png",
    "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);

  bg = createSprite(200, 200, 10, 10);
  bg.addImage("background", bgImage);
  bg.velocityX = -4;

  monkey = createSprite(80, 350, 10, 10);
  monkey.addAnimation("s", monkeyRunning);
  monkey.scale = 0.095;


  bananasGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  ground = createSprite(80, 380, 800, 10);
  ground.visible = false;

  gameState = PLAY;
  
  touchCount = 0;

}

function draw() {
  background(220);
  //console.log(touchCount);
  
  if(obstaclesGroup.isTouching(monkey)){
    touchCount = touchCount+1;
  }
  
   if( touchCount < 15){
 
 monkey.scale = 0.095;
     
 
   
 }


if(gameState === PLAY){

 if (keyDown("space") && monkey.y > 320) {
    monkey.velocityY = -14;
  }
  monkey.velocityY = monkey.velocityY + 0.5;

 if (bg.x < 0) {
    bg.x = bg.width / 2;
  }
  
  spawnBananas();
    spawnObstacles();

}
  
  
  
  
  
  if(touchCount > 29){
  
  gameState = END;
    
    
  
  
  }
  
  if(gameState === END){
  
  bg.velocityX = 0;
    monkey.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  bananasGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    
    monkey.scale = 0.095;

    
    
    
    
  }
  

  monkey.collide(ground);

 
  

 

  if (bananasGroup.isTouching(monkey)) {

    bananasGroup.destroyEach();
    score = score + 2;

  }

  switch (score) {

    case 10: monkey.scale = 0.12;
      break;
      
      case 20: monkey.scale = 0.14;
       break;
       
      case 30: monkey.scale = 0.16;
       break;
       
      case 50: monkey.scale = 0.18;
       break; 
       
       default: break; 



  }
  
  


 

    
  //monkey.debug= true;

    drawSprites();
  
   
    stroke("white");
    textSize(20);
    fill("white");
    text("Score " + score, 30, 30);



  }

  function spawnBananas() {

    if (frameCount % 100 === 0) {

      var rand = Math.round(random(180, 240));
      banana = createSprite(430, rand, 100, 10);
      banana.addImage("Banana", bananaImage);
      banana.scale = 0.08;
      //banana.y = randomNumber(150,230);
      banana.velocityX = -4;
      banana.lifetime = 200;
      bananasGroup.add(banana);

    }

  }


  function spawnObstacles() {

    if (frameCount %   150 === 0) {

      //var rand = Math.round(random(180, 240));
      obstacle = createSprite(430, 340, 100, 10);
      obstacle.addImage("Obstacle", obstacleImage);
      obstacle.scale = 0.22;
      obstacle.velocityX = -4;
      obstacle.lifetime = 200;
      obstaclesGroup.add(obstacle);
      
      //obstacle.debug = true;
      obstacle.setCollider("circle",10,10,150);
      

    }

  }




