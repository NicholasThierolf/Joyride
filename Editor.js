/**
 * Created by Nick on 31.08.2017.
 */
src = "p5.js";

var objects = [];
var redoObjects = [];
var type = 0;
var outputText = "";
var outputTextEnemies = "";
var horAlign = false;
var yAlign = [];
var verAlign = false;
var xAlign = [];
var snapPoints = [];
var snap = false;



function setup(){
    var cnv = createCanvas(1280, 360);
}


function draw(){


    background(127);
    noStroke();
    fill(255, 255, 255);
    this.y = mouseY;
    this.x = mouseX;

    if(snap){
        var closest = -1;
        var closestDistance = 100;
        for(var i = 0; i < snapPoints.length; i++){
            if(dist(snapPoints[i].x, snapPoints[i].y, this.x, this.y) < closestDistance){
                closest = i;
                closestDistance = dist(snapPoints[i].x, snapPoints[i].y, this.x, this.y);
            }
        }
        if(closest != -1){
            this.x = snapPoints[closest].x;
            this.y = snapPoints[closest].y;
        }


    }

    if(horAlign){
        var closest = -1;
        var closestDistance = 50;
        var d;
        for(var i = 0; i < yAlign.length; i++){
            d = this.y - yAlign[i];
            if(d < 0){
                d = d * -1;
            }
            if(d < closestDistance){
                closest = i;
                closestDistance = d;
            }
        }
        if(closest != -1){
            this.y = yAlign[closest];
        }
    }
    if(verAlign){
        var closest = -1;
        var closestDistance = 50;
        var d;
        for(var i = 0; i < xAlign.length; i++){
            d = this.x - xAlign[i];
            if(d < 0){
                d = d * -1;
            }
            if(d < closestDistance){
                closest = i;
                closestDistance = d;
            }
        }
        if(closest != -1){
            this.x = xAlign[closest];
        }
    }
    switch (type){
        case -2:
            stroke(255);
            line(this.x, 0, this.x, 360);
            break;
        case -1:
            stroke(255);
            line(0, this.y, 1280, this.y);
            break;
        case 0:
            ellipse(this.x, this.y, 25);
            break;
        case 1:
            ellipse(this.x, this.y, 25);
            ellipse(this.x, this.y + 20, 25);
            ellipse(this.x, this.y + 40, 25);
            ellipse(this.x, this.y + 60, 25);
            ellipse(this.x, this.y + 80, 25);
            break;
        case 2:
            ellipse(this.x, this.y, 25);
            ellipse(this.x + 10, this.y + 5, 25);
            ellipse(this.x + 20, this.y + 10, 25);
            ellipse(this.x + 30, this.y + 15, 25);
            ellipse(this.x + 40, this.y + 20, 25);
            break;
        case 3:
            ellipse(this.x, this.y, 25);
            ellipse(this.x + 10, this.y - 5, 25);
            ellipse(this.x + 20, this.y - 10, 25);
            ellipse(this.x + 30, this.y - 15, 25);
            ellipse(this.x + 40, this.y - 20, 25);
            break;
        case 4:
            ellipse(this.x, this.y, 25);
            ellipse(this.x + 20, this.y, 25);
            ellipse(this.x + 40, this.y, 25);
            ellipse(this.x + 60, this.y, 25);
            ellipse(this.x + 80, this.y, 25);
            break;
        case 5:
            for(var i = 0; i < 2; i++) {
                var y = this.y + (20 * i);
                for (var j = 0; j < 9; j++) {
                    ellipse(this.x + 20 * j, y, 12.5)
                }
            }
            break;
        case 6:
            for(var i = 0; i < 2; i++) {
                for (var j = 0; j < 9; j++) {
                    ellipse(this.x + 10 * j, this.y + 5*j + 20*i, 12.5)
                }
            }
            break;
        case 7:
            for(var i = 0; i < 2; i++) {
                for (var j = 0; j < 9; j++) {
                    ellipse(this.x + 10 * j, this.y - 5*j - 20*i, 12.5)
                }
            }
            break;
        case 8:
            ellipse(this.x, this.y, 25);
            ellipse(this.x, this.y - 20, 25);
            ellipse(this.x, this.y - 40, 25);
            ellipse(this.x, this.y - 60, 25);
            ellipse(this.x, this.y - 80, 25);
            break;
        case 9:
            ellipse(this.x, this.y, 25);
            ellipse(this.x - 10, this.y + 5, 25);
            ellipse(this.x - 20, this.y + 10, 25);
            ellipse(this.x - 30, this.y + 15, 25);
            ellipse(this.x - 40, this.y + 20, 25);
            break;
        case 10:
            ellipse(this.x, this.y, 25);
            ellipse(this.x - 10, this.y - 5, 25);
            ellipse(this.x - 20, this.y - 10, 25);
            ellipse(this.x - 30, this.y - 15, 25);
            ellipse(this.x - 40, this.y - 20, 25);
            break;
        case 11:
            fill(255, 0, 0);
            ellipse(this.x, this.y, 25);
            break;
        case 12:
            fill(0, 127, 0);
            ellipse(this.x, this.y, 25);
            break;
        case 13:
            fill(0, 0, 127);
            ellipse(this.x, this.y, 15);
            break;
        case 14:
            fill(127, 0, 0);
            ellipse(this.x, this.y, 25);
            break;
        case 15:
            fill(255, 0, 255);
            ellipse(this.x, this.y, 45);
            break;
        case 16:
            fill(255, 0, 255);
            ellipse(this.x, this.y, 20);
            break;
        }


    for(var i = 0; i < objects.length; i++){
        objects[i].show();
    }

    if(horAlign){
        stroke(255);
        for(var i = 0; i < yAlign.length; i++){
            line(0, yAlign[i], 1280, yAlign[i]);
        }

    }

    if(verAlign){
        stroke(255);
        for(var i = 0; i < xAlign.length; i++){
            line(xAlign[i], 0, xAlign[i], 360)
        }

    }

    document.getElementById("visible-input").value = "this.objects = [" + outputText + "] " + outputTextEnemies + "; break;";
}




function touchEnded() {
    if(mouseX > 0 && mouseX < 1280 && mouseY > 0 && mouseY < 360){

        if(type === -1){
            horAlign = true;
            yAlign.push(mouseY);
        }else{
            if(type === -2){
                verAlign = true;
                xAlign.push(mouseX);
            }else{
                objects.push(new ObstacleObject(mouseX, mouseY, type))
            }
        }
    }

}



//(type, objectId, yModifier, xStart, blueprintId, speedModifier, outerGameShell, game, state)

function ObstacleObject(x,y, type){
    this.snapCreated = false;
    this.x = x;
    this.y = y;


    if(snap){
        var closest = -1;
        var closestDistance = 100;
        for(var i = 0; i < snapPoints.length; i++){
            if(dist(snapPoints[i].x, snapPoints[i].y, x, y) < closestDistance){
                closest = i;
                closestDistance = dist(snapPoints[i].x, snapPoints[i].y, x, y);
            }
        }
        if(closest != -1){
            this.x = snapPoints[closest].x;
            this.y = snapPoints[closest].y;
        }else{
            this.x = x;
            this.y = y;
        }
    }else {

        if (horAlign) {
            var closest = -1;
            var closestDistance = 50;
            var d;
            for (var i = 0; i < yAlign.length; i++) {
                d = this.y - yAlign[i];
                if (d < 0) {
                    d = d * -1;
                }
                if (d < closestDistance) {
                    closest = i;
                    closestDistance = d;
                }
            }
            if (closest != -1) {
                this.y = yAlign[closest];
            }
        }
        if (verAlign) {
            var closest = -1;
            var closestDistance = 50;
            var d;
            for (var i = 0; i < xAlign.length; i++) {
                d = this.x - xAlign[i];
                if (d < 0) {
                    d = d * -1;
                }
                if (d < closestDistance) {
                    closest = i;
                    closestDistance = d;
                }
            }
            if (closest != -1) {
                this.x = xAlign[closest];
            }
        }
    }
    this.type = type;


    this.createText = function () {

        switch (this.type) {
            case 0:
                if (outputText != "") {
                    outputText += ", new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 2 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 2 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 1:
                if (outputText != "") {
                    outputText += ", new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 2:
                if (outputText != "") {
                    outputText += ", new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 1 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 1 + ", 1, this.state.shell, this.state.game, this.state)"
                }

                break;
            case 3:
                if (outputText != "") {
                    outputText += ", new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 3 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 3 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 4:
                if (outputText != "") {
                    outputText += ", new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 4 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 4 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 5:
                if (outputText != "") {
                    outputText += ", new GameObject(1, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(1, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 6:
                if (outputText != "") {
                    outputText += ", new GameObject(1, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 1 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(1, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 1 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 7:
                if (outputText != "") {
                    outputText += ", new GameObject(1, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 2 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(1, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 2 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 8:
                if (outputText != "") {
                    outputText += ", new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 5 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 5 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 9:
                if (outputText != "") {
                    outputText += ", new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 6 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 6 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 10:
                if (outputText != "") {
                    outputText += ", new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 7 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(0, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 7 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 11:
                outputTextEnemies += ";this.state.enemies.add(0, this.x +" + this.x * 2 + ", " + this.y * 2 + ")"
                break;
            case 12:
                outputTextEnemies += ";this.state.enemies.add(1, this.x +" + this.x * 2 + ", " + this.y * 2 + ")"
                break;
            case 13:
                outputTextEnemies += ";this.state.enemies.add(2, this.x +" + this.x * 2 + ", " + this.y * 2 + ")"
                break;
            case 14:
                outputTextEnemies += ";this.state.enemies.add(4, this.x +" + this.x * 2 + ", " + this.y * 2 + ")"
                break;
            case 15:
                if (outputText != "") {
                    outputText += ", new GameObject(2, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(2, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 16:
                if (outputText != "") {
                    outputText += ", new GameObject(3, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(3, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;
            case 17:
                if (outputText != "") {
                    outputText += ", new GameObject(4, \"item\", " + this.y * 2 + ", this.x + " + this.x * 2 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                } else {
                    outputText += "new GameObject(4, \"item\", " + this.y * 2 + ", this.x + " + 2560 + ", " + 0 + ", 1, this.state.shell, this.state.game, this.state)"
                }
                break;

        }
    }


    this.show = function () {
        noStroke();
        fill(255, 255, 255);
        switch (this.type){
            case -2:
                stroke(255);
                line(this.x, 0, this.x, 360);
                break;
            case -1:
                stroke(255);
                line(0, this.y, 1280, this.y);
                break;
            case 0:
                ellipse(this.x, this.y, 25);
                if(!this.snapCreated){
                    snapPoints.push(snapPoint = {x:this.x,y:this.y})
                    this.snapCreated = true;
                }
                break;
            case 1:
                ellipse(this.x, this.y, 25);
                ellipse(this.x, this.y + 20, 25);
                ellipse(this.x, this.y + 40, 25);
                ellipse(this.x, this.y + 60, 25);
                ellipse(this.x, this.y + 80, 25);
                if(!this.snapCreated){
                    snapPoints.push(snapPoint = {x:this.x,y:this.y})
                    snapPoints.push(snapPoint = {x:this.x,y:this.y + 80})
                    this.snapCreated = true;
                }
                break;
            case 2:
                ellipse(this.x, this.y, 25);
                ellipse(this.x + 10, this.y + 5, 25);
                ellipse(this.x + 20, this.y + 10, 25);
                ellipse(this.x + 30, this.y + 15, 25);
                ellipse(this.x + 40, this.y + 20, 25);
                if(!this.snapCreated){
                    snapPoints.push(snapPoint = {x:this.x,y:this.y})
                    snapPoints.push(snapPoint = {x:this.x + 40,y:this.y + 20})
                    this.snapCreated = true;
                }
                break;
            case 3:
                ellipse(this.x, this.y, 25);
                ellipse(this.x + 10, this.y - 5, 25);
                ellipse(this.x + 20, this.y - 10, 25);
                ellipse(this.x + 30, this.y - 15, 25);
                ellipse(this.x + 40, this.y - 20, 25);
                if(!this.snapCreated){
                    snapPoints.push(snapPoint = {x:this.x,y:this.y})
                    snapPoints.push(snapPoint = {x:this.x + 40,y:this.y - 20})
                    this.snapCreated = true;
                }
                break;
            case 4:
                ellipse(this.x, this.y, 25);
                ellipse(this.x + 20, this.y, 25);
                ellipse(this.x + 40, this.y, 25);
                ellipse(this.x + 60, this.y, 25);
                ellipse(this.x + 80, this.y, 25);
                if(!this.snapCreated){
                    snapPoints.push(snapPoint = {x:this.x,y:this.y})
                    snapPoints.push(snapPoint = {x:this.x + 80,y:this.y})
                    this.snapCreated = true;
                }
                break;
            case 5:
                for(var i = 0; i < 2; i++) {
                    var y = this.y + (20 * i);
                    for (var j = 0; j < 9; j++) {
                        ellipse(this.x + 20 * j, y, 12.5)
                    }
                }
                break;
            case 6:
                for(var i = 0; i < 2; i++) {
                    for (var j = 0; j < 9; j++) {
                        ellipse(this.x + 10 * j, this.y + 5*j + 20*i, 12.5)
                    }
                }
                break;
            case 7:
                for(var i = 0; i < 2; i++) {
                    for (var j = 0; j < 9; j++) {
                        ellipse(this.x + 10 * j, this.y - 5*j - 20*i, 12.5)
                    }
                }
                break;
            case 8:
                ellipse(this.x, this.y, 25);
                ellipse(this.x, this.y - 20, 25);
                ellipse(this.x, this.y - 40, 25);
                ellipse(this.x, this.y - 60, 25);
                ellipse(this.x, this.y - 80, 25);
                if(!this.snapCreated){
                    snapPoints.push(snapPoint = {x:this.x,y:this.y})
                    snapPoints.push(snapPoint = {x:this.x,y:this.y - 80})
                    this.snapCreated = true;
                }

                break;
            case 9:
                ellipse(this.x, this.y, 25);
                ellipse(this.x - 10, this.y + 5, 25);
                ellipse(this.x - 20, this.y + 10, 25);
                ellipse(this.x - 30, this.y + 15, 25);
                ellipse(this.x - 40, this.y + 20, 25);
                if(!this.snapCreated){
                    snapPoints.push(snapPoint = {x:this.x,y:this.y})
                    snapPoints.push(snapPoint = {x:this.x - 40,y:this.y + 20})
                    this.snapCreated = true;
                }
                break;
            case 10:
                ellipse(this.x, this.y, 25);
                ellipse(this.x - 10, this.y - 5, 25);
                ellipse(this.x - 20, this.y - 10, 25);
                ellipse(this.x - 30, this.y - 15, 25);
                ellipse(this.x - 40, this.y - 20, 25);
                if(!this.snapCreated){
                    snapPoints.push(snapPoint = {x:this.x,y:this.y})
                    snapPoints.push(snapPoint = {x:this.x - 40,y:this.y - 20})
                    this.snapCreated = true;
                }
                break;
            case 11:
                fill(255, 0, 0);
                ellipse(this.x, this.y, 25);
                break;
            case 12:
                fill(0, 127, 0);
                ellipse(this.x, this.y, 25);
                break;
            case 13:
                fill(0, 0, 127);
                ellipse(this.x, this.y, 15);
                break;
            case 14:
                fill(127, 0, 0);
                ellipse(this.x, this.y, 25);
                break;
            case 15:
                fill(255, 0, 255);
                ellipse(this.x, this.y, 45);
                break;
            case 16:
                fill(255, 0, 255);
                ellipse(this.x, this.y, 20);
                break;
            default:
                break;
        }
    }
}



function changeCourser(id){
    type = id;
}

function stopAlign(){
    verAlign = false;
    yAlign = [];
    xAlign = [];
    horAlign = false;
}

function toggleSnap(){
    if(snap){
        snap = false;
    }else{
        snap = true;
    }
}


function AlignHor(){
    horAlign = true;
    yAlign = [];
    for(var i = 0; i <= 10; i++){
        yAlign.push(360 / 10 * i);
    }
}


function AlignVer(){
    xAlign = [];
    for(var i = 0; i <= 20; i++){
        xAlign.push(1280 / 20 * i);
    }
    verAlign = true;
}


function generateText(){
    outputText = "";
    outputTextEnemies = "";
    for(var i = 0; i < objects.length; i++){
        objects[i].createText();
    }
}

function undo(){
    redoObjects.push(objects[objects.length-1]);
    var obj =  []
    for(var i = 0; i < objects.length-1; i++){
        obj.push(objects[i]);
    }
    objects = obj;
}

function redo() {
    if(redoObjects.length > 0) {
        objects.push(redoObjects[redoObjects.length - 1]);
        var obj = []
        for (var i = 0; i < redoObjects.length - 1; i++) {
            obj.push(redoObjects[i]);
        }
        redoObjects = obj;
    }
}

function newLevel(){
    objects = [];
    redoObjects = [];
    outputText = "";
    outputTextEnemies = "";
    snapPoints = [];
}

function setChallengeGoal(){
    objects.push(new ObstacleObject(0, 0, 17));
}

// Copy to clipboard example
document.querySelector("#visible-button").onclick = function() {
    // Select the content
    document.querySelector("#visible-input").select();
    // Copy to the clipboard
    document.execCommand('copy');
};
