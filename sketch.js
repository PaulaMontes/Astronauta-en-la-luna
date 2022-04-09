var aus, aus_crash, aus_run;
var met, metImg, metGroup;
var moon, moonImg;
var invisibleGroud;
var jumpSound, dieSound;

var score = 0;
var gameState = "play";

function preload(){
jumpSound = loadSound ("jump.mp3");
dieSound = loadSound ("die.mp3");

aus_run = loadAnimation ("austronauta.gif");
//aus_crash = loadAnimation ("choque.png");

metImg = loadImage ("meteorito.png");
moonImg = loadImage ("luna.jpeg");
}

function setup() {
createCanvas(600,500);

moon = createSprite (300,300);
moon.addImage(moonImg);
moon.scale = 3;
moon.velocityX = -5;

//ground.velocityX = -(6 + 3*score/100);

aus = createSprite(50,50,20,50);
aus.addAnimation ("aus", aus_run);
//aus.addAnimation ("aus", aus_crash);
aus.scale = 0.5;


invisibleGround = createSprite(50,400,100,100);
invisibleGround.visible = false;

aus.setCollider ("rectangle", 0, 0, 50, 50, 0);
//aus.debug = true;

metGroup = new Group();

score = 0;
}

function draw() {
 
    text ("Score: "+score, 500,50);

    if (gameState == "play"){
        score = score + Math.round(getFrameRate()/60);

        if (keyDown ("space")){
            aus.velocityY = -10;
            jumpSound.play();
            //score = score +1;
        }
        aus.velocityY = aus.velocityY+0.7;
        aus.collide(invisibleGround);
        spawnMet();

        if (moon.x < 300){
            moon.x = 450}


        if (metGroup.isTouching(aus)){
            aus.destroy();
            metGroup.destroyEach();
            dieSound.play();
            gameState = "end";
        }


        drawSprites();
    }
    if (gameState === "end"){
        fill ("red");
        textSize (50);
        text ("Game over", 160, 250);
        fill ("yellow");
        textSize (30);
        text ("Has chocado con un meteorito", 90, 300);
    }
}

function spawnMet(){
    if (frameCount %120 === 0){
        met = createSprite (610, 370, 20, 20);
        met.addImage(metImg);
        met.scale = 0.25;
        met.velocityX = -5;
        met.lifetime = 800;
        aus.depth = met.depth;
        aus.depth +=1;

        metGroup.add(met);
    }
}

