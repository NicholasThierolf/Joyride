/**
 * Created by Nick on 22.08.2017.
 */
src = "../SidescrollerEngine/*";
src = "../p5.js";
function GamePlayState(name, game, outerGameShell){
    this.shell = outerGameShell;
    this.name = name;
    this.game = game;
    this.gameObjects = [];
    this.backgrounds = new Backgrounds(10, loadImage("Assets/Background.png"), 300, 360);
    this.backdrop = new Backgrounds(5, loadImage("Assets/comicBackground.png"), 275, 183);
    this.enemies = new EnemyObjects(this);
    this.switchTimer = -1;

    this.red = 0;

    this.levels0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    this.levels1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    this.levels2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    this.levels3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    this.levels = new Levels(this);
    this.challengeRoomLevelCounter = 0;

    this.pickupItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    this.hitBlocked = 0;

    this.itemPool = [];


    for(var i = 0; i <= DIFFERENTITEMCOUNT; i++){
        this.itemPool.push(i);
    }


    this.playerStats = new PlayerStats();


    this.playerPosX = this.game.playerPosX;
    this.playerPosY = this.game.playerPosY;
    this.playerSpeedY = 0;
    this.player = new Player(this.playerPosX, this.playerPosY, this.shell, this.game, this);
    this.animatedText = [];



    this.createObject = function (objectId, yModifier, xStart, blueprintId, speedModifier) {
        this.gameObjects.push(new GameObject(objectId, yModifier, xStart, blueprintId, speedModifier, this.game, this));
    };

    this.setSwitchTimer = function (time) {
        this.switchTimer = time * FRAMERATE;
    }



    this.update = function (speed) {

        BUFFED -= GAMESPEED;
        SLOWMO -= 1;
        if(SLOWMO > 0 && GAMESPEED == 1){
            GAMESPEED = 0.5;
        }

        if(SLOWMO == 0){
            SLOWMO--;
            GAMESPEED = 1;
        }

        if(currentActiveItem != null) {
            currentActiveItem.update();
        }

        this.levels.update();

        if(GAMESTARTED && !this.levels.inChallengeRoom && !this.levels.inBossFight) {
            this.game.distance = this.game.distance + 0.25 * GAMESPEED;
        }

        if(this.hitBlocked > 0){
            this.hitBlocked--;
        }

        this.playerStats.updateStats(new ItemStats());

        if(this.switchTimer === 0){
            this.game.changeGameStateByNumber(1);
            //this.resetGameStat()
            GAMESPEED = 1 * SCALE;
            ACTUALGAMESPEED = 1;
            this.switchTimer = -1;
        }

        if(this.switchTimer > 0){
            this.switchTimer--;
        }




        this.enemies.update();

        for(var i = this.gameObjects.length - 1; i >= 0; i-- ) {
            this.gameObjects[i].update(speed);
            if(this.gameObjects[i].x < -3000){
                this.gameObjects.splice(i, 1);
            }
        }

        for(var i = this.animatedText.length - 1; i >= 0; i-- ) {
            this.animatedText[i].update();
            if(this.animatedText[i].time < 0){
                this.animatedText.splice(i, 1);
            }
        }


        this.player.update();


        this.backgrounds.update();
        this.backdrop.update();



    };


    this.show = function () {
        this.backdrop.show();
        this.backgrounds.show();
        this.levels.show();

        for(var i = 0; i < this.gameObjects.length; i++ ) {
            this.gameObjects[i].show();
        }
        this.player.show();
        image(Coins, 1 * SCALE, 1 * SCALE, [sWidth =  38 * SCALE], [sHeight = 38 * SCALE], [dx = 0], [dy = 0], [dWidth = 60], [dHeight = 60]);
        textStyle(BOLD);
        textSize(25 * SCALE);
        fill(0);
        text(":" + this.game.currentCoins, 32 * SCALE, 28 * SCALE);
        text("CURRENT: " + Math.floor(this.game.distance) + "m", 15 * SCALE, 55 * SCALE);
        if(this.game.distance > this.game.highscore){
            text("HIGHSCORE: " + Math.floor(this.game.distance) + "m", 15 * SCALE, 85 * SCALE);
        }else {
            text("HIGHSCORE: " + this.game.highscore + "m", 15 * SCALE, 85 * SCALE);
        }



        this.enemies.show();

        for(var i = 0; i < this.player.maxHealth; i++) {
            if(i < this.player.health) {
                image(HEART, ACTUALWIDTH * 1.95 / 3 + i * ACTUALWIDTH / 30, ACTUALHEIGHT / 100, ACTUALWIDTH / 30, ACTUALWIDTH / 30);
            }else{
                image(HEARTBLACK, ACTUALWIDTH * 1.95 / 3 + i * ACTUALWIDTH / 30, ACTUALHEIGHT / 100, ACTUALWIDTH / 30, ACTUALWIDTH / 30);
            }
        }

        for(var i = this.animatedText.length - 1; i >= 0; i-- ) {
            this.animatedText[i].show();
        }

        if(this.game.activeGameState === this) {
            image(PauseButton, (WIDTH - 60) * SCALE, 10 * SCALE, 50 * SCALE, 50 * SCALE);
        }
        if(!GAMESTARTED){
            textAlign(CENTER, CENTER);
            textSize(40 * SCALE);
            text("HOLD DOWN LEFT MOUSE TO FLY UP", ACTUALWIDTH/2, ACTUALHEIGHT/2);
            textAlign(LEFT, BOTTOM);
        }

        if(currentActiveItem != null){
            fill(255, 255, 255, 120);
            arc(ACTUALWIDTH - (80 * SCALE), ACTUALHEIGHT - (80 * SCALE), 140 * SCALE, 140 * SCALE, PI + PI / 2, PI + PI / 2 + (PI * 1.999999) * ((currentActiveItem.maxCounter - currentActiveItem.active) / currentActiveItem.maxCounter));
            currentActiveItem.show();
        }

        if(SLOWMO > 0){
            fill(255, 255, 255, 120);
            rect(ACTUALWIDTH / 2 - (152 * SCALE), 50 * SCALE, 304 * SCALE, 34 * SCALE);
            fill(0);
            rect(ACTUALWIDTH / 2 - (150 * SCALE), 52 * SCALE, (300 * SLOWMO / (4 * FRAMERATE)) * SCALE, 30 * SCALE);
        }
        if(this.red > 0){
            tint(200 / (60/this.red), 50 / (60/this.red));
            image(RED, 0, 0, ACTUALWIDTH, ACTUALHEIGHT);
            noTint();
            this.red -= GAMESPEED;
        }

    };


    this.inputHandler = function (id, x, y) {
        if(!GAMESTARTED){
            GAMESTARTED = true;
        }
        if(dist(x, y, (WIDTH - 35) * SCALE, 10 * SCALE) < 50 * SCALE){
            this.game.changeGameStateByNumber(2)
            this.game.activeGameState.secondGameState = this;
        }else {
            if(dist(x, y, ACTUALWIDTH - (80 * SCALE), ACTUALHEIGHT - (80 * SCALE)) < 100 && currentActiveItem != null){
                currentActiveItem.activate();

            }else{
                this.player.fly(id);
            }
        }
    };



    this.resetGameStat = function () {
        this.levels0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.levels1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.levels2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.levels3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.pickupItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        this.enemies.reset();
        this.backgrounds = new Backgrounds(10, loadImage("Assets/Background.png"), 450, 540);
        this.backdrop = new Backgrounds(5, loadImage("Assets/comicBackground.png"), 275, 183);
        this.gameObjects = [];
        this.game.distance = 0;
        this.game.currentCoins = 0;
        this.game.startScore = this.game.score + 0;

        this.red = 0;
        this.levels = new Levels(this)
        this.itemPool = [];

        for(var i = 1; i <= DIFFERENTITEMCOUNT; i++){
            this.itemPool.push(i);
        }

        currentActiveItem = null;


        SHOPITEMPOOL = [
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
    }


}



function MainMenuState(name, game, outerGameShell){
    this.name = name;
    this.game = game;
    this.shell = outerGameShell;
    this.adminPushed = false;
    this.buttons = [
        new ButtonObject(0, this.shell, this.game, this, new ButtonDataSet(10, 200, 10, 200, 256, 0, 0, "NEW GAME", 40, 40)),
        new ButtonObject(3, this.shell, this.game, this, new ButtonDataSet(250, 450, 10, 200, 256, 0, 0, "SHOP < WIP >", 40, 270))
    ];



    this.createButton = function (buttonId) {

    };

    this.update = function () {
        if(ADMIN && !this.adminPushed){
            this.adminPushed = true;
            this.buttons.push(new ButtonObject(1, this.shell, this.game, this, new ButtonDataSet(750, 950, 10, 200, 256, 0, 0, "INVULNURABLE", 40, 760)));
        }
        for(var i = this.buttons.length - 1; i >= 0; i--){
            this.buttons[i].update();
        }
    };


    this.show = function () {
        for(var i = this.buttons.length - 1; i >= 0; i--){
            this.buttons[i].show();
        }
        fill(255);
        noStroke();
        text("Coins: " + this.game.score, 300 * SCALE, 300 * SCALE);
        text("HIGHSCORE: " + this.game.highscore, 350 * SCALE, 350 * SCALE);
    };

    this.inputHandler = function (id, x, y) {
        for(var i = this.buttons.length - 1; i >= 0; i--){
            this.buttons[i].inputHandler(id, x, y);
        }

    }
}


function PauseState(name, game, outerGameShell){
    this.game = game;
    this.name  = name;
    this.shell = outerGameShell;
    this.secondGameState;
    this.itemID;


    this.update = function () {
    }

    this.show = function () {
        this.secondGameState.show();
        tint(127, 200);
        image(White, 0, 0, ACTUALWIDTH, ACTUALHEIGHT);
        noTint();
        fill(255, 0, 0)
        rect(ACTUALWIDTH * 2/5, ACTUALHEIGHT * 2/5 - 200 * SCALE, ACTUALWIDTH/5, ACTUALHEIGHT/5, 20* SCALE);
        fill(0)
        textAlign(CENTER, CENTER);
        textSize(30* SCALE)
        text("CONTINUE", ACTUALWIDTH/2, ACTUALHEIGHT/2 - 200 * SCALE);
        stroke(255)
        strokeWeight(2 * SCALE)
        text("Damage: " + this.secondGameState.playerStats.playerDamage, ACTUALWIDTH/2, ACTUALHEIGHT/2);
        text("Health: " + this.secondGameState.playerStats.playerHp, ACTUALWIDTH/2, ACTUALHEIGHT/2 + 40 * SCALE);
        text("Bullet size: " + this.secondGameState.playerStats.bulletSize, ACTUALWIDTH/2, ACTUALHEIGHT/2 + 80 * SCALE);
        text("Bullet speed: " + this.secondGameState.playerStats.bulletSpeed, ACTUALWIDTH/2, ACTUALHEIGHT/2 + 120 * SCALE);
        text("Bullet rate: " + this.secondGameState.playerStats.bulletRate, ACTUALWIDTH/2, ACTUALHEIGHT/2 + 160 * SCALE);
        text("Crit chance: " + this.secondGameState.playerStats.critChance * 100 + "%", ACTUALWIDTH/2, ACTUALHEIGHT/2 + 200 * SCALE);
        noStroke();


        this.bulletRate = 5;
        this.bulletSpeed = 1;
        this.bulletSize = 20;
        this.bulletAmount;
        this.playerSpeed;
        this.maxBulletsPerBoost = 3;
        this.playerHp = 3 + ITEM_HP;
        this.playerSize = 1;
        this.playerDamage = 1;


        textAlign(LEFT, BOTTOM);
    }

    this.inputHandler = function (id, x, y) {
        if(!id) {
            if (x >= ACTUALWIDTH * 2/5 && x <= ACTUALWIDTH * 3/5 && y >= ACTUALHEIGHT * 2/5 - 200 * SCALE && y <= ACTUALHEIGHT * 3/5 - 200 * SCALE) {
                this.game.changeGameStateByNumber(0);
            }

        }
    }

}


function MenuShopState(name, game, outerGameShell){
    this.name = name;
    this.game = game;
    this.shell = outerGameShell;


    this.shopItems = [
        new ShopItem(0, this.shell, this.game, this, new ButtonDataSet(10, 200, 10, 200, 256, 0, 0, "Back", 40, 40)),
        new ShopItem(1, this.shell, this.game, this, new ButtonDataSet(250, 450, 10, 200, 256, 0, 0, "Magnet", 40, 270)),
    ];


    this.createButton = function (buttonId) {

    };

    this.update = function () {
        for(var i = this.shopItems.length - 1; i >= 0; i--){
            this.shopItems[i].update();
        }
    };


    this.show = function () {
        for(var i = this.shopItems.length - 1; i >= 0; i--){
            this.shopItems[i].show();
        }
        fill(255);
        text("Coins: " + this.game.score, 300 * SCALE, 300 * SCALE);
    };

    this.inputHandler = function (id, x, y) {
        for(var i = this.shopItems.length - 1; i >= 0; i--){
            this.shopItems[i].inputHandler(id, x, y);
        }

    }



}




function ItemChoiceMenu(name, game, outerGameShell){
    this.game = game;
    this.name  = name;
    this.shell = outerGameShell;
    this.secondGameState;
    this.itemID;
    this.blocked = 0.5 * FRAMERATE;

    
    this.update = function () {
        this.blocked--;
    }
    
    this.show = function () {
        this.secondGameState.show();
        fill(0, 255, 0);
        rect(ACTUALWIDTH * 6/20, ACTUALHEIGHT * 6/10, ACTUALWIDTH * 3/20, ACTUALHEIGHT * 2/10, 20 * SCALE);
        fill(255, 0,0);
        rect(ACTUALWIDTH * 11/20, ACTUALHEIGHT * 6/10, ACTUALWIDTH * 3/20, ACTUALHEIGHT * 2/10, 20 * SCALE);
        fill(0);
        textStyle(BOLD);
        textSize(40 * SCALE);
        text("Keep", ACTUALWIDTH * 6.7/20, ACTUALHEIGHT * 7.1/10);
        text("Don't", ACTUALWIDTH * 11.7/20, ACTUALHEIGHT * 7.1/10);
        fill(0,0,255);
        text("ITEM: " + this.itemID, ACTUALWIDTH * 8.8/20, ACTUALHEIGHT * 3.6/10)
    }
    
    this.inputHandler = function (id, x, y) {
        if(!id && this.blocked <= 0) {
            if (x >= ACTUALWIDTH * 6/20 && x <= ACTUALWIDTH * 9/20 && y >= ACTUALHEIGHT * 6/10 && y <= ACTUALHEIGHT * 8/10) {
                this.game.changeGameStateByNumber(0);
                this.game.animated = [];
                switch (this.itemID) {
                    case 0:
                        ITEM_HP++;
                        HEALNEXTTICK++;
                        break;
                    case 1:
                        ITEM_01 = true;
                        break;
                    case 2:
                        ITEM_02 = true;
                        break;
                    case 3:
                        ITEM_03 = true;
                        break;
                    case 4:
                        ITEM_04 = true;
                        break;
                    case 5:
                        ITEM_05 = true;
                        break;
                    case 6:
                        ITEM_06 = true;
                        break;
                    case 7:
                        ITEM_07 = true;
                        break;
                    case 8:
                        ITEM_08 = true;
                        break;
                    case 9:
                        ITEM_09 = true;
                        break;
                    case 10:
                        ITEM_10 = true;
                        break;
                    case 11:
                        ITEM_11 = true;
                        break;
                    case 12:
                        ITEM_12 = true;
                        break;
                    case 13:
                        ITEM_13 = true;
                        break;
                    case 14:
                        ITEM_14 = true;
                        break;
                    case 15:
                        ITEM_015 = true;
                        break;
                    case 16:
                        ITEM_16 = true;
                        break;
                    case 17:
                        ITEM_17 = true;
                        break;
                    case 18:
                        ITEM_18 = true;
                        break;
                    case 19:
                        ITEM_19 = true;
                        break;
                    case 20:
                        ITEM_20 = true;
                        break;

                }

            }
            if (x >= ACTUALWIDTH * 11/20 && x <= ACTUALWIDTH * 14/20 && y >= ACTUALHEIGHT * 6/10 && y <= ACTUALHEIGHT * 8/10) {
                ITEM_HP++;
                HEALNEXTTICK++;
                this.game.changeGameStateByNumber(0);
                this.game.animated = [];
            }
        }
    }
    
}


function IngameShopState(name, game, outerGameShell){
    this.shopItemPool = SHOPITEMPOOL;
    this.game = game;
    this.name  = name;
    this.shell = outerGameShell;
    this.items = [];
    var item;
    for(var i = 0; i < 6; i++){
        item = getRandomInt(0, this.shopItemPool.length - 1);
        this.items.push(this.shopItemPool[item])
        this.shopItemPool.splice(item, 1);
    }


    this.update = function () {
    }

    this.show = function () {
        for(var i = 1; i < 6; i++){
            fill(0, 255, 0);
            rect(ACTUALWIDTH * (i)/7, ACTUALHEIGHT * 3/7, ACTUALWIDTH * 1/7, ACTUALHEIGHT * 1/7, 10 * SCALE);
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(20 * SCALE);
            text(this.items[i-1].name, ACTUALWIDTH * (i + 0.5)/7, ACTUALHEIGHT * 3.2/7);
            text(this.items[i-1].prize + "$", ACTUALWIDTH * (i + 0.5)/7, ACTUALHEIGHT * 3.4/7);
            text(this.items[i-1].stat1, ACTUALWIDTH * (i + 0.5)/7, ACTUALHEIGHT * 3.6/7);
            text(this.items[i-1].stat2, ACTUALWIDTH * (i + 0.5)/7, ACTUALHEIGHT * 3.8 /7);
            textAlign(LEFT, TOP);
        }

        fill(0, 255, 0);
        rect(ACTUALWIDTH * 3/7, ACTUALHEIGHT * 4/7, ACTUALWIDTH * 1/7, ACTUALHEIGHT * 1/7, 10 * SCALE);
        rect(ACTUALWIDTH * 2/7, ACTUALHEIGHT * 4/7, ACTUALWIDTH * 1/7, ACTUALHEIGHT * 1/7, 10 * SCALE);
        rect(ACTUALWIDTH * 4/7, ACTUALHEIGHT * 4/7, ACTUALWIDTH * 1/7, ACTUALHEIGHT * 1/7, 10 * SCALE);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(20 * SCALE);
        text("continue", ACTUALWIDTH * 3.5/7, ACTUALHEIGHT * 4.4/7);
        text("Challenge", ACTUALWIDTH * 2.5/7, ACTUALHEIGHT * 4.4/7);
        text("get new Items", ACTUALWIDTH * 4.5/7, ACTUALHEIGHT * 4.4/7);
        text("100$", ACTUALWIDTH * 4.5/7, ACTUALHEIGHT * 4.6/7);
        fill(255);
        text("coins: " + this.game.currentCoins, ACTUALWIDTH/2, 100 * SCALE);
        textAlign(LEFT, BOTTOM);

    }

    this.inputHandler = function (id, x, y) {
        if(!id) {
            if (x >= ACTUALWIDTH * 1/7 && x <= ACTUALWIDTH * 2/7 && y >= ACTUALHEIGHT * 3/7 && y <= ACTUALHEIGHT * 4/7) {
                if(this.game.currentCoins >= this.items[0].prize) {
                    BuyShopItem(this.items[0].id, this.game.gameStates[0]);
                    this.game.currentCoins -= this.items[0].prize;
                    if (this.shopItemPool.length > 0) {
                        item = getRandomInt(0, this.shopItemPool.length - 1);
                        this.items[0] = this.shopItemPool[item]
                        this.shopItemPool.splice(item, 1);
                    }
                }
            }
            if (x >= ACTUALWIDTH * 2/7 && x <= ACTUALWIDTH * 3/7 && y >= ACTUALHEIGHT * 3/7 && y <= ACTUALHEIGHT * 4/7) {
                if(this.game.currentCoins >= this.items[1].prize) {
                    BuyShopItem(this.items[1].id, this.game.gameStates[0]);
                    this.game.currentCoins -= this.items[1].prize;
                    if (this.shopItemPool.length > 0) {
                        item = getRandomInt(0, this.shopItemPool.length - 1);
                        this.items[1] = this.shopItemPool[item]
                        this.shopItemPool.splice(item, 1);
                    }
                }
            }
            if (x >= ACTUALWIDTH * 3/7 && x <= ACTUALWIDTH * 4/7 && y >= ACTUALHEIGHT * 3/7 && y <= ACTUALHEIGHT * 4/7) {
                if(this.game.currentCoins >= this.items[2].prize) {
                    BuyShopItem(this.items[2].id, this.game.gameStates[0]);
                    this.game.currentCoins -= this.items[2].prize;
                    if (this.shopItemPool.length > 0) {
                        item = getRandomInt(0, this.shopItemPool.length - 1);
                        this.items[2] = this.shopItemPool[item]
                        this.shopItemPool.splice(item, 1);
                    }
                }
            }
            if (x >= ACTUALWIDTH * 4/7 && x <= ACTUALWIDTH * 5/7 && y >= ACTUALHEIGHT * 3/7 && y <= ACTUALHEIGHT * 4/7) {
                if(this.game.currentCoins >= this.items[3].prize) {
                    BuyShopItem(this.items[3].id, this.game.gameStates[0]);
                    this.game.currentCoins -= this.items[3].prize;
                    if (this.shopItemPool.length > 0) {
                        item = getRandomInt(0, this.shopItemPool.length - 1);
                        this.items[3] = this.shopItemPool[item]
                        this.shopItemPool.splice(item, 1);
                    }
                }

            }
            if (x >= ACTUALWIDTH * 5/7 && x <= ACTUALWIDTH * 6/7 && y >= ACTUALHEIGHT * 3/7 && y <= ACTUALHEIGHT * 4/7) {
                if(this.game.currentCoins >= this.items[4].prize) {
                    BuyShopItem(this.items[4].id, this.game.gameStates[0]);
                    this.game.currentCoins -= this.items[4].prize;
                    if (this.shopItemPool.length > 0) {
                        item = getRandomInt(0, this.shopItemPool.length - 1);
                        this.items[4] = this.shopItemPool[item]
                        this.shopItemPool.splice(item, 1);
                    }
                }
            }
            if (x >= ACTUALWIDTH * 3/7 && x <= ACTUALWIDTH * 4/7 && y >= ACTUALHEIGHT * 4/7 && y <= ACTUALHEIGHT * 5/7) {
                this.game.changeGameStateByNumber(0);
            }
            if (x >= ACTUALWIDTH * 2/7 && x <= ACTUALWIDTH * 3/7 && y >= ACTUALHEIGHT * 4/7 && y <= ACTUALHEIGHT * 5/7) {
                this.game.changeGameStateByNumber(0);
                this.game.activeGameState.levels.inChallengeRoom = true;
            }
            if (x >= ACTUALWIDTH * 4/7 && x <= ACTUALWIDTH * 5/7 && y >= ACTUALHEIGHT * 4/7 && y <= ACTUALHEIGHT * 5/7) {
                if(this.game.currentCoins >= 100){
                    for(var i = 0; i < 6; i++){
                        this.shopItemPool.push(this.items[i]);
                    }
                    this.items = [];
                    for(var i = 0; i < 6; i++){
                        item = getRandomInt(0, this.shopItemPool.length - 1);
                        this.items.push(this.shopItemPool[item])
                        this.shopItemPool.splice(item, 1);
                    }
                    this.game.currentCoins -= 100;
                }

            }


        }
    }
}



function endOfGameScreen(name, game, outerGameShell){
    this.game = game;
    this.name  = name;
    this.shell = outerGameShell;
    this.secondGameState;
    this.coinsToCount = -100;

    this.update = function () {
        if(this.coinsToCount === -100){
            this.coinsToCount = this.game.score - this.game.startScore;
        }
        if(this.coinsToCount > 0){
            this.coinsToCount--;
            if(this.coinsToCount > 100){
                this.coinsToCount -= 10;
            }
            if(this.coinsToCount > 1000){
                this.coinsToCount -= 100;
            }
        }
        if(this.coinsToCount < 0){
            this.coinsToCount = 0;
        }
    }

    this.show = function () {
        textAlign(CENTER, CENTER);
        textSize(20 * SCALE);
        text("---->", ACTUALWIDTH/2, ACTUALHEIGHT/2);
        textAlign(RIGHT, CENTER);
        text(this.coinsToCount, ACTUALWIDTH * 0.46, ACTUALHEIGHT/2);
        textAlign(LEFT, CENTER);
        text((this.game.score - this.coinsToCount), ACTUALWIDTH * 0.54, ACTUALHEIGHT/2);



        if(this.coinsToCount === 0){
            fill(0, 255, 0);
            rect(ACTUALWIDTH * 3/7, ACTUALHEIGHT * 4/7, ACTUALWIDTH * 1/7, ACTUALHEIGHT * 1/7, 10 * SCALE);
            fill(0);
            textSize(20 * SCALE);
            textAlign(CENTER, CENTER);
            text("continue", ACTUALWIDTH * 3.5/7, ACTUALHEIGHT * 4.5/7);
        }


        textAlign(LEFT, BOTTOM);
    }

    this.inputHandler = function (id, x, y) {
        if (x >= ACTUALWIDTH * 3/7 && x <= ACTUALWIDTH * 4/7 && y >= ACTUALHEIGHT * 4/7 && y <= ACTUALHEIGHT * 5/7) {
            this.game.changeGameStateByNumber(1);
        }
    }

}