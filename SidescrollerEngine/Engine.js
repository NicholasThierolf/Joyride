/**
 * Created by Nick on 14.07.2017.
 */
src = "../p5.js";
src = "../SidescrollerEngine/*";

function Game(gameSpeed, outerGameShell) {


    this.shell = outerGameShell;
    this.gameSpeed = gameSpeed * 10;
    this.gameStates = [];
    this.activeGameState = null;
    this.score = 0;
    this.currentCoins = 0;
    this.startScore = 0;
    this.distance = 0;
    this.highscore = 0;
    this.gameObjectBlueprints = [];
    this.playerPosX = 200;
    this.playerPosY = HEIGHT - PLAYERSIZE / 2;
    this.lastKilledBy = "";
    this.currentText = "";
    this.textTimer = 0;
    this.animated = [];

    this.update = function () {
        INPUTBLOCKED--;
        this.activeGameState.update();


        for(var i = this.animated.length - 1; i >= 0; i-- ) {
            this.animated[i].update();
        }
    };

    this.show = function () {
        this.activeGameState.show();
        textSize(20);
        fill(255);
        if(this.textTimer > 0){
            this.textTimer--;
            textSize(50);
            text(this.currentText, WIDTH-900, 300);
        }

        for(var i = this.animated.length - 1; i >= 0; i-- ) {
            this.animated[i].show();
        }



    };


    /**
     *
     * @param name: the name of the new game state
     * @param stateBlueprintId: defining the type of the game state
     *                          0: game play state
     *                          1: main menu state
     *                          2: pause state
     */
    this.createNewGameState = function (name, stateBlueprintId) {
        if(stateBlueprintId === 0){
            var gameState = new GamePlayState(name, this, this.shell);
            append(this.gameStates, gameState);
            return gameState;
        }
        if(stateBlueprintId === 1){
            var menuState = new MainMenuState(name, this, this.shell);
            append(this.gameStates, menuState);
            return menuState;
        }
        if(stateBlueprintId === 2){
            this.gameStates.push(new PauseState(name, this));
        }
        if(stateBlueprintId === 3){
            this.gameStates.push(new MenuShopState(name, this, this.shell))
        }
        if(stateBlueprintId === 4){
            this.gameStates.push(new ItemChoiceMenu(name, this, this.shell))
        }
        if(stateBlueprintId === 5){
            this.gameStates.push(new IngameShopState(name, this, this.shell))
        }
        if(stateBlueprintId === 6){
            this.gameStates.push(new endOfGameScreen(name, this, this.shell))
        }
    };


    this.changeGameState = function (name) {
        id = this.findGameStateByName(name);
        if(0 < id < 10){
            this.activeGameState = this.gameStates[id];//this.gameStates[1];
        }
        else{
            throw "No gamestate with the name " + name + " exists in gameStates[]";
        }
    };

    this.changeGameStateByNumber = function (number) {
        if(number < this.gameStates.length) {
            this.activeGameState = this.gameStates[number];
        }
    };

    this.findGameStateByName = function (name) {
        for(i = 0; i < this.gameStates.length; i++){
            if(this.gameStates[i].getName = name){
                return this.gameStates[1];
            }
        }
        return -1;
    };


    this.inputHandler = function (id, x, y) {

        if(INPUTBLOCKED < 0) {
            this.activeGameState.inputHandler(id, x, y);
        }
    }
}






//~~~~~~~~~~~~~~~~~~~~~B-A-C-K-G-R-O-U-N-D-S~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function Backgrounds(speed, image, width, height){
    this.speed = speed;
    this.backgrounds = [];
    this.image = image;
    this.width = width;
    this.height = height;
    this.scale = HEIGHT / this.height;
    this.amount = Math.ceil(WIDTH / this.width * this.scale);


    for(var i = 0; i < this.amount; i++){
        if(i === 0){
            this.backgrounds.push(new Background(this.speed, this.image, i * this.width * this.scale , this));
        }else {
            this.backgrounds.push(new Background(this.speed, this.image, i * this.width * this.scale , this));
        }
    }



    this.update = function () {
        for(var i = this.backgrounds.length - 1; i >= 0; i--){
            if(this.backgrounds[i].x < this.width * this.scale * -1){
                this.backgrounds.splice(i, 1);
                this.backgrounds.push(new Background(this.speed, this.image, this.backgrounds[this.backgrounds.length-1].x + this.width * this.scale, this))
            }
        }


        for(var i = 0; i < this.backgrounds.length; i++){
            this.backgrounds[i].update();
        }

    };


    this.show = function () {
        for(var i = 0; i < this.backgrounds.length; i++){
            this.backgrounds[i].show();
        }
    }
}






//~~~~~~~~~~~~~~~~~~~~~B-A-C-K-G-R-O-U-N-D~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



function Background(speed, img, x, backgrounds) {
    this.speed = speed;
    this.img = img;
    this.x = x;
    this.upper = backgrounds;


    this.update = function () {
        this.x -= speed * GAMESPEED;


    };

    this.show = function () {
        image(this.img, this.x * SCALE, 0, this.upper.width * this.upper.scale * SCALE, ACTUALHEIGHT);
    }
}
