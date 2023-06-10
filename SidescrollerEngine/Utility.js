/**
 * Created by Nick on 22.08.2017.
 */
src = "../SidescrollerEngine/*";
src = "../p5.js";
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}


function SpawnCoins(x, y, amount, state){
    this.x = x;
    this.y = y;
    this.state = state;
    this.state.gameObjects.push(new GameObject(1, "coins", this.y, this.x, -1, 1, this.state.shell, this.state.game, this.state));

}



function PlayerHit(state){
    if(state.player.shieldTimer > 0){
        state.player.shieldTimer = 20 * FRAMERATE;
    }

    if(!state.hitBlocked > 0) {
        if (!state.player.shield) {
            state.player.blinking = 0.5 * FRAMERATE;
            state.red = FRAMERATE;
            if (state.player.health > 1) {
                state.player.health--;
                state.player.invulTimer = FRAMERATE * 1;
            } else {
                state.game.changeGameStateByNumber(6);
                state.game.activeGameState.coinsToCount = -100;
                state.player.blinking = 0;
                setCookie("score", state.game.score, 100);
                if(state.game.distance > state.game.highscore){
                    state.game.highscore = Math.floor(state.game.distance);
                }
                setCookie("highscore", state.game.highscore, 100);
            }
        } else {
            state.player.shield = false;
            state.player.invulTimer = FRAMERATE * 1;
            state.player.blinking = 2;
            if(SHOPITEM_17){
                state.player.shieldTimer = 20 * FRAMERATE;
            }

        }
        state.hitBlocked = 10;
    }
}




function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



function DisplayText(chars, time, state){
    state.game.currentText = chars;
    state.game.textTimer = FRAMERATE * time;

}



function Animate(img, x, y, xLength, yLength, pictureAmount, timeBetween, timeAfter, inverted){
    this.img = img;
    this.x = x;
    this.y = y;
    this.xLength = xLength;
    this.yLength = yLength;
    this.pictureAmount = pictureAmount;
    this.timeBetween = timeBetween;
    this.timeAfter = timeAfter;
    this.animate = timeBetween * (pictureAmount + 1);
    this.inverted = inverted;




    this.update = function () {
        this.animate--;
    }


    this.show = function () {
        var i = Math.floor(this.animate / this.timeBetween);
        if(this.animate <= this.timeBetween && this.animate >= this.timeAfter * -1){
            i = 1;
        }
        if(inverted){
            image(this.img, this.x * SCALE, this.y * SCALE, [sWidth = this.xLength * SCALE], [sHeight = this.yLength * SCALE], [dx = img.width - (img.width / this.pictureAmount * i)], [dy = 0], [dWidth = img.width / this.pictureAmount], [dHeight = img.height]);

        }else {
            image(this.img, this.x * SCALE, this.y * SCALE, [sWidth = this.xLength * SCALE], [sHeight = this.yLength * SCALE], [dx = img.width / this.pictureAmount * i], [dy = 0], [dWidth = img.width / this.pictureAmount], [dHeight = img.height]);
        }
    }
}




function resetItems(){
    ITEM_HP = 0;
    ITEM_01 =  false;
    ITEM_02 =  false;
    ITEM_03 =  false;
    ITEM_04 =  false;
    ITEM_05 =  false;
    ITEM_06 =  false;
    ITEM_07 =  false;
    ITEM_08 =  false;
    ITEM_09 =  false;
    ITEM_10 =  false;
    ITEM_11 =  false;
    ITEM_12 =  false;
    ITEM_13 =  false;
    ITEM_14 =  false;
    ITEM_15 =  false;
    ITEM_16 =  false;
    ITEM_17 =  false;
    ITEM_18 =  false;
    ITEM_19 =  false;
    ITEM_20 =  false;
    SHOPITEM_01 =  false;
    SHOPITEM_02 =  false;
    SHOPITEM_03 =  false;
    SHOPITEM_04 =  false;
    SHOPITEM_05 =  false;
    SHOPITEM_06 =  false;
    SHOPITEM_07 =  false;
    SHOPITEM_08 =  false;
    SHOPITEM_09 =  false;
    SHOPITEM_10 =  false;
    SHOPITEM_11 =  false;
    SHOPITEM_12 =  false;
    SHOPITEM_13 =  false;
    SHOPITEM_14 =  false;
    SHOPITEM_15 =  false;
    SHOPITEM_16 =  false;
    SHOPITEM_17 =  false;
    SHOPITEM_18 =  false;
    SHOPITEM_19 =  false;
    SHOPITEM_20 =  false;
    SHOPITEM_21 =  false;
}



function PlayerHeal(state){
    if(state.player.health < state.playerStats.playerHp){
        state.player.health++;
    }
}




function BuyShopItem(id, state){
    switch (id){
        case 0:
            SHOPITEM_01 = true;
            break;
        case 1:
            SHOPITEM_02 = true;
            break;
        case 2:
            SHOPITEM_03 = true;
            break;
        case 3:
            SHOPITEM_04 = true;
            break;
        case 4:
            SHOPITEM_05 = true;
            break;
        case 5:
            SHOPITEM_06 = true;
            break;
        case 6:
            SHOPITEM_07 = true;
            break;
        case 7:
            SHOPITEM_08 = true;
            break;
        case 8:
            SHOPITEM_09 = true;
            break;
        case 9:
            SHOPITEM_10 = true;
            break;
        case 10:
            SHOPITEM_11 = true;
            break;
        case 11:
            SHOPITEM_12 = true;
            break;
        case 12:
            SHOPITEM_13 = true;
            break;
        case 13:
            SHOPITEM_14 = true;
            break;
        case 14:
            SHOPITEM_15 = true;
            break;
        case 15:
            SHOPITEM_16 = true;
            break;
        case 16:
            SHOPITEM_17 = true;
            break;
        case 17:
            SHOPITEM_18 = true;
            break;
        case 18:
            SHOPITEM_19 = true;
            break;
        case 19:
            currentActiveItem =  new ActiveItem(1, state);
            break;
        case 20:
            currentActiveItem =  new ActiveItem(2, state);
            break;
        case 21:
            currentActiveItem =  new ActiveItem(3, state);
            break;

    }
}


function AnimatedText(chars, size, x, y, textColor){
    this.chars = chars;
    this.size = size;
    this.x = x;
    this.y = y;
    this.textColor = textColor;
    this.time = 90;
    
    
    this.update = function () {
        this.time -= GAMESPEED;
    }
    
    this.show = function () {
        textAlign(CENTER, CENTER);
        textSize(this.size * SCALE);
        fill(red(this.textColor), green(this.textColor), blue(this.textColor), 255 * this.time / 60);
        text(this.chars, this.x * SCALE, (this.y -((60 - this.time) * 1.5)) * SCALE)
        textAlign(LEFT, BOTTOM);
        fill(0);
    }
}





function ActiveItem(id, state){
    this.id = id;
    this.state =  state;
    this.active = 0;
    this.maxCounter = 0;
    switch (this.id){
        case 1:
            this.maxCounter = 30 * FRAMERATE;
            break;
        case 2:
            this.maxCounter = 10 * FRAMERATE;
            break;
        case 3:
            this.maxCounter = 40 * FRAMERATE;
            break;
        case 4:
            this.maxCounter = 60 * FRAMERATE;
            break;
        case 5:
            this.maxCounter = 60 * FRAMERATE;
            break;
    }
    this.update =  function () {
        if(this.active > 0){
            this.active -= GAMESPEED;

        }
    }

    this.activate = function(){
        if(this.active <= 0){
            switch (this.id){
                case 1:
                    //make invincible for 2 secs
                    this.state.player.invulTimer = 2 * FRAMERATE;
                    this.state.player.blinking = 2 * FRAMERATE;
                    this.active = 30 * FRAMERATE;
                    break;
                case 2:
                    //big bullet
                    this.state.player.bullets.push(new BigPlayerBullet(this.state.player.x, this.state.player.y, 10, this.state));
                    this.active = 10 * FRAMERATE;
                    break;
                case 3:
                    //heilung
                    HEALNEXTTICK++;
                    this.active = 40 * FRAMERATE;
                    break;
                case 4:
                    //buffed
                    BUFFED = 6 * FRAMERATE;
                    this.active = 60 * FRAMERATE;
                    break;
                case 5:
                    //slowmo
                    SLOWMO = 4 * FRAMERATE;
                    this.active = 60 * FRAMERATE;
                    break;
            }
        }

    }

    this.show =  function () {
        fill(255, 0, 0);
        ellipse(ACTUALWIDTH - (80 * SCALE), ACTUALHEIGHT - (80 * SCALE), 30 * SCALE)
    }
}