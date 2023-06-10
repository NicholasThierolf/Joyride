/**
 * Created by Nick on 03.09.2017.
 */
src = "../SidescrollerEngine/*";
src = "../p5.js";


function Boss(bossValues, state){
    this.bossValues = bossValues;
    this.values = this.bossValues.phases[0];
    this.x = bossValues.x;
    this.y = bossValues.y;
    this.size = this.values.size;
    this.state = state;
    this.shield = 0;
    this.hitsTaken = 0;
    this.health = bossValues.health;
    this.originalHealth = bossValues.health;
    this.alive = true;
    this.bullets = [];
    this.doSomething = 7 * FRAMERATE;
    this.objects = [];
    this.timer = 1;
    this.nextBossValueInt = 1;

    this.movementInt = 0;
    this.onScreen = false;
    this.ramming = false;

    this.visibility = 1;

    this.isPositioned = true;
    this.onFire = 0;
    this.reposX = -1;
    this.reposY = -1;
    this.originalX = WIDTH - this.size - 20;
    this.originalY = HEIGHT/2;
    this.reposTimer = -1;
    this.reposSize = 0;





    
    
    
    this.update = function () {


        if(!this.isPositioned && this.onScreen){
            if(this.reposX == -1 || this.reposY == -1){
                this.reposX = (this.originalX - this.x) / 60;
                this.reposY = (this.originalY - this.y) / 60;
                this.reposSize = (this.values.size - this.size) / 60;
                this.reposTimer = 60;
            }
            if(this.reposTimer > 0){
                this.reposTimer--;
                this.x += this.reposX;
                this.y += this.reposY;
                this.size += this.reposSize;
            }
            if(this.reposTimer === 0){
                this.reposTimer = -1;
                this.isPositioned = true;
                this.reposX = -1;
                this.reposY = -1;
                this.movementInt = 0;
            }

        }


        if(this.onScreen){
            this.move();
            this.movementInt++;
        }

        if(this.ramming){
            this.x -= GAMESPEED * 15;
            if(this.x < - this.size){
                this.x = WIDTH + this.size;
                this.ramming = false;
            }
        }

        if (dist(this.x, this.y, this.state.player.x, this.state.player.y) < (this.size + PLAYERSIZE) / 2 && this.alive && this.state.player.invulTimer <= 0){
            PlayerHit(this.state);
        }


        this.timeTrigger();

        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].update();
        }

        for(var i = 0; i < this.bullets.length; i++){
            this.bullets[i].update();
            if(this.bullets[i].x <= -1000 || !this.bullets[i].alive){
                this.bullets.splice(i, 1);
            }
        }

        if (this.shield > 0) {
            this.shield -= GAMESPEED;
        }

        if(this.x >  WIDTH - 300){
            this.x -= 5 * GAMESPEED;
        }else if(!this.onScreen){
            this.onScreen = true;
        }

        if(this.onScreen && this.isPositioned){
            this.timer++;
        }


        if(this.onFire > 0){
            if(this.onFire % 20 == 0){
                this.health -= this.state.playerStats.playerDamage * 0.1;
                this.state.animatedText.push(new AnimatedText("-" + this.state.playerStats.playerDamage * 10, 20, this.x - 30 +(getRandomInt(0, 60)), this.y - 20 * SCALE, color(255, 255, 255)));
            }
            this.onFire -= 1;
        }


        for(var i = 0; i < this.state.player.bullets.length; i++) {
            if (dist(this.x, this.y, this.state.player.bullets[i].x, this.state.player.bullets[i].y) < (this.size + this.state.player.bullets[i].size) / 2 && this.alive) {
                this.state.player.bullets[i].alive = false;
                var dmg = this.state.playerStats.playerDamage;
                if(this.state.player.bullets[i].bigBullet){
                    dmg = dmg * 20;
                }
                if (this.shield <= 0) {
                    var criting = false;
                    if(Math.random() <= this.state.playerStats.critChance){
                        criting = true;
                    }
                    this.hitsTaken++;
                    if(criting){
                        this.state.animatedText.push(new AnimatedText("-" + dmg * 200, 20, this.state.player.bullets[i].x, this.state.player.bullets[i].y - 20 * SCALE, color(255, 255, 255)));
                    }else {

                        this.state.animatedText.push(new AnimatedText("-" + dmg * 100, 20, this.state.player.bullets[i].x, this.state.player.bullets[i].y - 20 * SCALE, color(255, 255, 255)));
                    }

                    if(SHOPITEM_16){
                        this.onFire = 120;
                    }

                    if(criting){
                        this.health -= dmg * 2;
                        this.values.health -= dmg * 2;
                    }else {
                        this.health -= dmg;
                        this.values.health -= dmg;
                    }

                    if (this.health <= 0) {
                        this.alive = false;
                        this.state.levels.inBossFight = false;
                        this.state.levels.levels = [];
                        this.state.levels.levelsSpawned = 0;
                        this.state.levels.type++;
                        if(this.state.levels.type === 5){
                            this.state.game.changeGameStateByNumber(1);
                        }else{
                            this.state.game.changeGameStateByNumber(5);
                        }

                        INPUTBLOCKED = 60;
                    }


                }else{
                    this.state.animatedText.push(new AnimatedText("-" + 0, 20, this.state.player.bullets[i].x, this.state.player.bullets[i].y - 20 * SCALE, color(255, 255, 255)));
                }
                this.afterHit();
                this.healthTrigger();
            }
        }
        this.checkPhase();
    }
    
    this.show = function () {
        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].show();
        }

        for(var i = 0; i < this.bullets.length; i++){
            this.bullets[i].show();
        }

        if(this.alive) {
            if (this.onScreen) {
                fill(0);
                rect(ACTUALWIDTH / 2 - (152 * SCALE), ACTUALHEIGHT - (52 * SCALE), 304 * SCALE, 34 * SCALE);
                fill(204, 0, 0);
                rect(ACTUALWIDTH / 2 - (150 * SCALE), ACTUALHEIGHT - (50 * SCALE), (300 * this.health / this.originalHealth) * SCALE, 30 * SCALE);
            }
            fill(this.values.image.red, this.values.image.green, this.values.image.blue, 255 * this.visibility);
            ellipse(this.x * SCALE, this.y * SCALE, this.size * SCALE);
            if (this.shield > 0) {
                fill(152, 245, 255, 140 * this.visibility);
                arc(this.x * SCALE, this.y * SCALE, this.size * 1.1 * SCALE, this.size * 1.1 * SCALE, HALF_PI, PI + HALF_PI)
            }
        }

    }
    
    
    
    this.afterHit = function () {

        if(this.hitsTaken % this.values.hitsBetweenActions == 0){
            this.hitsTaken++;
            this.actions(this.values.afterHitActions[getRandomInt(0, this.values.afterHitActions.length - 1)]);
        }
    }

    this.healthTrigger = function () {
        //doesnt work
        if((this.originalHealth - this.health) % this.values.healthBetweenActions == 0){
            this.actions(this.values.healthActions[getRandomInt(0, this.values.healthActions - 1)]);
        }
    }


    this.timeTrigger = function () {
        if(this.timer % (this.values.timeBetweenActions) == 0){

            this.actions(this.values.timeActions[getRandomInt(0, this.values.timeActions.length - 1)]);

        }
    }


    this.actions = function (name) {
        switch (name){
            case "trippleLaser":
                this.bullets.push(new Laser(90, 0, this.x, this.y, this.state.player.x, 180, 180 - (this.y - 180), 20, this.state));
                this.bullets.push(new Laser(90, 5, this.x, this.y, this.state.player.x, 360, 360 - (this.y - 360), 20, this.state));
                this.bullets.push(new Laser(90, 10, this.x, this.y, this.state.player.x, 540, 540 - (this.y - 540), 20, this.state));
                break;
            case "outer laser":
                this.bullets.push(new Laser(90, 0, this.x, this.y, this.state.player.x, 100, 100 - (this.y - 100), 20, this.state));
                this.bullets.push(new Laser(90, 0, this.x, this.y, this.state.player.x, 620, 620 - (this.y - 620), 20, this.state));
                break;
            case "spawn 10 blue enemies":
                var u = getRandomInt(2, 8);
                for(var i = 1; i < 10; i++) {
                    if(i !=  u && i != u+1) {
                        this.state.enemies.add(2, 2000, HEIGHT / 10 * i);
                    }
                }
                break;
            case "spawn laser enemies":
                this.state.enemies.add(4, 1300, 200);
                this.state.enemies.add(4, 1350, HEIGHT - 200);
                break;
            case "ram":
                this.ramming = true;
                break;
            case "spawn obstacle 1":
                this.objects = [new GameObject(0, "item", 16, this.x + 1724, 0, 1, this.state.shell, this.state.game, this.state), new GameObject(0, "item", 176, this.x + 1724, 0, 1, this.state.shell, this.state.game, this.state), new GameObject(0, "item", 336, this.x + 1724, 0, 1, this.state.shell, this.state.game, this.state)];
                break;
            case "spawn obstacle 2":
                this.objects = [new GameObject(0, "item", 704, this.x + 1724, 5, 1, this.state.shell, this.state.game, this.state), new GameObject(0, "item", 544, this.x + 1724, 5, 1, this.state.shell, this.state.game, this.state), new GameObject(0, "item", 384, this.x + 1724, 5, 1, this.state.shell, this.state.game, this.state)] ;
                break;
            case "spawn 10 bullets":
                for(var i = 1; i < 10; i++){
                    this.bullets.push(new Bullet(WIDTH, HEIGHT/10 * i,  GAMESPEED * 10 * 1.5, 50, this.state));
                }
                break;
            case "spawn bullet circle":
                for(var i = 1; i <= 5; i++){
                    this.bullets.push(new Bullet(this.x, this.y, 10, 30, this.state, 1, -0.6 + i * 0.2));
                }
                break;
            case "spawn two bullet circles":
                for(var i = 1; i <= 5; i++){
                    this.bullets.push(new Bullet(this.x, this.y, 10, 30, this.state, 1, -0.6 + i * 0.2));
                }
                for(var j = 1; j <= 7; j++){
                    this.bullets.push(new Bullet(this.x, this.y, 10, 30, this.state, 1, -0.8 + j * 0.2, 30));
                }
                break;
            case "spawn 10 invul bullets":
                for(var i = 1; i < 10; i++){
                    this.bullets.push(new Bullet(WIDTH, HEIGHT/10 * i,  GAMESPEED * 10 * 1.5, 50, this.state, 1, 0, 0, true));
                }
                break;
            case "spawn invul bullet circle":
                for(var i = 1; i <= 3; i++){
                    this.bullets.push(new Bullet(this.x, this.y, 10, 30, this.state, 1, -0.6 + i * 0.3, 0, true));
                }
                break;
            case "spawn two invul bullet circles":
                for(var i = 1; i <= 3; i++){
                    this.bullets.push(new Bullet(this.x, this.y, 10, 30, this.state, 1, -0.6 + i * 0.3, 0, true));
                }
                for(var j = 1; j <= 4; j++){
                    this.bullets.push(new Bullet(this.x, this.y, 10, 30, this.state, 1, -1 + j * 0.4, 30, true));
                }
                break;
            case "big laser":
                this.bullets.push(new Laser(90, 0, this.x, this.y, this.state.player.x, this.y, this.y, 60, this.state));
                break;
            case "shoot 3 bullets":
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 0, false));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 10, false));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 20, false));
                break;
            case "shoot 3 invul bullets":
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 0, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 10, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 20, true));
                break;
            case "shoot 3 bullets circ":
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 0, false));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, -0.2, 0, false));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0.2, 0, false));
                break;
            case "shoot 3 invul bullets circ":
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 0, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, -0.2, 0, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0.2, 0, true));
                break;
            case "shield":
                this.shield = FRAMERATE * 3;
                break;
            case "shoot invul bullet":
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 3, 20, this.state, 1, 0, 0, true));
                break;
            case "shoot 5 delay bullets":
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, -0.3, 0, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, -0.15, 50, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 100, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0.15, 150, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0.3, 200, true));
                break;
            case "big ass mega death laser":
                this.bullets.push(new Laser(90, 0, this.x, this.y, this.state.player.x, this.y, this.y, this.size-2, this.state));
                break;
            case "two rows 5 delay bullets":
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, -0.3, 0, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, -0.15, 50, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 100, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0.15, 150, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0.3, 200, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, -0.3, 250, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, -0.15, 300, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0, 350, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0.15, 400, true));
                this.bullets.push(new Bullet(this.x, this.y,  GAMESPEED * 10 * 2, 20, this.state, 1, 0.3, 450, true));
                break;
            default:
                break;
        }
    }
    
    this.hitPlayerTrigger = function () {
        
    }
    
    this.checkPhase = function () {
        if(this.values.health <= 0){
                this.values = this.bossValues.phases[this.nextBossValueInt];
                this.isPositioned = false;
                this.nextBossValueInt++;

        }
    }
    
    
    
    this.move = function () {
        if(this.isPositioned && !this.ramming) {
            for(var i = 0; i < this.values.movement.length; i++) {
                switch (this.values.movement[i]) {
                    case "sinus":
                        this.y = Math.sin(this.movementInt / 50) * HEIGHT / 3 + HEIGHT / 2;
                        break;
                    case "small sinus":
                        this.y = Math.sin(this.movementInt / 50) * HEIGHT / 5 + HEIGHT / 2;
                        break;
                    case "circle":
                        this.y = Math.sin(this.movementInt / 50) * HEIGHT / 3 + HEIGHT / 2;
                        this.x = Math.cos(this.movementInt / 50) * HEIGHT / 6 + WIDTH - 300 - HEIGHT / 6;
                        break;
                    case "sinus 2":
                        this.x = Math.sin((this.movementInt + 85) / 50) * WIDTH / 3 + WIDTH / 3 * 2 - 300;
                        break;
                    default:
                        break;

                }
            }
        }
    }


    /**
     * zeit
     * hit
     * health
     * hitplayer
     *
     *
     * phase = {health:, image:, size:, movement:, timeBetweenActions:, actions:, afterHitActions:, hitsBetweenActions:, healthActions:, healthBetweenActions:, timeActions:,
     *         hitPlayerActions:}
     *
     * boss = {health:, x:, y:, phases:}
     */
}
