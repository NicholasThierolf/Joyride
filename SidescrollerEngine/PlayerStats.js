/**
 * Created by Nick on 22.08.2017.
 */

src = "../p5.js";
src = "../SidescrollerEngine/*";
function PlayerStats(){
    this.bulletRate = 5;
    this.bulletSpeed = 1;
    this.bulletSize = 20;
    this.bulletAmount;
    this.playerSpeed;
    this.maxBulletsPerBoost = 3;
    this.playerHp = 3;
    this.playerSize = 1;
    this.playerDamage = 1;
    this.critChance = 0;


    this.updateStats = function (items) {
        this.bulletRate = items.bulletRate;
        this.bulletSpeed = items.bulletSpeed;
        this.bulletSize = items.bulletSize;
        this.bulletAmount = items.bulletAmount;
        this.playerSpeed = items.playerSpeed;
        this.maxBulletsPerBoost = items.maxBulletsPerBoost;
        this.playerHp = items.playerHp;
        this.playerSize = items.playerSize;
        this.playerDamage = items.playerDamage;
        this.critChance = items.critChance;
    }


    this.resetPlayerStats = function () {
        this.bulletRate = 5;
        this.bulletSpeed = 1;
        this.bulletSize = 20;
        this.bulletAmount;
        this.playerSpeed;
        this.maxBulletsPerBoost = 3;
        this.playerHp = 3;
        this.playerSize = 1;
        this.playerDamage = 1;
        this.critChance = 0;
    }

}


/**
 * ITEMS:
 *      01: BulletSize up, BulletRate down
 *      02: BulletSpeed up
 *      03: PlayerHp up, PlayerSize up
 *      04: PlayerSize down
 *      05: BulletSpeed up, BulletSize up
 *      06: BulletRate up
 *      07:
 *
 */





function ItemStats(){
    this.bulletRate = 5;
    this.bulletSpeed = 1;
    this.bulletSize = 20;
    this.bulletAmount;
    this.playerSpeed;
    this.maxBulletsPerBoost = 3;
    this.playerHp = 3 + ITEM_HP;
    this.playerSize = 1;
    this.playerDamage = 1;
    this.critChance = 0;


    this.item_03Healed = false;
    this.shopItem_13Healed = false;
    this.shopItem_14Healed = false;
    this.shopItem_28Healed = false;
    this.shopItem_29Healed = false;





    if(ITEM_01){
        this.bulletSize += 20;
        this.bulletRate -= 1;
    }
    if(ITEM_02){
        this.bulletSpeed += 0.3;
    }
    if(ITEM_03){
        this.playerHp += 2;
        this.playerSize += 0.2;
        if(!this.item_03Healed){
            HEALNEXTTICK += 2;
            this.item_03Healed = true;
        }
    }
    if(ITEM_04){
        this.playerSize -= 0.2;
    }
    if(ITEM_05){
        this.bulletSpeed += 0.2;
        this.bulletSize +=10;
    }
    if(ITEM_06){
        this.bulletRate += 2;

    }
    if(ITEM_07){
        this.playerDamage += 1;
    }
    if(ITEM_08){
        this.playerDamage += 0.5;
    }
    if(ITEM_09){
        this.playerDamage += 0.3;
    }
    if(ITEM_10){
        this.playerDamage += 2;
        this.playerSize += 0.2;
    }
    if(ITEM_11){
        this.playerSize -= 0.3;
        this.playerDamage -= 0.5;
    }
    if(ITEM_12){
        this.critChance += 0.3;
    }
    if(ITEM_13){
        this.playerHp += 2;
    }
    if(ITEM_14){
        this.bulletSize += 10;
    }
    if(ITEM_15){
        this.bulletAmount += 2;
        this.maxBulletsPerBoost += 2;
    }
    if(ITEM_16){
        this.bulletRate += 3;
    }
    if(ITEM_17){
        this.bulletRate -= 2;
        this.playerDamage += 2;
    }
    if(ITEM_18){
        this.bulletSize -= 10;
        this.maxBulletsPerBoost += 3;
        thos.bulletAmount += 3;
        this.bulletSpeed += 0.5;
    }
    if(ITEM_19){
        this.bulletSize += 50;
    }
    if(ITEM_20){
        this.playerDamage += 0.3;
    }





    if(SHOPITEM_01){
        this.playerDamage += 0.5;
        this.bulletRate += 0.5;
    }
    if(SHOPITEM_02){
        //doubel coins
    }
    if(SHOPITEM_03){
        this.playerDamage += 1;
        this.bulletRate -= 1;
    }
    if(SHOPITEM_04){
        this.bulletSpeed += 0.5;
        this.bulletRate -= 1;
    }
    if(SHOPITEM_05){
        this.playerSize -= 0.1;
    }
    if(SHOPITEM_06){
        this.playerDamage += 0.2;
        this.bulletRate += 0.2;
    }
    if(SHOPITEM_07){
        this.bulletSize -= 5;
        this.bulletSpeed += 0.3;
    }
    if(SHOPITEM_08){
        this.playerDamage -= 0.3;
        this.playerSize -= 0.2;
    }
    if(SHOPITEM_09){
        this.playerSize += 0.2;
        this.bulletSize += 5;
    }
    if(SHOPITEM_10){
        this.maxBulletsPerBoost += 2;
    }
    if(SHOPITEM_11){
        this.playerDamage += 0.5;
    }
    if(SHOPITEM_12){
        this.playerDamage += 2;
        this.playerHp -= 1;
    }
    if(SHOPITEM_13){
        this.playerHp += 1;
        if(!this.shopItem_13Healed){
            HEALNEXTTICK += 1;
            this.shopItem_13Healed = true;
        }
    }
    if(SHOPITEM_14){
        this.playerHp += 2;
        if(!this.shopItem_14Healed){
            HEALNEXTTICK += 2;
            this.shopItem_14Healed = true;
        }
        this.playerDamage -= 0.5;
    }
    if(SHOPITEM_15){
        this.playerHp -= 1;
        this.playerSize -= 0.3;
    }
    if(SHOPITEM_16){
        //fire shots
    }
    if(SHOPITEM_17){
        //shield
    }
    if(SHOPITEM_18){
        this.critChance += 0.2;
    }
    if(SHOPITEM_19){
        this.critChance += 0.4;
    }
    if(SHOPITEM_20){
        //invul active
    }
    if(SHOPITEM_21){
        // shoot big bullet
    }
    if(SHOPITEM_22){
        // active heal
    }
    if(SHOPITEM_23){
        // active buff
    }
    if(SHOPITEM_24){
        this.playerDamage += 2;
    }
    if(SHOPITEM_25){
        this.playerDamage += 5;
    }
    if(SHOPITEM_26){
        // slowmo
    }
    if(SHOPITEM_27){
        this.playerSize -= 0.2;
    }
    if(SHOPITEM_28){
        this.health += 4;
        if(!this.shopItem_28Healed){
            HEALNEXTTICK += 4;
            this.shopItem_28Healed = true;
        }
    }
    if(SHOPITEM_29){
        this.health += 2;
        if(!this.shopItem_29Healed){
            HEALNEXTTICK += 2;
            this.shopItem_29Healed = true;
        }
    }
    if(SHOPITEM_30){
        this.bulletSpeed += 0.3;
    }
    if(SHOPITEM_31){
        this.maxBulletsPerBoost = 1;
        this.bulletAmount = 1;
        this.playerDamage += 3;
    }
    if(SHOPITEM_32){
        this.critChance += 0.1;
    }



    if(this.playerSize <= 0.6){
        this.playerSize = 0.6;
    }

    if(BUFFED > 0){
        this.playerDamage += 3;
        this.critChance += 0.5;
        this.playerSize += 0.2;
        this.bulletSize += 10;
    }

}