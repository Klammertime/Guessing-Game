"use strict";

var Engine = (function(global) {
  var doc = global.document,
      win = global.window,
      canvas = doc.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      lastTime;

  canvas.width = 800;
  canvas.height = 800;
  canvas.id = 'board';

  doc.getElementById('snowScene').appendChild(canvas);

  function main() {
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
    update(dt); // this will be flakeTimer
    render(); // this will be Draw()
    lastTime = now;
    win.requestAnimationFrame(main);
  }

  function init() {
    lastTime = Date.now();
    main();
  }

  function update(dt) {
    updateFlakes(dt);
  }

  function updateFlakes(dt) {
   allFlakes.forEach(function(flake) {
            flake.update(dt);
    });
  }

function blank (){
  ctx.fillStyle = "#330033";
        ctx.fillRect(0,0,ctx.canvas.width,
          ctx.canvas.height);
}
  // TODO: put window here and put this in renderFlakes,
  // then call renderFlakes at bottom
  function render() {
blank();
        ctx.fillRect(25,25,100,100);
    // ctx.clearRect(45,45,60,60);
    allFlakes.forEach(function(flake) {
      flake.render();
    });

    ctx.strokeRect(0,0,750,750);
  }


  Resources.load([
    'ZenBG.png'
  ]);

  Resources.onReady(init);

  global.ctx = ctx;
})(this);