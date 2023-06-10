/**
 * Created by Nick on 14.07.2017.
 */
src = "SidescrollerEngine/*";
src = "p5.js";

//~~~~~~~~~~~~~~~~~~~~~I-T-E-M-S-O-W-N-E-D~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var VERSION = 0.33;


var PLAYERMAGNET = false;
var NORMALMAGNETSTRENGTH = 0.8;
var ITEMMAGNETSTRENGTH = 1.6;





var ITEM_HP = 0;
var ITEM_01 =  false;
var ITEM_02 =  false;
var ITEM_03 =  false;
var ITEM_04 =  false;
var ITEM_05 =  false;
var ITEM_06 =  false;
var ITEM_07 =  false;
var ITEM_08 =  false;
var ITEM_09 =  false;
var ITEM_10 =  false;
var ITEM_11 =  false;
var ITEM_12 =  false;
var ITEM_13 =  false;
var ITEM_14 =  false;
var ITEM_15 =  false;
var ITEM_16 =  false;
var ITEM_17 =  false;
var ITEM_18 =  false;
var ITEM_19 =  false;
var ITEM_20 =  false;

var SHOPITEM_01 =  false;
var SHOPITEM_02 =  false;
var SHOPITEM_03 =  false;
var SHOPITEM_04 =  false;
var SHOPITEM_05 =  false;
var SHOPITEM_06 =  false;
var SHOPITEM_07 =  false;
var SHOPITEM_08 =  false;
var SHOPITEM_09 =  false;
var SHOPITEM_10 =  false;
var SHOPITEM_11 =  false;
var SHOPITEM_12 =  false;
var SHOPITEM_13 =  false;
var SHOPITEM_14 =  false;
var SHOPITEM_15 =  false;
var SHOPITEM_16 =  false;
var SHOPITEM_17 =  false;
var SHOPITEM_18 =  false;
var SHOPITEM_19 =  false;
var SHOPITEM_20 =  false;
var SHOPITEM_21 =  false;
var SHOPITEM_22 =  false;
var SHOPITEM_23 =  false;
var SHOPITEM_24 =  false;
var SHOPITEM_25 =  false;
var SHOPITEM_26 =  false;
var SHOPITEM_27 =  false;
var SHOPITEM_28 =  false;
var SHOPITEM_29 =  false;
var SHOPITEM_30 =  false;
var SHOPITEM_31 =  false;
var SHOPITEM_32 =  false;


var SHOPITEMPOOL = [
    new ShopItemDataSet(0, "Item 01", 1, "dmg up", "bullet rate up", 200),
    new ShopItemDataSet(1, "Item 02", 1, "double coins", "", 500),
    new ShopItemDataSet(2, "Item 03", 1, "dmg up", "bullet rate down", 180),
    new ShopItemDataSet(3, "Item 04", 1, "bullet speed up", "bullet rate up", 60),
    new ShopItemDataSet(4, "Item 05", 1, "player size down", "", 130),
    new ShopItemDataSet(5, "Item 06", 1, "dmg up", "bullet rate up", 100),
    new ShopItemDataSet(6, "Item 07", 1, "bullet size down", "bullet speed up", 50),
    new ShopItemDataSet(7, "Item 08", 1, "dmg down", "player size down", 150),
    new ShopItemDataSet(8, "Item 09", 1, "player size up", "bullet size up", 80),
    new ShopItemDataSet(9, "Item 010", 1, "bullets per boost up", "", 50),
    new ShopItemDataSet(10, "Item 011", 1, "dmg up", "", 150),
    new ShopItemDataSet(11, "Item 012", 1, "dmg up", "health down", 300),
    new ShopItemDataSet(12, "Item 013", 1, "health up", "", 100),
    new ShopItemDataSet(13, "Item 014", 1, "health up", "dmg down", 120),
    new ShopItemDataSet(14, "Item 015", 1, "health down", "player size down", 100),
    new ShopItemDataSet(15, "Item 016", 1, "fire bullets", "", 200),
    new ShopItemDataSet(16, "Item 017", 1, "shield", "", 150),
    new ShopItemDataSet(17, "Item 018", 1, "crit chance up", "", 80),
    new ShopItemDataSet(18, "Item 019", 1, "crit chance up", "", 220),
    new ShopItemDataSet(19, "Item 020", 1, "invulnurability", "(active)", 150),
    new ShopItemDataSet(20, "Item 021", 1, "shoot big bullet", "(active)", 300),
    new ShopItemDataSet(21, "Item 022", 1, "heal", "(active)", 250),
    new ShopItemDataSet(22, "Item 023", 1, "buff", "(active)", 300),
    new ShopItemDataSet(23, "Item 024", 1, "damage up", "", 400),
    new ShopItemDataSet(24, "Item 025", 1, "damage up", "", 1000),
    new ShopItemDataSet(25, "Item 026", 1, "slowmo", "(active)", 150),
    new ShopItemDataSet(26, "Item 027", 1, "player size down", "", 200),
    new ShopItemDataSet(27, "Item 028", 1, "health  up", "", 400),
    new ShopItemDataSet(28, "Item 029", 1, "health up", "", 200),
    new ShopItemDataSet(29, "Item 030", 1, "bullet speed up", "", 30),
    new ShopItemDataSet(30, "Item 031", 1, "damage up", "bullets per boost down", 200),
    new ShopItemDataSet(31, "Item 032", 1, "crit chance up", "", 70)
];








var VULNURABLE = true;
var ADMIN = false;
var HEALNEXTTICK = 0;
var BUFFED = 0;
var SLOWMO = 0;

var INPUTBLOCKED = 0;
var GAMESTARTED = false;
var HEIGHT = 720;
var WIDTH = 1280;
var ACTUALHEIGHT;
var ACTUALWIDTH;
var FRAMERATE = 60;
var PLAYERBOOSTMULTIPLIER = 0.66;
var GRAVITY = 1;
var PLAYERSIZE = 100;
var PLAYERMODELSIZE = 120;
var TYPE0SIZE = 50;
var TYPE1SIZE = 50;
var PICKUPSIZE = 40;
var COLOR1TYPE0 = 255;
var COLOR2TYPE0 = 255;
var COLOR3TYPE0 = 255;
var PULLPOWER = 0.15;
var COINMULT = 1;
var ITEMMULT = 0.2;
var OBSTACLEMULT = 0.5;
var PICKUPMULT = 0.1;
var DIFFERENTITEMCOUNT = 6;
var DIFFERENTOBSTACLECOUNT = 2;
var DIFFERENTCOINCOUNT = 2;
var DIFFERENTPICKUPCOUNT = 1;
var GAMESPEED = 1;
var ITEMSIZE = 90;
var SCALE = window.innerHeight/720;
var game;
var BACKGROUND;
var cnv;
var loading = FRAMERATE * 3;

function setup(){
    if(window.innerWidth / window.innerHeight <= 16/9){

        ACTUALWIDTH = window.innerWidth;
        ACTUALHEIGHT = window.innerWidth * 9/16;
    }else{
        ACTUALHEIGHT = window.innerHeight;
        ACTUALWIDTH = window.innerHeight * 16/9;
    }
    CHEST = loadImage("Assets/Chest.png");
    cnv = createCanvas(ACTUALWIDTH, ACTUALHEIGHT);
    frameRate(FRAMERATE);
    game = new Game(GAMESPEED, this);
    var mainGameState = game.createNewGameState("mainGameState", 0);
    var mainMenuState = game.createNewGameState("mainMenuState", 1);
    var pauseState = game.createNewGameState("pauseState", 2);
    var MenuShopState = game.createNewGameState("MenuShopState", 3);
    var ItemChoiceState = game.createNewGameState("ItemChoiceState", 4);
    var IngameShopState = game.createNewGameState("IngameShopState", 5);
    var endOfGameScreen = game.createNewGameState("endOfGameScreen", 6);
    game.activeGameState = game.findGameStateByName("mainGameState");
    game.score = parseInt(getCookie("score"));
    game.highscore = getCookie("highscore");
    Wizard = loadImage("Assets/WizardShoot.png");
    WizardBlinking = loadImage("Assets/WizardShootBright.png");
    Coins = loadImage("Assets/Coins.png");
    PLAYERBULLET_0 = loadImage("Assets/PlayerBullet.png");
    PLAYERBULLET_1 = loadImage("Assets/PlayerBullet1.png");
    PLAYERBULLET_2 = loadImage("Assets/PlayerBullet2.png");
    PLAYERBULLETRED_0 = loadImage("Assets/PlayerBullet1Red.png");
    PLAYERBULLETRED_1 = loadImage("Assets/PlayerBullet2Red.png");
    PLAYERBULLETRED_2 = loadImage("Assets/PlayerBullet3Red.png");
    BULLET_0 = loadImage("Assets/Bullet.png");
    BULLET_1 = loadImage("Assets/Bullet1.png");
    BULLET_2 = loadImage("Assets/Bullet2.png");
    REDBULLET_0 = loadImage("Assets/BulletRed.png");
    REDBULLET_1 = loadImage("Assets/Bullet1Red.png");
    REDBULLET_2 = loadImage("Assets/Bullet2Red.png");
    PauseButton = loadImage("Assets/Pause.png");
    White = loadImage("Assets/White.png");
    RED = loadImage("Assets/red.png");
    HEART = loadImage("Assets/Heart.png");
    HEARTBLACK = loadImage("Assets/HeartBlack.png");
    windowResized();
    if(getCookie("admin") == "true"){
        ADMIN = true;
    }
    currentActiveItem =  null;
}




function draw() {
    background(0);
    if(loading > 0){
        fill(255);
        loading--;
        textAlign(CENTER, CENTER);
        textSize(50 * SCALE);
        text("LOADING...  " + (100 - Math.floor(loading / (FRAMERATE * 3) * 100)) + "%", ACTUALWIDTH/2, ACTUALHEIGHT/2);
        text("Version " + VERSION, ACTUALWIDTH/2, ACTUALHEIGHT/2 + (80*SCALE));
        rect(ACTUALWIDTH/2 - (150*SCALE), ACTUALHEIGHT/2 + (30 * SCALE), (300 - ((loading / (FRAMERATE * 3)) * 300)) * SCALE, 20* SCALE);
        textAlign(LEFT, BOTTOM);
    }else {
        game.update();
        game.show();
    }

}

function windowResized() {
    if(window.innerWidth / window.innerHeight <= 16/9){

        ACTUALWIDTH = window.innerWidth;
        ACTUALHEIGHT = window.innerWidth * 9/16;
    }else{
        ACTUALHEIGHT = window.innerHeight;
        ACTUALWIDTH = window.innerHeight * 16/9;
    }

    SCALE = ACTUALHEIGHT/720;
    resizeCanvas(ACTUALWIDTH, ACTUALHEIGHT);


};



function touchStarted() {
    game.inputHandler(true, mouseX, mouseY);
}


function touchEnded() {
    game.inputHandler(false, mouseX, mouseY);
}


function getButtonData(id) {
    switch(id){
        case 0:
            return new ButtonDataSet(10, 40, 10, 40, 256, 0, 0, "knöpchen");
            break;
        default:
            break;
    }
}



function ButtonDataSet(xStart, xEnd, yStart, yEnd, color1, color2, color3, text, textY, textX){
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.yStart = yStart;
    this.yEnd = yEnd;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
    this.text = text;
    this.textY = textY;
    this.textX = textX;
}



function ShopItemDataSet(id, name, textSize, stat1, stat2, prize){
    this.id = id;
    this.name = name;
    this.textSize = textSize;
    this.stat1 = stat1;
    this.stat2 = stat2;
    this.prize = prize;
}

var adminCode = 0;

function keyPressed() {
    if (keyCode == UP_ARROW) {
        if(adminCode === 5){
            adminCode++;
        }else if(adminCode === 0){
            adminCode++;
        }else{
            adminCode = 0;
        }
    }
    if (keyCode == DOWN_ARROW) {
        if(adminCode === 2){
            adminCode++;
        }else if(adminCode === 6){
            adminCode++;
        }else{
            adminCode = 0;
        }
    }
    if (keyCode == LEFT_ARROW) {
        if(adminCode === 1){
            adminCode++;
        }else if(adminCode === 4){
            adminCode++;
        }else{
            adminCode = 0;
        }
    }
    if (keyCode == RIGHT_ARROW) {
        if(adminCode === 3){
            adminCode++;
        }else if(adminCode === 7){
            ADMIN = true;
            setCookie("admin", "true", 10000);
        }else{
            adminCode = 0;
        }
    }
    return true; // prevent default
}





