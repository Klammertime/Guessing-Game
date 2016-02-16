"use strict";

var allFlakes = [],
    Flake,
    flake;

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
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
};

flake = new Flake();

// instead of addFlake
Flake.prototype.createCollection = function() {

    for(var i = 0; i < 200; i++){

      allFlakes.push(new Flake());




    }
};

flake.createCollection();

Flake.prototype.update = function(dt) {
  var futureX = this.x,
      futureY = this.y,
      ctxHeight = ctx.canvas.height,
      ctxWidth = ctx.canvas.width,
      flakeCollectionLength = 200;
  for (var i = 0; i < flakeCollectionLength; i++) {
    if (this.y < ctxHeight) {
      this.y += (this.speed * dt)/300;
      if (this.y > ctxHeight) {
        this.y = -5;
      }
      this.x += this.drift/300;
      if(this.x > ctxWidth) {
        this.x = 0;
      }
    }
  }
};

