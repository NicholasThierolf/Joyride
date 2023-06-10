/**
 * Created by Nick on 22.08.2017.
 */
src = "../SidescrollerEngine/*";
src = "../p5.js";

function GameObject(type, objectId, yModifier, xStart, blueprintId, speedModifier, outerGameShell, game, state){
    this.id = objectId;
    this.x = xStart;
    this.speedMod = speedModifier;
    this.game = game;
    this.state = state;
    this.shell = outerGameShell;
    this.type = type;
    this.yModifier = yModifier;

    this.reMake = function (blueprintId) {
        this.parts = [];
        if(this.type === 0) {
            switch (blueprintId) {
                case 0:
                    var y = this.yModifier;
                    this.parts.push(new ObjectTile(0, y, this));
                    this.parts.push(new ObjectTile(0, y + 40, this));
                    this.parts.push(new ObjectTile(0, y + 80, this));
                    this.parts.push(new ObjectTile(0, y + 120, this));
                    this.parts.push(new ObjectTile(0, y + 160, this));
                    break;
                case 1:
                    var y = this.yModifier;
                    this.parts[0] = new ObjectTile(0, y, this);
                    this.parts[1] = new ObjectTile(20, y + 10, this);
                    this.parts[2] = new ObjectTile(40, y + 20, this);
                    this.parts[3] = new ObjectTile(60, y + 30, this);
                    this.parts[4] = new ObjectTile(80, y + 40, this);
                    break;
                case 2:
                    this.parts[0] = new ObjectTile(0, yModifier, this);
                    break;
                case 3:
                    var y = this.yModifier;
                    this.parts[0] = new ObjectTile(0, y, this);
                    this.parts[1] = new ObjectTile(20, y - 10, this);
                    this.parts[2] = new ObjectTile(40, y - 20, this);
                    this.parts[3] = new ObjectTile(60, y - 30, this);
                    this.parts[4] = new ObjectTile(80, y - 40, this);
                    break;
                case 4:
                    var y = this.yModifier;
                    this.parts[0] = new ObjectTile(0, y, this);
                    this.parts[1] = new ObjectTile(0 + 40, y, this);
                    this.parts[2] = new ObjectTile(0 + 80, y, this);
                    this.parts[3] = new ObjectTile(0 + 120, y, this);
                    this.parts[4] = new ObjectTile(0 + 160, y, this);
                    break;
                case 5:
                    var y = this.yModifier;
                    this.parts.push(new ObjectTile(0, y, this));
                    this.parts.push(new ObjectTile(0, y - 40, this));
                    this.parts.push(new ObjectTile(0, y - 80, this));
                    this.parts.push(new ObjectTile(0, y - 120, this));
                    this.parts.push(new ObjectTile(0, y - 160, this));
                    break;
                case 6:
                    var y = this.yModifier;
                    this.parts[0] = new ObjectTile(0, y, this);
                    this.parts[1] = new ObjectTile(-20, y + 10, this);
                    this.parts[2] = new ObjectTile(-40, y + 20, this);
                    this.parts[3] = new ObjectTile(-60, y + 30, this);
                    this.parts[4] = new ObjectTile(-80, y + 40, this);
                    break;
                case 7:
                    var y = this.yModifier;
                    this.parts[0] = new ObjectTile(0, y, this);
                    this.parts[1] = new ObjectTile(-20, y - 10, this);
                    this.parts[2] = new ObjectTile(-40, y - 20, this);
                    this.parts[3] = new ObjectTile(-60, y - 30, this);
                    this.parts[4] = new ObjectTile(-80, y - 40, this);
                    break;

            }
        }
        if(this.type === 1) {
            switch (blueprintId) {
                case -1:
                    this.parts.push(new Coin(this.x, this.yModifier, this, Math.random() * 8, Math.random() * 8));
                    this.parts.push(new Coin(this.x, this.yModifier, this, Math.random() * 8, Math.random() * 8));
                    this.parts.push(new Coin(this.x, this.yModifier, this, Math.random() * 8, Math.random() * 8));
                    this.parts.push(new Coin(this.x, this.yModifier, this, Math.random() * 8, Math.random() * 8));
                    this.parts.push(new Coin(this.x, this.yModifier, this, Math.random() * 8, Math.random() * 8));
                    this.parts.push(new Coin(this.x, this.yModifier, this, Math.random() * 8, Math.random() * 8));
                    this.parts.push(new Coin(this.x, this.yModifier, this, Math.random() * 8, Math.random() * 8));
                    this.parts.push(new Coin(this.x, this.yModifier, this, Math.random() * 8, Math.random() * 8));

                    break;
                case 0:
                    for(var i = 0; i < 2; i++) {
                        var y = this.yModifier + (40 * i);
                        for (var j = 0; j < 9; j++) {
                            this.parts.push(new Coin(this.x + j*40, y, this, 0, 0));
                        }
                    }

                    break;
                case 1:
                    var y = this.yModifier;
                    for(var i = 0; i < 2; i++) {
                        var y = this.yModifier + (40 * i);
                        for (var j = 0; j < 9; j++) {
                            this.parts.push(new Coin(this.x + j*20, y + j * 10, this, 0, 0));
                        }
                    }
                    break;
                case 2:
                    var y = this.yModifier - 40;



                    for(var i = 0; i < 2; i++) {
                        for (var j = 0; j < 9; j++) {
                            this.parts.push(new Coin(this.x + j*20, y - j * 10 - 40*i, this, 0, 0));
                        }
                    }
            }
        }
        if(this.type === 2){
            this.parts[0] = new Item(xStart, this.yModifier, blueprintId, this);
        }
        if(this.type === 3){
            this.parts[0] = new Pickup(xStart, this.yModifier, blueprintId, this);
        }
        if(this.type === 4){
            this.parts[0] = new ChallengeGoal(xStart, blueprintId, this);
        }
        this.yModifier = Math.random();
        return this.parts;
    };


    this.parts = this.reMake(blueprintId);



    this.update = function (speed) {
        this.x -= 10 * GAMESPEED;
        for(i = 0; i < this.parts.length; i++){
            this.parts[i].update(this.game.gameSpeed * this.speedMod);
        }
    };


    this.show = function () {
        if(this.x < WIDTH + 100 && this.x > -5000) {
            for (i = 0; i < this.parts.length; i++) {
                this.parts[i].show();
            }
        }
    }
}

//~~~~~~~~~~~~~~~~~~~~~B-U-T-T-O-N-O-B-J-E-C-T~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function ButtonObject(id, outerGameShell, game, state, data){
    this.id = id;
    this.shell = outerGameShell;
    this.game = game;
    this.state = state;
    this.data = data;


    this.update = function () {

    };


    this.show = function () {
        fill(this.data.color1, this.data.color2, this.data.color3);
        rect(this.data.xStart * SCALE, this.data.yStart * SCALE, (this.data.xEnd - this.data.xStart) * SCALE, (this.data.yEnd - this.data.yStart) * SCALE);
        fill(0);
        textStyle(BOLD);
        textSize(20 * SCALE);
        text("" + this.data.text, this.data.textX * SCALE, this.data.textY * SCALE);
    };


    this.inputHandler = function (eventId, x, y) {
        if(this.data.xStart * SCALE < x && x < this.data.xEnd * SCALE && this.data.yStart * SCALE < y && y < this.data.yEnd * SCALE && !eventId) {
            switch(this.id){
                case 0:
                    game.changeGameStateByNumber(0);
                    game.activeGameState.resetGameStat();
                    game.activeGameState.player.reset();
                    break;
                case 1:
                    if(VULNURABLE) {
                        VULNURABLE = false;
                    }else{
                        VULNURABLE = true;
                    }
                    break;
                case 2:
                    game.changeGameStateByNumber(0);
                    game.activeGameState.setSwitchTimer(5);
                    GAMESPEED = 0;
                    this.game.displayText = new DisplayText("You were killed by: " + this.game.lastKilledBy, 5, this.state);
                    break;
                case 3:
                    game.changeGameStateByNumber(3);
                    break;
            }
        }
    }
}



//~~~~~~~~~~~~~~~~~~~~~S-H-O-P-I-T-E-M~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


/**
 *
 * @param id:
 * @param data: ButtonData, also used for items as you can see
 * @constructor
 */


function ShopItem(id, outerGameShell, game, state, data){
    this.id = id;
    this.shell = outerGameShell;
    this.game = game;
    this.state = state;
    this.data = data


    this.update = function () {

    };


    this.show = function () {
        fill(this.data.color1, this.data.color2, this.data.color3);
        rect(this.data.xStart * SCALE, this.data.yStart * SCALE, (this.data.xEnd - this.data.xStart) * SCALE, (this.data.yEnd - this.data.yStart) * SCALE);
        fill(0);
        textStyle(BOLD);
        textSize(20 * SCALE);
        text("" + this.data.text, this.data.textX * SCALE, this.data.textY * SCALE);
    };


    this.inputHandler = function (eventId, x, y) {
        if(this.data.xStart * SCALE < x && x < this.data.xEnd * SCALE && this.data.yStart * SCALE < y && y < this.data.yEnd * SCALE && !eventId) {
            switch(this.id){
                case 0:
                    game.changeGameStateByNumber(1);
                    break;
                case 1:
                    PLAYERMAGNET = true;
                    break;
            }
        }
    }
}

//~~~~~~~~~~~~~~~~~~~~~O-B-J-E-C-T-T-I-L-E~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 *
 *        type: the type of the object tile
 *              0 - damage orb
 *              1 - coin
 * @param x: x coordinate
 * @param y: y coordinate
 * @param object: parent object of the tile
 */
function ObjectTile(x, y, object) {
    this.x = x;
    this.y = y;
    this.object = object;



    this.update = function (playerX, playerY) {

        if(dist(this.x + this.object.x, this.y, this.object.state.player.x, this.object.state.player.y) < (TYPE0SIZE + PLAYERSIZE) * 0.5 && VULNURABLE){
            if(GAMESPEED != 0) {
                this.object.game.lastKilledBy = "OBJECT TILE";
                PlayerHit(this.object.state);
            }

        }
    };

    this.show = function () {
        noStroke();
        fill(COLOR1TYPE0, COLOR2TYPE0, COLOR3TYPE0);
        ellipse((this.object.x + this.x) * SCALE, this.y * SCALE, TYPE0SIZE * SCALE);
    }

}


//~~~~~~~~~~~~~~~~~~~~~I-T-E-M-O-B-J-E-C-T~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Item (x, y, id, object){
    this.x = x;
    this.y = y;
    this.object = object;
    this.alive = true;
    this.displayText = 0;
    this.id = id;
    this.animate = 0;



    this.update = function (playerX, playerY) {

        this.x -= GAMESPEED * 10;

        if(!this.alive && this.animate <= 4.1){
            this.animate += 0.4 * GAMESPEED;
        }

        if(dist(this.x, this.y, this.object.state.player.x, this.object.state.player.y) < (ITEMSIZE + PLAYERSIZE) * 0.5 && this.alive){
            this.displayText = FRAMERATE * 1;
            this.alive = false;
            this.animate = 1;
            this.object.game.activeGameState.player.boosting = false;
            this.object.game.changeGameStateByNumber(4);
            this.object.game.activeGameState.secondGameState = this.object.state;
            var random = getRandomInt(0, this.object.state.pickupItems.length-1);
            this.object.game.activeGameState.itemID = this.object.state.pickupItems[random];
            this.object.state.pickupItems.splice(random, 1);
            this.object.game.animated.push( new Animate(CHEST, WIDTH / 2 - 200, HEIGHT / 2 - 200, 400, 400, 5, 5, 999999999999, true));
        }
    };

    this.show = function () {
        if(this.x < WIDTH + 100) {
            image(CHEST, (this.x - ITEMSIZE) * SCALE, (this.y - ITEMSIZE) * SCALE, ITEMSIZE * 2 * SCALE, ITEMSIZE * 2 * SCALE, [dx = 400 * Math.round(this.animate)], [dy = 0], [dWidth = 400], [dHeight = 400]);
        }

    }
}





//~~~~~~~~~~~~~~~~~~~~~P-I-C-K-U-P-O-B-J-E-C-T~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Pickup (x, y, id, object){
    this.x = x;
    this.y = y;
    this.object = object;
    this.alive = true;
    this.id = id;



    this.update = function (playerX, playerY) {
        this.x -= GAMESPEED * 10;


        if(dist(this.x, this.y, this.object.state.player.x, this.object.state.player.y) < (PICKUPSIZE + PLAYERSIZE) * 0.5 && this.alive){

            if(this.object.state.player.health < this.object.state.playerStats.playerHp){
                this.object.state.player.health++;
                this.alive = false;
            }
        }
    };

    this.show = function () {
        if(this.x < WIDTH + 100 && this.alive) {
            image(HEART, (this.x - PICKUPSIZE * 0.5) * SCALE, (this.y - PICKUPSIZE * 0.5) * SCALE, PICKUPSIZE * SCALE, PICKUPSIZE * SCALE);
        }

    }
}



//~~~~~~~~~~~~~~~~~~~~~C-O-I-N-O-B-J-E-C-T~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



function Coin(x, y, object, xForce, yForce) {
    if(xForce > 0){
        this.x = x;
    }else{
        this.x = x;
    }

    this.y = y;
    this.xForce = 0 + xForce;
    this.yForce = 0 + yForce;
    this.object = object;
    this.alive = true;
    this.Coins = loadImage("Assets/Coins.png");
    this.animate = 0;
    this.pulled = false;
    this.sizeMult = 1;



    this.update = function () {


        if(this.alive) {
            this.animate += 0.1 * GAMESPEED;
            if (!this.pulled) {
                this.x += xForce * GAMESPEED;
                this.y += yForce * GAMESPEED;
                this.xForce = this.xForce * 0.95;
                this.yForce = this.yForce * 0.95;

                if(this.yForce != 0){
                    this.y += GRAVITY * 5 * GAMESPEED;
                }
                if(this.y > HEIGHT - 50){
                    this.y = HEIGHT - 50
                }

                this.x -= 10 * GAMESPEED;
            }
            u = dist(this.x, this.y, this.object.state.player.x, this.object.state.player.y);
            if (u < TYPE1SIZE + PLAYERSIZE * this.object.state.player.magnetStrength) {
                if (!this.pulled) {
                    this.pulled = true;
                }

                this.x += (this.object.state.player.x - this.x) * PULLPOWER;
                this.y += (this.object.state.player.y - this.y) * PULLPOWER;

            }

            if(u < PLAYERSIZE * this.object.state.player.magnetStrength){
                if(u / PLAYERSIZE * this.object.state.player.magnetStrength <= 1) {
                    this.sizeMult = u / PLAYERSIZE * this.object.state.player.magnetStrength;
                }
            }

            if (u < (TYPE1SIZE + PLAYERSIZE) / 4) {
                this.alive = false;
                this.object.game.currentCoins++;
                this.object.game.score++;
                if(SHOPITEM_02){
                    this.object.game.currentCoins++;
                    this.object.game.score++;
                }
            }
        }
    };

    this.show = function () {
        if (this.alive) {
            switch (Math.round(this.animate)) {
                case 0:
                    image(this.Coins, this.x * SCALE, this.y * SCALE, [sWidth = TYPE1SIZE * this.sizeMult * SCALE], [sHeight = TYPE1SIZE * this.sizeMult * SCALE], [dx = 0], [dy = 0], [dWidth = 60], [dHeight = 60]);
                    break;
                case 1:
                    image(this.Coins, this.x * SCALE, this.y * SCALE, [sWidth = TYPE1SIZE * this.sizeMult * SCALE], [sHeight = TYPE1SIZE * this.sizeMult * SCALE], [dx = 60], [dy = 0], [dWidth = 60], [dHeight = 60]);
                    break;
                case 2:
                    image(this.Coins, this.x * SCALE, this.y * SCALE, [sWidth = TYPE1SIZE * this.sizeMult * SCALE], [sHeight = TYPE1SIZE * this.sizeMult * SCALE], [dx = 120], [dy = 0], [dWidth = 60], [dHeight = 60]);
                    break;
                case 3:
                    image(this.Coins, this.x * SCALE, this.y * SCALE, [sWidth = TYPE1SIZE * this.sizeMult * SCALE], [sHeight = TYPE1SIZE * this.sizeMult * SCALE], [dx = 180], [dy = 0], [dWidth = 60], [dHeight = 60]);
                    break;
                case 4:
                    image(this.Coins, this.x * SCALE, this.y * SCALE, [sWidth = TYPE1SIZE * this.sizeMult * SCALE], [sHeight = TYPE1SIZE * this.sizeMult * SCALE], [dx = 240], [dy = 0], [dWidth = 60], [dHeight = 60]);
                    break;
                default:
                    image(this.Coins, this.x * SCALE, this.y * SCALE, [sWidth = TYPE1SIZE * this.sizeMult * SCALE], [sHeight = TYPE1SIZE * this.sizeMult * SCALE], [dx = 300], [dy = 0], [dWidth = 60], [dHeight = 60]);
                    this.animate = -0.5;
                    break;
            }

        }
    }

}




//~~~~~~~~~~~~~~~~~~~~~C-O-I-N-O-B-J-E-C-T~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



function ChallengeGoal (x, id, object){
    this.x = x;
    this.object = object;
    this.alive = true;
    this.id = id;



    this.update = function (playerX, playerY) {
        this.x -= GAMESPEED * 10;


        if(Math.abs(this.x - this.object.state.player.x) < PLAYERSIZE && this.alive){
            this.object.state.levels.inChallengeRoom = false;
            this.object.state.levels.challengeRoomStarted = false;
            this.alive = false;
        }
    };

    this.show = function () {
    }
}
