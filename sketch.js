var monkey;
var monkey1img;
var backgroundsimg;
var backgrounds;
var ground;
var edges;
var fruitGroup;
var appleimg,bananaimg;
var score=0;
var lives=3;
var dinoimg,elephantimg;
var animalgroup;
var losesound,winsound,animalsound,fruitsound;
var soundCheck=0;



function preload()
{
monkey1img=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
backgroundsimg=loadImage("jungle.jpg");
appleimg=loadImage("apple2.png");
bananaimg=loadImage("banana2.png");
dinoimg=loadImage("dinosaur.png");
elephantimg=loadImage("elephantsj.png");
losesound=loadSound("loseaudio.wav");
winsound=loadSound("winaudio.wav");
animalsound=loadSound("animalsound.wav");
fruitsound=loadSound("fruit.wav");

}

function setup() {
	createCanvas(windowWidth, windowHeight);

	
	
	backgrounds=createSprite(width/2,height/2);
	backgrounds.addImage(backgroundsimg);
	backgrounds.scale=3;
	backgrounds.velocityX=-3;
	monkey=createSprite(width/4-50,height-50);
	monkey.addAnimation("running",monkey1img);
    monkey.scale=0.2;
	
	ground=createSprite(width/2,height-10,width,10);
    ground.visible=false;
	

	edges=createEdgeSprites;

  fruitGroup=new Group();
  animalgroup=new Group();
}



function draw() {
	
	 

  
  if(keyDown("space") && monkey.y>=height/2+10||touches.length>0 )
      {
		 monkey.velocityY=-18;
		 touches=[]
      }
   monkey.velocityY=monkey.velocityY+0.8;
   
  monkey.collide(ground);
  if(backgrounds.x<0){
    backgrounds.x=width/2;
  }
  if(fruitGroup.isTouching(monkey)){
	 
	  fruitsound.play();
	for(var i=0;i<fruitGroup.length;i++){
		if(fruitGroup.get(i).isTouching(monkey)){
			fruitGroup.get(i).destroy();
	  score=score+40
  }
}   
}
if(monkey.isTouching(animalgroup)){

	lives=lives-1;
	
	animalsound.play();
	for(var i=0;i<animalgroup.length;i++){
		if(animalgroup.get(i).isTouching(monkey)){
	
			animalgroup.get(i).destroy();
			
}

	}
}
  drawSprites();
  textSize(30);
	 textFont("GEORGIA");
	 fill("black");
	text("SCORE "+score,width-200,height/4-50);
	text("LIVES "+lives,width/4-50,height/4-50);
	if(monkey.isTouching(fruitGroup)){
		fill("blue");
		
	}
	
	spawnfruits();
	spawnanimals();
	
	if(lives<=0){
		background(0);
		fill("red");
		textSize(30);
		text("YOU LOSE",width/2-100,height/2);
		if(soundCheck===0){
			losesound.play();
			animalsound.stop();
			soundCheck=1;
		
		}
	}
	if(score>=1000){
		background(0);
		fill("red");
		textSize(30);
		text("YOU WIN",width/2-100,height/2);
		if(soundCheck===0){
			winsound.play();
			animalsound.stop();
			soundCheck=1;
			
		}
	}
}


function spawnfruits()
{
	if(frameCount%80===0)
    {
	  var fruits=createSprite(width,random(50,height/2)) ;
	  fruits.scale=0.8
	  fruits.velocityX=-(4+score/80);
	  var rand = Math.round(random(1,2));
	  switch(rand){
		  case 1: fruits.addImage("fruit1",appleimg);
		  break;
		  case 2: fruits.addImage("fruit1", bananaimg);
		  break;
	}
	fruitGroup.add(fruits);
}
}
function spawnanimals()
{
	if(frameCount%160===0)
    {
	  var animals=createSprite(width,height-50) ;
	  animals.scale=0.3;
	  animals.velocityX=-(4+score/80);
	  var rand = Math.round(random(1,2));
	  switch(rand){
		  case 1: animals.addImage("animal1",dinoimg);
		  break;
		  case 2: animals.addImage("animal1",elephantimg);
		  break;
	}
	animalgroup.add(animals);
}
}

