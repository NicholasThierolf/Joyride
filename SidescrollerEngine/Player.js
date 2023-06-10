/**
 * Created by Nick on 22.08.2017.
 */

src = "../p5.js";
src = "../SidescrollerEngine/*";
function Player(x, y, outerGameShell, game, state) {
    this.x = x;
    this.originalY = y;
    this.y = y;
    this.speedY = 0;
    this.game = game;
    this.state = state;
    this.shell = outerGameShell;
    this.boosting = false;
    if(PLAYERMAGNET){
        this.magnetStrength = 1.6;
    }else{
        this.magnetStrength = 0.8;
    }
    this.bullets = [];
    this.bulletCounter = this.state.playerStats.maxBulletsPerBoost;
    this.bulletTimer = 0;
    this.swaped = true;
    this.shield = false;
    this.shieldTimer = 0;
    this.invulTimer = 0;
    this.blinking = 0;
    this.health = 3;
    this.maxHealth = this.state.playerStats.playerHp;
    this.img;






    this.update = function () {
        if(this.health > this.state.playerStats.playerHp){
            this.health = this.state.playerStats.playerHp;
        }

        if(SHOPITEM_17 && this.shieldTimer === 0){
            this.shield = true;
            this.shieldTimer = -1;
        }

        if(this.shieldTimer > 0){
            this.shieldTimer--;
        }

        this.maxHealth = this.state.playerStats.playerHp;
        console.log("healnexttick: " + HEALNEXTTICK);
        if(HEALNEXTTICK > 0){
            if(this.health + 1 <= this.state.playerStats.playerHp){
                this.health += 1;
                HEALNEXTTICK--;
            }else{
                HEALNEXTTICK = 0;
            }
        }

        if(this.blinking > 0){
            this.blinking--;
        }

        if(this.invulTimer > 1){
            VULNURABLE = false;
            this.invulTimer--;
        }
        if(this.invulTimer === 1){
            VULNURABLE = true;
            this.invulTimer = 0;
        }


        //bullets
        if(this.boosting === false){
            this.bulletCounter = -1;
            this.swaped = true;
        }

        if(this.boosting && this.swaped){
            this.swaped = false;
            this.bulletCounter =  this.state.playerStats.maxBulletsPerBoost;
        }


        this.bulletTimer -= 1 * GAMESPEED;

        if(this.bulletCounter >=0 && this.bulletTimer <= 0){
            this.bulletCounter--;
            this.bulletTimer = Math.round(FRAMERATE / this.state.playerStats.bulletRate);
        }
        if(this.bulletTimer <= 1 && this.bulletTimer >= 0.9){
            this.bullets.push(new PlayerBullet(this.x + PLAYERSIZE * this.state.playerStats.playerSize/1.5, this.y - PLAYERSIZE * this.state.playerStats.playerSize/5, 10, this.state.playerStats.bulletSize, this.state))
        }


        for(var i = this.bullets.length - 1; i >= 0; i--){
            this.bullets[i].update();
            if(this.bullets[i].x >= WIDTH + this.bullets[i].size || !this.bullets[i].alive){
                this.bullets.splice(i, 1);
            }
        }


        if(this.boosting){
            this.speedY = this.speedY - GRAVITY * PLAYERBOOSTMULTIPLIER;
            this.speedY = this.speedY * 0.96;
            this.y = this.y + this.speedY * GAMESPEED;
        }else {
            this.speedY = this.speedY + GRAVITY;
            this.speedY = this.speedY * 0.95;
            this.y = this.y + this.speedY * GAMESPEED;
        }
        if(this.y > HEIGHT - ((PLAYERMODELSIZE * this.state.playerStats.playerSize) * 0.6)){
            this.y = HEIGHT - ((PLAYERMODELSIZE * this.state.playerStats.playerSize) * 0.6) ;
            this.speedY = 0;
        }
        if(this.y < PLAYERMODELSIZE * this.state.playerStats.playerSize * 0.6){
            this.y = PLAYERMODELSIZE * this.state.playerStats.playerSize * 0.6;
            this.speedY = 0;
        }
    };


    this.show = function () {

        if(this.blinking != 0) {
            if (this.blinking % 5 === 1) {
                this.img = WizardBlinking;
            } else {
                this.img = Wizard;
            }
        }else{
            this.img = Wizard;
        }


        for(var i = this.bullets.length - 1; i >= 0; i--){
            if(this.bullets[i].alive){
                this.bullets[i].show();
            }
        }


        if(this.bulletTimer >= 0){
            var i = Math.round(this.bulletTimer / (FRAMERATE / this.state.playerStats.bulletRate) * 6);
            image(this.img, (this.x - PLAYERMODELSIZE * this.state.playerStats.playerSize * 0.7) * SCALE, (this.y - PLAYERMODELSIZE * this.state.playerStats.playerSize * 0.6) * SCALE, [sWidth = PLAYERMODELSIZE * this.state.playerStats.playerSize * 1.3 * 4/3 * SCALE], [sHeight = PLAYERMODELSIZE * this.state.playerStats.playerSize * 1.3 * SCALE], [dx = 400 * i], [dy = 0], [dWidth = 400], [dHeight = 300]);
        }else{
            image(this.img, (this.x - PLAYERMODELSIZE * this.state.playerStats.playerSize * 0.7) * SCALE, (this.y - PLAYERMODELSIZE * this.state.playerStats.playerSize * 0.6) * SCALE, [sWidth = PLAYERMODELSIZE * this.state.playerStats.playerSize * 1.3 * 4/3 * SCALE], [sHeight = PLAYERMODELSIZE * this.state.playerStats.playerSize * 1.3 * SCALE], [dx = 0], [dy = 0], [dWidth = 400], [dHeight = 300]);
        }

        if(this.shield){
            noStroke();
            fill(152,245,255, 140);
            ellipse(this.x * SCALE, (this.y + 15) * SCALE, (PLAYERMODELSIZE + 27) * SCALE);
        }

    };

    this.fly = function (id) {
        this.boosting = id;
    };

    this.reset = function () {
        this.y = this.originalY;
        this.speedY = 0;
        this.boosting = false;
        this.bullets = [];
        this.bulletTimer = 0;
        if(PLAYERMAGNET){
            this.magnetStrength = 1.6;
        }else{
            this.magnetStrength = 0.8;
        }
        this.health = 3;
        this.state.playerStats.resetPlayerStats();
        resetItems();
        this.blinking = false;
    }
}