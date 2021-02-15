var canvas;
var gameState = "start";
var john;
var score;

function preload(){
	johnimg = loadImage("john.png");
	coinsimg = loadImage("jet_coins.png");
	firstback = loadImage("jetpackback1.jpg");
	zapperimg = loadImage("NewZapper.png");
	missile = loadImage("mis.png");
	ground = loadImage("jet gru.jpg");
	back = loadImage("grun.png");
	play = loadImage("play.png");
	johnZ = loadImage("johnzapp.png");
	johnFall = loadImage("johnfall.png")
	laserimg = loadImage("laser1.jpg");

}

function setup(){
 
	canvas = createCanvas(1200,700);

	missileG = new Group();
	bulletsG = new Group();
	zapperG = new Group();

	backi = createSprite(1200,430);
	backi.addImage(back);
	backi.velocityX = -5;
	backi.scale = 2.2;
	
	gru = createSprite(1200, 660, 2400, 50);
	gru.addImage(ground); 
	gru.scale = 1.55;
	gru.velocityX = -5;

	gruinvinsible = createSprite(600,600,1200,5);
	gruinvinsible.visible = false;

	gruinvinsible2 = createSprite(600,30,1200,10);
	gruinvinsible2.visible = false;

	john = createSprite(100,500,10,10);
	john.addImage(johnimg);
	john.scale = 0.15;

	playbutton = createSprite(570,490,10,10);
	playbutton.addImage(play);
	playbutton.scale = 0.5;

	storybutton = createSprite(570,550,40,20);

	backbutton = createSprite(990,550,40,20);
	
}

function draw() {
  
	background("black");

if(gameState === "start"){
	
	background(firstback);

	john.visible = false;
	gru.visible = false;
	backi.visible = false;
	storybutton.visible = true;
	playbutton.visible = true;
	backbutton.visible = false;

	drawSprites();

	if(mousePressedOver(playbutton)){
		gameState = "play";

	}

	if(mousePressedOver(storybutton)){
		gameState = "story";
	
	}
	
}

if(gameState === "play"){
	
	background("black");

	gru.visible = true;
	john.visible = true;
	playbutton.visible = false;
	backi.visible = true;
	storybutton.visible = false;
	backbutton.visible = false;

	if(keyDown("space")){
		john.velocityY = -10;
		bullets();

	}

	john.velocityY = john.velocityY+1;

	john.collide(gruinvinsible);

	spawnMissile();
	zapper();
	coinsF();
	laserF();

	if(john.isTouching(zapperG)){
		john.addImage(johnZ);
		backi.velocityX = 0;
		gru.velocityX = 0;
		zapperG.visible = false;

	}

	if(john.isTouching(missileG)){
		john.addImage(johnFall);
		backi.velocityX = 0;
		gru.velocityX = 0;

	}

	if(gru.x < 0){
		gru.x = 1200;
	
	}

	if(backi.x < 0){
		backi.x = 1200;
	
	}

	john.collide(gruinvinsible2);

	drawSprites();

}

if(gameState === "story"){
	john.visible = false;
	gru.visible = false;
	backi.visible = false;
	playbutton.visible = false;
	storybutton.visible = false;
	backbutton.visible = true;

	background("black");

	textSize(20);
	fill("red");
	text("STORY",550,50);

	textSize(20);
	fill("red");
	text("OBJECTIVE",530,250);
	
	textSize(15);
	fill("aquamarine");
	text("The objective of the game is to travel as far as possible, collect coins, and avoid hazards such as zappers, missiles and high-intensity laser beams.",50,300);
	
	textSize(15);
	fill("aquamarine");
	text("John works as a salesman for a gramophone-making company, but the business is about to go bankrupt due to low sales. One day, as he walks down a street,",50,100);

	textSize(15);
	fill("aquamarine");
	text("sad because of the low sales, he finds one of the top secret laboratories of Legitimate Research, and sees the Machinegun jetpack inside. Dreaming of using the jetpack to ",50,120);

	textSize(15);
	fill("aquamarine");
	text("do good, John bursts through the wall of the laboratory and steals the experimental jetpack from the clutches of the scientists, thus beginning the game.",50,140);

	textSize(20);
	fill("red");
	text("CONTROLS",530,420);

	textSize(15);
	fill("aquamarine");
	text("controls: spacebar ",520,460);

	if(mousePressedOver(backbutton)){
		gameState = "start"

	}

	drawSprites();
  
}

	if(gameState === "burnt"){


	}

	if(exploded){


	}

}

function spawnMissile(){
	if(frameCount%200 === 0){
		miss = createSprite(1200,600);
		miss.addImage(missile);
		miss.velocityX = -10;
		miss.scale = 0.3;

		if(john.y < 550){
			miss.y = random(john.y-50,john.y+50);

		}
		else{
			miss.y = john.y-70;

		}

		miss.lifetime = 120;

		missileG.add(miss);

	}

}

function bullets(){
	if(frameCount%3 === 0){
		bul = createSprite(john.x,john.y+10,8,15);
		bul.velocityY = +20;
		bul.shapeColor = "yellow";
		bulletsG.add(bul);
		
		bul2 = createSprite(john.x-10,john.y+10,8,15);
		bul2.velocityY = +20;
		bul2.velocityX = -3;
		bul2.shapeColor = "yellow";
		bulletsG.add(bul2);

		bul3 = createSprite(john.x+10,john.y+10,8,15);
		bul3.velocityY = +20;
		bul3.velocityX = +3;
		bul3.shapeColor = "yellow";
		bulletsG.add(bul3);

	}

}

function zapper(){
	if(frameCount%100 === 0){
		zapp = createSprite(1200,600);
		zapp.addImage(zapperimg);
		zapp.rotationSpeed = 10;
		zapp.velocityX = -10;
		zapp.scale = 0.4;
		zapperG.add(zapp);

		if(john.y < 550){
			zapp.y = random(john.y-100,john.y+100);

		}
		else{
			zapp.y = john.y-170;

		}

		console.log(john.y);

	}

}

function coinsF(){
	if(frameCount%110 === 0){
		
		
		/*for(i = 600; i < 2400; i = i+40 ){
			coins = createSprite(i,400);
			coins.addImage(coinsimg);
			coins.velocityX = -5;
			coins.scale = 0.4;

		}*/
		var r = Math.round(random(4,10));
		/*for(var i=1;i<=r;i++){
			for(var x=1;x<=i;x++){
			coins = createSprite(1200+40*i,300+30*x);
			coins.addImage(coinsimg);
			coins.velocityX = -5;
			coins.scale = 0.31;
			}
		
		}*/
		for(var i=r;i>=1;i--){
			for(var x=1;x<=i;x++){
			coins = createSprite(1200+40*i,300+30*x);
			coins.addImage(coinsimg);
			coins.velocityX = -5;
			coins.scale = 0.31;
			}
		}
		
	}

}

function laserF(){
if(frameCount%100 === 0){
	laser = createSprite(450,random(15,545));
	laser.addImage(laserimg);
	laser.scale = 1.1;
	laser.lifetime = 40;

}

}