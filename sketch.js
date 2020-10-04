var ghost,ghostImg;
var tower,towerImg;
var door,doorImg, doorsGroup;
var climber,climberImg,climbersGroup;
var invisibleBlock,invisibleBlockGroup;
var gameState="play";


function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  sg=loadSound("spooky.wav");
 
  
}

function setup(){
  createCanvas(600,600);
  
  tower= createSprite(300,300);
  tower.addImage("moving",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200);
  ghost.addImage("r",ghostImg);
  ghost.scale=0.3;
  
  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleBlockGroup= new Group();
  
  sg.loop();
  
  
}

function draw(){
  background("black");
 
  if(gameState==="play"){
  drawSprites();
   
  spawnDoors();
  
  if(tower.y>500){
    tower.y=300;
  }
  
if(keyDown("left")){
   ghost.x=ghost.x-3;
   }
  
  if(keyDown("right")){
   ghost.x=ghost.x+3;
   }
  
  if(keyDown("space")){
   ghost.velocityY=-5;
  }
 ghost.velocityY=ghost.velocityY+0.3;
 
  if(ghost.isTouching(climbersGroup)){
     ghost.velocityY=0;
     gameState="end";
     }
  if(invisibleBlockGroup.isTouching(ghost)||(ghost.y>600)){
   ghost.destroy();
    gameState="end";
  }
  }
  
  if(gameState==="end"){
    stroke("yellow");
     fill("yellow");
    textSize(30);
    text("GameOver",300,250);
  }
}


function spawnDoors(){
  if(frameCount%240===0){
  door= createSprite(200,-50);
  door.velocityY=2;
  door.x=Math.round(random(120,400));
  door.addImage("mov",doorImg);
  door.lifetime=800;
  doorsGroup.add(door);
  ghost.depth=door.depth+1;
 
   climber=createSprite(200,10);
  climber.addImage("m",climberImg);
   climber.velocityY=2;
  climber.x=door.x;
    climber.lifetime=800;
    climbersGroup.add(climber);
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x= door.x;
    invisibleBlock.velocityY=2;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
     }

 
}