"use strict";

var canvasWidth = 500,
    canvasHeight = 400,
    allFlakes = [],
    Entity,
    Flake,
    flake,
    WindowPane,
    whiteWindow;

Entity = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

WindowPane = function(x, y, width, height, sprite) {
    Entity.call(this, x, y, width, height);
    this.sprite = 'images/justWindow.png';
    this.x = canvasWidth / 8;
    this.y = canvasHeight / 4;
    this.width = canvasWidth * 0.8;
    this.height = 318;
};

WindowPane.prototype = Object.create(Entity.prototype);

WindowPane.prototype.constructor = WindowPane;

whiteWindow = new WindowPane();

WindowPane.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

WindowPane.prototype.clip = function() {
    // create clipping region
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.clip();
    // create sky so less than window width and height
    ctx.fillStyle = "#330033";
    ctx.fillRect(this.x + 20, this.y, this.width - 40, this.height);
};

Flake = function() {
    this.x = Math.round(Math.random() * 800);
    this.y = Math.round(Math.random() * -800);
    this.drift = Math.random();
    this.speed = Math.floor((Math.random() * 100) + 1);
    this.width = (Math.random() * 3) + 2;
    this.height = this.width;
    this.maxFlakes = 200;
};

Flake.prototype.render = function() {
    var minFlakeX = whiteWindow.x + 20,
        maxFlakeX = whiteWindow.width + whiteWindow.x - 60;
    ctx.fillStyle = "white";
    if (this.x > minFlakeX && this.x < maxFlakeX) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

flake = new Flake();

Flake.prototype.createCollection = function() {
    for (var i = 0; i < 200; i++) {
        allFlakes.push(new Flake());
    }
};

flake.createCollection();

Flake.prototype.update = function(dt) {
    var futureX = this.x,
        futureY = this.y,
        maxY = canvasHeight,
        maxX = canvasWidth,
        flakeCollectionLength = this.maxFlakes;
    for (var i = 0; i < flakeCollectionLength; i++) {
        if (this.y < maxY) {
            this.y += (this.speed * dt) / 90;
            if (this.y > maxY) {
                this.y = -5;
            }
            this.x += this.drift / 600;
            if (this.x > maxX) {
                this.x = 0;
            }
        }
    }
};