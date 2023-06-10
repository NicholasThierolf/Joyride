/**
 * Created by Nick on 22.08.2017.
 */
src = "../SidescrollerEngine/*";
src = "../p5.js";
function EnemyObjects(state){
    this.state = state;
    this.enemies = [];
    this.leftoverBullets = [];




    this.add = function (id, x, y) {
        switch(id) {
            case -10:
                //todo endboss
                this.enemies.push(
                    new Boss(boss = {health:800, x: WIDTH + 200, y: HEIGHT/2, phases:[
                            phase = {
                                health:200, image: {red: 255, green: 255, blue: 255}, size:400, movement:[], timeBetweenActions: 8*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["trippleLaser", "big ass mega death laser"], hitPlayerActions:[]
                            },
                            phase1 = {
                                health:200, image: {red: 170, green: 170, blue: 170}, size:300, movement:["small sinus"], timeBetweenActions: 6*FRAMERATE,
                                afterHitActions:["shield"], hitsBetweenActions:20, healthActions:[], healthBetweenActions:99999,
                                timeActions:["two rows 5 delay bullets", "spawn two bullet circles", "spawn 10 bullets"], hitPlayerActions:[]
                            },
                            phase2 = {
                                health:200, image: {red: 90, green: 90, blue: 90}, size:200, movement:["sinus"], timeBetweenActions: 4*FRAMERATE,
                                afterHitActions:["shield"], hitsBetweenActions:10, healthActions:[], healthBetweenActions:99999,
                                timeActions:["shoot invul bullet", "spawn invul bullet circle", "shoot 3 invul bullets"], hitPlayerActions:[]
                            },
                            phase3 = {
                                health:200, image: {red: 0, green: 0, blue: 0}, size:100, movement:["sinus 2"], timeBetweenActions: 3*FRAMERATE,
                                afterHitActions:["shield"], hitsBetweenActions:5, healthActions:[], healthBetweenActions:99999,
                                timeActions:["spawn 10 blue enemies", "spawn two invul bullet circles", "shoot 3 bullets circ"], hitPlayerActions:[]
                            }
                        ]},
                        this.state)
                );
                break;
            case -9:
                //todo endboss
                this.enemies.push(
                    new Boss(boss = {health:800, x: WIDTH + 200, y: HEIGHT/2, phases:[
                            phase = {
                                health:200, image: {red: 255, green: 255, blue: 255}, size:400, movement:[], timeBetweenActions: 8*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["trippleLaser", "big ass mega death laser"], hitPlayerActions:[]
                            },
                            phase1 = {
                                health:200, image: {red: 170, green: 170, blue: 170}, size:300, movement:["small sinus"], timeBetweenActions: 6*FRAMERATE,
                                afterHitActions:["shield"], hitsBetweenActions:20, healthActions:[], healthBetweenActions:99999,
                                timeActions:["two rows 5 delay bullets", "spawn two bullet circles", "spawn 10 bullets"], hitPlayerActions:[]
                            },
                            phase2 = {
                                health:200, image: {red: 90, green: 90, blue: 90}, size:200, movement:["sinus"], timeBetweenActions: 4*FRAMERATE,
                                afterHitActions:["shield"], hitsBetweenActions:10, healthActions:[], healthBetweenActions:99999,
                                timeActions:["shoot invul bullet", "spawn invul bullet circle", "shoot 3 invul bullets"], hitPlayerActions:[]
                            },
                            phase3 = {
                                health:200, image: {red: 0, green: 0, blue: 0}, size:100, movement:["sinus 2"], timeBetweenActions: 2*FRAMERATE,
                                afterHitActions:["shield"], hitsBetweenActions:5, healthActions:[], healthBetweenActions:99999,
                                timeActions:["spawn 10 blue enemies", "spawn two invul bullet circles", "shoot 3 bullets circ"], hitPlayerActions:[]
                            }
                        ]},
                        this.state)
                );
                break;
            case -8:
                this.enemies.push(
                    new Boss(boss = {health:300, x: WIDTH + 200, y: HEIGHT/2, phases:[
                            phase = {
                                health:100, image: {red: 0, green: 0, blue: 122}, size:300, movement:["small sinus"], timeBetweenActions: 3*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["shoot 5 delay bullets", "spawn invul bullet circle"], hitPlayerActions:[]
                            },
                            phase1 = {
                                health:200, image: {red: 0, green: 0, blue: 255}, size:100, movement:[], timeBetweenActions: 3*FRAMERATE,
                                afterHitActions:["shield"], hitsBetweenActions:10, healthActions:[], healthBetweenActions:99999,
                                timeActions:["shoot 5 delay bullets", "shoot 3 invul bullets", "spawn two invul bullet circles"], hitPlayerActions:[]
                            }
                        ]},
                        this.state)
                );
                break;
            case -7:
                this.enemies.push(
                    new Boss(boss = {health:400, x: WIDTH + 200, y: HEIGHT/2, phases:[
                            phase = {
                                health:200, image: {red: 160, green: 82, blue: 56}, size:300, movement:[], timeBetweenActions: 3*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["spawn 10 blue enemies", "spawn invul bullet circle"], hitPlayerActions:[]
                            },
                            phase1 = {
                                health:200, image: {red: 139, green: 69, blue: 45}, size:200, movement:[], timeBetweenActions: 3*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["spawn 10 blue enemies", "spawn two invul bullet circles"], hitPlayerActions:[]
                            }
                        ]},
                        this.state)
                );
                break;
            case -6:
                this.enemies.push(
                    new Boss(boss = {health:300, x: WIDTH + 200, y: HEIGHT/2, phases:[
                            phase = {
                                health:150, image: {red: 255, green: 140, blue: 0}, size:300, movement:[], timeBetweenActions: 3*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["big laser", "outer laser"], hitPlayerActions:[]
                            },
                            phase1 = {
                                health:150, image: {red: 255, green: 80, blue: 0}, size:400, movement:[], timeBetweenActions: 3*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["big ass mega death laser", "outer laser"], hitPlayerActions:[]
                            }
                        ]},
                        this.state)
                );
                break;
            case -5:
                this.enemies.push(
                    new Boss(boss = {health:200, x: WIDTH + 200, y: HEIGHT/2, phases:[
                            phase = {
                                health:100, image: {red: 0, green: 0, blue: 255}, size:200, movement:["sinus"], timeBetweenActions: 6*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["ram", "shoot 3 bullets circ"], hitPlayerActions:[]
                            },
                            phase1 = {
                                health:100, image: {red: 122, green: 0, blue: 122}, size:200, movement:["small sinus", "sinus 2"], timeBetweenActions: 6*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["shoot 3 invul bullets circ"], hitPlayerActions:[]
                            }
                        ]},
                        this.state)
                );
                break;

            case -4:
                this.enemies.push(
                    new Boss(boss = {health:200, x: WIDTH + 200, y: HEIGHT/2, phases:[
                        phase = {
                            health:200, image: {red: 0, green: 0, blue: 255}, size:200, movement:["sinus"], timeBetweenActions: 6*FRAMERATE,
                            afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                            //timeActions:["spawn two bullet circles", "spawn invul bullet circle", "big laser", "big laser"], hitPlayerActions:[]
                            timeActions:["shoot 3 bullets"], hitPlayerActions:[]
                        }
                    ]},
                        this.state)
                );
                break;
            case -3:
                this.enemies.push(new Boss(
                    boss = {health:200, x: WIDTH + 200, y: HEIGHT/2, phases:
                        [phase = {health:200, image: {red: 0, green: 255, blue: 0}, size:200, movement:[], timeBetweenActions: 6*FRAMERATE,
                            afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                            timeActions:["spawn 10 bullets", "ram", "spawn laser enemies"], hitPlayerActions:[]}]}
                    , this.state));
                break;
            case -2:
                this.enemies.push(
                    new Boss(boss = {health:100, x: WIDTH + 200, y: HEIGHT/2, phases:[
                            phase = {
                                health:100, image: {red: 0, green: 0, blue: 255}, size:200, movement:["sinus 2"], timeBetweenActions: 6*FRAMERATE,
                                afterHitActions:[], hitsBetweenActions:99999, healthActions:[], healthBetweenActions:99999,
                                timeActions:["spawn laser enemies", "spawn obstacle 1", "spawn obstacle 2"], hitPlayerActions:[]
                            }

                        ]},
                        this.state)
                );
                break;
            case -1:
                this.enemies.push(new Boss(
                        boss = {health:100, x: WIDTH + 200, y: HEIGHT/2, phases:
                        [phase = {health:100, image: {red: 255, green: 0, blue: 0}, size:300, movement:[], timeBetweenActions: 6*FRAMERATE,
                            afterHitActions:["shield"], hitsBetweenActions:20, healthActions:[], healthBetweenActions:99999,
                            timeActions:["trippleLaser", "spawn 10 blue enemies", "spawn obstacle 1", "spawn obstacle 2", "trippleLaser", "trippleLaser"], hitPlayerActions:[]}]}
                    , this.state));
                break;
            case 0:
                this.enemies.push(new Enemy_01(x, y, this.state));
                break;
            case 1:
                this.enemies.push(new Enemy_02(x, y, this.state));
                break;
            case 2:
                this.enemies.push(new Enemy_03(x, y, this.state));
                break;
            case 3:
                this.enemies.push(new Enemy_04(x, y, this.state));
                break;
            case 4:
                this.enemies.push(new Enemy_05(x, y, this.state));
                break;


        }
    }



    this.update = function () {

        for(var i = this.enemies.length - 1; i >= 0; i-- ) {
            this.enemies[i].update();
            if(this.enemies[i].x < -2000 || !this.enemies[i].alive){
                if( this.enemies[i].hasBullets) {
                    for (var j = this.enemies[i].bullets.length - 1; j >= 0; j--) {
                        this.leftoverBullets.push(this.enemies[i].bullets[j]);
                    }
                }
                this.enemies.splice(i, 1);

            }
        }

        for(var i = this.leftoverBullets.length - 1; i >= 0; i-- ) {
            this.leftoverBullets[i].update();
            if(this.leftoverBullets[i].x < -50 || !this.leftoverBullets[i].alive){
                this.leftoverBullets.splice(i, 1);
            }
        }
    };


    this.show = function () {
        for(var i = this.leftoverBullets.length - 1; i >= 0; i-- ) {
            this.leftoverBullets[i].show();
        }

        for(var i = this.enemies.length - 1; i >= 0; i-- ) {
            this.enemies[i].show();
        }
    }

    this.reset = function () {
        this.enemies = [];
        this.leftoverBullets = [];
    }
}






function Enemy_01(x, y, state){
    this.y = y;
    this.x = x;
    this.direction = 1;
    this.bullets = [];
    this.state = state;
    this.size = TYPE0SIZE;
    this.blocked = 0;
    this.alive = true;
    this.hasBullets = true;
    this.health = 3;

    //delay between bullets in seconds
    this.bulletDelay = 0.8;
    this.bulletCounter = FRAMERATE * this.bulletDelay;


    this.update = function () {
        for(var i = 0; i < this.state.player.bullets.length; i++){
            if(dist(this.x, this.y, this.state.player.bullets[i].x, this.state.player.bullets[i].y) < (this.size + this.state.player.bullets[i].size) / 2 && this.alive){
                this.state.player.bullets[i].alive = false;
                this.health -= this.state.playerStats.playerDamage;
                if(this.health <= 0){
                    this.alive = false;

                    SpawnCoins(this.x, this.y, 10, this.state);
                }

            }
        }


        this.blocked -= 1 * GAMESPEED;
        if(dist(this.x, this.y, this.state.player.x, this.state.player.y) < (this.size + PLAYERSIZE) * 0.5 && VULNURABLE && this.alive && GAMESPEED !=0){
            this.state.game.lastKilledBy = "ENEMY";
            PlayerHit(this.state);
        }


        this.bulletCounter -= 1 * GAMESPEED;
        if(this.bulletCounter === 0){
            this.bulletCounter = FRAMERATE * this.bulletDelay;
            if(this.x < WIDTH) {
                this.bullets.push(new Bullet(this.x - 20, this.y, GAMESPEED * 10 * 2, 20, this.state))
            }
        }

        if(Math.random() <= 0.02 && this.blocked <= 0){
            this.direction = this.direction * -1;
            this.blocked = 60;
        }

        if(this.y < 0 && this.direction > 0){

            this.direction = this.direction * -1;
            this.blocked = 60;
        }

        if(this.y > HEIGHT && this.direction < 0){

            this.direction = this.direction * -1;
            this.blocked = 60;
        }

        this.y -= 0.5 * GAMESPEED * 10 * this.direction;
        this.x -= 0.8 * GAMESPEED * 10;
        for(var i = this.bullets.length - 1; i >= 0; i--){
            this.bullets[i].update();
            if(this.bullets[i].x <= -1000 || !this.bullets[i].alive){
                this.bullets.splice(i, 1);
            }
        }

    };


    this.show = function () {

        if(this.alive) {
            for (var i = this.bullets.length - 1; i >= 0; i--) {
                this.bullets[i].show();
            }
            noStroke();
            fill(255, 0, 0);
            ellipse(this.x * SCALE, this.y * SCALE, TYPE0SIZE * SCALE);
        }

    }

}











function Enemy_02(x, y, state){
    this.y = y;
    this.x = x;
    this.state = state;
    this.size = TYPE0SIZE;
    this.alive = true;
    this.health = 3;
    this.hasBullets = false;



    this.update = function () {
        for(var i = 0; i < this.state.player.bullets.length; i++){
            if(dist(this.x, this.y, this.state.player.bullets[i].x, this.state.player.bullets[i].y) < (this.size + this.state.player.bullets[i].size) / 2 && this.alive){
                this.state.player.bullets[i].alive = false;
                if(this.health > 1){
                    this.health -= this.state.playerStats.playerDamage;
                    this.x += getRandomInt(15, 25);
                    this.y += getRandomInt(-15, 15);
                }else {
                    this.alive = false;

                    SpawnCoins(this.x, this.y, 10, this.state);
                }
            }
        }


        if(dist(this.x, this.y, this.state.player.x, this.state.player.y) < (this.size + PLAYERSIZE) * 0.5 && VULNURABLE && this.alive && GAMESPEED !=0){
            this.state.game.lastKilledBy = "ENEMY";
            PlayerHit(this.state);
        }
        if(this.x > WIDTH){
            this.x -= 10 * GAMESPEED
        }else {
            this.x -= 20 * GAMESPEED;
        }
        if(this.y > this.state.player.y){
            this.y -= 2 * GAMESPEED;
        }else{
            if(this.y < this.state.player.y){
                this.y += 2 * GAMESPEED;
            }
        }

    };


    this.show = function () {
        if(this.alive) {
            noStroke();
            fill(0, 127, 0);
            ellipse(this.x * SCALE, this.y * SCALE, TYPE0SIZE * SCALE);
        }

    }

}




function Enemy_03(x, y, state){
    this.y = y;
    this.x = x;
    this.state = state;
    this.size = 30;
    this.alive = true;
    this.hasBullets = false;



    this.update = function () {


        if(dist(this.x, this.y, this.state.player.x, this.state.player.y) < (this.size + PLAYERSIZE) * 0.5 && VULNURABLE && this.alive && GAMESPEED !=0){
            this.state.game.lastKilledBy = "ENEMY";
            PlayerHit(this.state);
        }
        if(this.x > WIDTH){
            this.x -= 10 * GAMESPEED;
        }else{
            this.x -= 40 * GAMESPEED;
        }


    };


    this.show = function () {
        fill(0, 0, 127);

            if (this.alive) {
                if(this.x < WIDTH + 400) {
                    stroke(0, 0, 127);
                    strokeWeight(1 * SCALE);
                    line(this.x * SCALE, this.y * SCALE, 0, this.y * SCALE);
                    noStroke();
                    if (this.x > WIDTH - this.size / 2) {
                        ellipse(WIDTH * SCALE, this.y * SCALE, this.size * SCALE);
                    }
                    ellipse(this.x * SCALE, this.y * SCALE, this.size * SCALE);
                }
            }


    }

}






function Enemy_04(x, y, state){
    this.state = state;
    this.size = 200;
    this.x = WIDTH + this.size;
    this.y = HEIGHT - this.size / 2;
    this.alive = true;
    this.hasBullets = false;
    this.health = 15;



    this.update = function () {
        for(var i = 0; i < this.state.player.bullets.length; i++){
            if(dist(this.x, this.y, this.state.player.bullets[i].x, this.state.player.bullets[i].y) < (this.size + this.state.player.bullets[i].size) / 2 && this.alive){
                this.state.player.bullets[i].alive = false;
                if(this.health > 1){
                    this.health -= this.state.playerStats.playerDamage;
                    this.x += getRandomInt(10, 40);
                }else {
                    this.alive = false;

                    SpawnCoins(this.x, this.y, 30, this.state);
                }
            }
        }

        if(dist(this.x, this.y, this.state.player.x, this.state.player.y) < (this.size + PLAYERSIZE) * 0.5 && VULNURABLE && this.alive && GAMESPEED !=0){
            this.state.game.lastKilledBy = "ENEMY";
            PlayerHit(this.state);
        }
        this.x -= 5 * GAMESPEED;

    };


    this.show = function () {
        noStroke();
        fill(0, 0, 127);
        if (this.alive) {
            ellipse(this.x * SCALE, this.y * SCALE, this.size * SCALE);
        }

    }

}








function Enemy_05(x, y, state){
    this.y = y;
    this.x = x;
    this.state = state;
    this.size = 50;
    this.alive = true;
    this.hasBullets = false;
    this.laserTimer = -1;
    this.laserLastTime = -1;
    this.afterLaserTime = -1;
    this.laserWidth = 20;
    this.playerX;
    this.playerY;
    this.actualPlayerX;
    this.actualPlayerY;



    this.update = function () {

        if(this.laserLastTime > -1 && this.laserTimer === 0){
            if(dist(this.state.player.x, this.state.player.y, this.actualPlayerX, this.actualPlayerY) < (this.laserWidth + PLAYERSIZE) * 0.5 && VULNURABLE){
                this.state.game.lastKilledBy = "LASER";
                PlayerHit(this.state);
            }
        }



        if(this.afterLaserTime > 0){
            this.afterLaserTime -= GAMESPEED;
        }
        if(this.afterLaserTime === 0){
            this.x += GAMESPEED;
        }

        if(this.laserLastTime === 0){
            this.afterLaserTime = 0.5 * FRAMERATE;
        }

        if(this.laserLastTime != -1){
            this.laserLastTime -= GAMESPEED;

        }


        if(this.x > WIDTH +  this.size &&  this.afterLaserTime === -1){
            this.x -= GAMESPEED * 10;
        }else {

            if (this.x > WIDTH - this.size && this.afterLaserTime === -1) {
                this.x -= GAMESPEED;
            } else {
                if (this.laserTimer === -1) {
                    this.laserTimer = 1 * FRAMERATE;
                    this.laserLastTime = 1.3 * FRAMERATE;
                    this.playerX = this.state.player.x - (this.x - this.state.player.x);
                    this.playerY = this.state.player.y - (this.y - this.state.player.y);
                    this.actualPlayerX = this.state.player.x;
                    this.actualPlayerY = this.state.player.y;
                } else {
                    if (this.laserTimer > 0) {
                        this.laserTimer -= GAMESPEED;
                    }
                }
            }
        }


    };


    this.show = function () {
        if(this.laserLastTime > 0) {
            if (this.laserTimer > 0) {
                stroke(255, 0, 0);
                strokeWeight(1 * SCALE);
                line(this.x * SCALE, this.y * SCALE, this.playerX * SCALE, this.playerY * SCALE);
            }
            if (this.laserTimer === 0) {
                stroke(255, 0, 0);
                strokeWeight(this.laserWidth * SCALE);
                line(this.x * SCALE, this.y * SCALE, this.playerX * SCALE, this.playerY * SCALE);
            }
        }

        noStroke();
        fill(127, 0, 0);
        if (this.alive) {
            ellipse(this.x * SCALE, this.y * SCALE, this.size * SCALE);
        }

    }

}