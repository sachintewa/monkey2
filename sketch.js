var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivaltime;
var ground;
var score;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 300);


  monkey = createSprite(60, 200, 20, 20);
  monkey.addAnimation("mo", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(205, 250, 700, 20);
  ground.velocityX = -9;
  ground.x = ground.width / 2;

  foodGroup = new Group();
  obstacleGroup = new Group();


  survivaltime = 0;

}


function draw() {
  background("white");

  if (keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -12;
  }

  survivaltime = survivaltime + Math.round(getFrameRate() / 50);

  monkey.velocityY = monkey.velocityY + 0.7;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  text("SURVIVAL TIME: " + survivaltime, 450, 50)

  if (obstacleGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
   fill("red");
    textSize(25);
    text("OVER",250,150)

  }
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
  }

  monkey.collide(ground);


  spawnbanana();
  spawnObstacles();
  drawSprites();

}

function spawnbanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(700, 100, 20, 20);
    banana.addImage("ban", bananaImage);
    banana.velocityX = -10;
    banana.scale = 0.1;
    banana.y = Math.round(random(100, 200));
    banana.lifetime = 70;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
    obstacle = createSprite(700, 210, 20, 20);
    obstacle.addImage("ob", obstaceImage);
    obstacle.velocityX = -10;
    obstacle.lifetime = 70;
    obstacle.scale = 0.15;

    obstacleGroup.add(obstacle);
  }
}