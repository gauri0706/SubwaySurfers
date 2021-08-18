var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg, boy_running, boy_collided, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasure = 0;
var money = 0
var cashG, diamondsG, jwelleryG, swordGroup;
var gameover;
var PLAY = 1;
var END = 0;
var gamestate = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boy_running = loadAnimation("runner1.png","runner2.png");
  boy_collided = loadAnimation("runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup(){
  createCanvas(400,400);
  
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boy_running);
  boy.addAnimation("SahilCollided",boy_collided);
  boy.scale=0.08;
  boy.debug = false
  boy.setCollider("circle",0,0,500);
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
  
  gameOver = createSprite(200,100);
  gameOver.addImage(endImg);
  gameOver.scale = 0.9

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges)

  if (gamestate == PLAY ){
    
  //code to reset the background
  if (path.y > 400 ){
    path.y = height/2;
  }
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    gameOver.visible = false

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      money = money + 10
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasure = treasure + 5
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasure = treasure + 2
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gamestate = END;
        boy.changeAnimation("SahilCollided",boy_collided);
    }
  }
} else if (gamestate == END){
   
   path.velocityY = 0;
   boy.velocityX = 0;
  
   cashG.setVelocityYEach(0);
   diamondsG.setVelocityYEach(0);
   jwelleryG.setVelocityYEach(0);
  
   cashG.setLifetimeEach(-1);
   diamondsG.setLifetimeEach(-1);
   jwelleryG.setLifetimeEach(-1);
  
   gameOver.visible = true;
  
  diamondsG.destroyEach();
  cashG.destroyEach();
  jwelleryG.destroyEach();}

  drawSprites();
  
  textSize(20);
  fill(255);
  text("Treasure : " + treasure,40,30);
  text("Money : " + money, 260, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 6;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}