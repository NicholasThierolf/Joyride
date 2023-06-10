/**
 * Created by Nick on 22.08.2017.
 */
src = "../SidescrollerEngine/*";
src = "../p5.js";
function Bullet(x, y, speed, size, state, xSpeed, ySpeed, delayTimer, invul){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.state = state;
    this.alive = true;
    this.animate = -0.5;
    this.speeds = createVector(1,0)
    if(typeof xSpeed != 'undefined'){
        this.speeds.x = xSpeed;
    }
    if(typeof ySpeed != 'undefined'){
        this.speeds.y = ySpeed;
    }
    this.speeds.setMag(this.speed);

    this.delay = 0;
    if(typeof delayTimer != 'undefined'){
        this.delay = delayTimer;
    }

    this.invul = false;
    if(typeof invul != 'undefined'){
        this.invul = invul;
    }

    this.update = function () {
        if(this.delay > 0){
            this.delay--;
        }else{
            this.animate += 0.2 * GAMESPEED;

            if(dist(this.x, this.y, this.state.player.x, this.state.player.y) < (this.size + PLAYERSIZE) * 0.5 && VULNURABLE && this.alive && GAMESPEED != 0){
                this.state.game.lastKilledBy = "Bullet";
                PlayerHit(this.state);
            }

            if(!this.invul) {
                for (var i = 0; i < this.state.player.bullets.length; i++) {
                    if (dist(this.x, this.y, this.state.player.bullets[i].x, this.state.player.bullets[i].y) < (this.size + this.state.player.bullets[i].size) * 0.5 && this.alive) {
                        this.state.player.bullets[i].alive = false;
                        this.alive = false;
                    }
                }
            }

            this.x -= this.speeds.x * GAMESPEED + GAMESPEED;
            this.y -= this.speeds.y * GAMESPEED;
        }

    };


    this.show = function () {
        if(this.delay > 0){
            this.delay--;
        }else {
            translate(this.x * SCALE, this.y * SCALE);
            rotate(Math.atan(this.speeds.y / this.speeds.x));
            imageMode(CENTER);
            if(this.invul){
                switch (Math.round(this.animate)) {
                    case 0:
                        image(REDBULLET_0, 0, 0, this.size * 3 * SCALE, this.size * 6 * SCALE);
                        break;
                    case 1:
                        image(REDBULLET_1, 0, 0, this.size * 3 * SCALE, this.size * 6 * SCALE);
                        break;
                    case 2:
                        image(REDBULLET_2, 0, 0, this.size * 3 * SCALE, this.size * 6 * SCALE);
                        break;
                    default:
                        image(REDBULLET_0, 0, 0, this.size * 3 * SCALE, this.size * 6 * SCALE);
                        this.animate = -0.5;
                        break;
                }
            }else {
                switch (Math.round(this.animate)) {
                    case 0:
                        image(BULLET_0, 0, 0, this.size * 3 * SCALE, this.size * 6 * SCALE);
                        break;
                    case 1:
                        image(BULLET_1, 0, 0, this.size * 3 * SCALE, this.size * 6 * SCALE);
                        break;
                    case 2:
                        image(BULLET_2, 0, 0, this.size * 3 * SCALE, this.size * 6 * SCALE);
                        break;
                    default:
                        image(BULLET_0, 0, 0, this.size * 3 * SCALE, this.size * 6 * SCALE);
                        this.animate = -0.5;
                        break;
                }
            }
            imageMode(CORNER);
            rotate(-Math.atan(this.speeds.y / this.speeds.x));
            translate(-this.x * SCALE, -this.y * SCALE);
        }

    }



}



function PlayerBullet(x, y, speed, size, state){
    this.bigBullet = false;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.state = state;
    this.alive = true;
    this.animate = -0.5;
    this.sizeMult = 1;

    this.update = function () {
        this.animate += 0.2 * GAMESPEED;
        this.x += this.speed * GAMESPEED * this.state.playerStats.bulletSpeed;
        this.sizeMult = dist(this.x, this.y, this.state.player.x + 20, this.state.player.y -20) / (PLAYERSIZE * 1.5);
        if(this.sizeMult > 1){
            this.sizeMult = 1;
        }
    };






    this.show = function () {
        if(this.x < WIDTH + this.size) {
            switch (Math.round(this.animate)) {
                case 0:
                    image(PLAYERBULLET_0, (this.x - this.size * this.sizeMult * 2.25) * SCALE, (this.y - this.size * this.sizeMult * 2.75) * SCALE, this.size * 3 * this.sizeMult * SCALE, this.size * 6 * this.sizeMult * SCALE);
                    break;
                case 1:
                    image(PLAYERBULLET_1, (this.x - this.size * this.sizeMult * 2.25) * SCALE, (this.y - this.size * this.sizeMult * 2.75) * SCALE, this.size * 3 * this.sizeMult * SCALE, this.size * 6 * this.sizeMult * SCALE);
                    break;
                case 2:
                    image(PLAYERBULLET_2, (this.x - this.size * this.sizeMult * 2.25) * SCALE, (this.y - this.size * this.sizeMult * 2.75) * SCALE, this.size * 3 * this.sizeMult * SCALE, this.size * 6 * this.sizeMult * SCALE);
                    break;
                default:
                    image(PLAYERBULLET_0, (this.x - this.size * this.sizeMult * 2.25) * SCALE, (this.y - this.size * this.sizeMult * 2.75) * SCALE, this.size * 3 * this.sizeMult * SCALE, this.size * 6 * this.sizeMult * SCALE);
                    this.animate = -0.5;
                    break;
            }
        }

    }



}

function BigPlayerBullet(x, y, speed, state) {
    this.bigBullet = true;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 60;
    this.state = state;
    this.alive = true;
    this.animate = -0.5;
    this.sizeMult = 1;

    this.update = function () {
        this.animate += 0.2 * GAMESPEED;
        this.x += this.speed * GAMESPEED * this.state.playerStats.bulletSpeed;
        this.sizeMult = dist(this.x, this.y, this.state.player.x + 20, this.state.player.y - 20) / (PLAYERSIZE * 1.5);
        if (this.sizeMult > 1) {
            this.sizeMult = 1;
        }
    };


    this.show = function () {
        if (this.x < WIDTH + this.size) {
            switch (Math.round(this.animate)) {
                case 0:
                    image(PLAYERBULLETRED_0, (this.x - this.size * this.sizeMult * 2.25) * SCALE, (this.y - this.size * this.sizeMult * 2.75) * SCALE, this.size * 3 * this.sizeMult * SCALE, this.size * 6 * this.sizeMult * SCALE);
                    break;
                case 1:
                    image(PLAYERBULLETRED_1, (this.x - this.size * this.sizeMult * 2.25) * SCALE, (this.y - this.size * this.sizeMult * 2.75) * SCALE, this.size * 3 * this.sizeMult * SCALE, this.size * 6 * this.sizeMult * SCALE);
                    break;
                case 2:
                    image(PLAYERBULLETRED_2, (this.x - this.size * this.sizeMult * 2.25) * SCALE, (this.y - this.size * this.sizeMult * 2.75) * SCALE, this.size * 3 * this.sizeMult * SCALE, this.size * 6 * this.sizeMult * SCALE);
                    break;
                default:
                    image(PLAYERBULLETRED_0, (this.x - this.size * this.sizeMult * 2.25) * SCALE, (this.y - this.size * this.sizeMult * 2.75) * SCALE, this.size * 3 * this.sizeMult * SCALE, this.size * 6 * this.sizeMult * SCALE);
                    this.animate = -0.5;
                    break;
            }
        }

    }
}




function Laser(shootingTime, beforeTime, sourceX, sourceY, x, y, actualY, size, state){

    this.state = state;
    this.beforeTime = beforeTime;
    this.time = shootingTime;
    this.x = x;
    this.actualX = this.state.player.x - (960 - this.state.player.x);
    this.sourceX = sourceX;
    this.y = y;
    this.actualY = actualY;
    this.sourceY = sourceY;
    this.shooting = false;
    this.alive = true;
    this.aiming = 50;
    this.size = size;


    this.update = function () {
        if(this.beforeTime <= 0){
            this.aiming--;
            this.time--;
            if(this.time <= 0.5 * FRAMERATE && this.shooting == false){
                this.shooting = true;
            }
        }else{
            this.beforeTime--;
        }
        if(this.time <= 0){
            this.alive = false;
        }

        if(Math.abs(this.y - this.state.player.y) < (PLAYERSIZE + this.size) / 2 && this.aiming <= 0 && this.alive && this.state.player.invulTimer <= 0){
            PlayerHit(this.state);
        }

    }

    this.show = function () {
        if(this.beforeTime == 0 && this.alive){
            stroke(255, 0, 0);

            if(this.aiming > 0) {
                if(this.aiming <= 5) {
                    strokeWeight(1 * SCALE);
                    line(this.sourceX * SCALE, this.sourceY * SCALE, this.actualX * SCALE, this.actualY * SCALE);
                }else {
                    stroke(255, 0, 0, 55 + (45 - this.aiming - 5) / 45 * 120);
                    strokeWeight((this.aiming - 5) / 45 * this.size * SCALE);
                    line(this.sourceX * SCALE, this.sourceY * SCALE, this.actualX * SCALE, this.actualY * SCALE);
                }
            }else{
                strokeWeight(this.size * SCALE);
                line(this.sourceX * SCALE, this.sourceY * SCALE, this.actualX * SCALE, this.actualY * SCALE);
            }


        }
        //line(this.sourceX * SCALE, this.sourceY * SCALE, this.actualX * SCALE, this.actualY * SCALE);
        strokeWeight(0);


    }
}