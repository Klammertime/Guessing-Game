"use strict";

var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 500;
    canvas.height = 400;
    canvas.id = 'board';

    doc.getElementById('snowScene').appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
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

    function createWall() {
        var pattern = ctx.createPattern(Resources.get('images/ZenBG.png'), 'repeat');
        ctx.beginPath();
        ctx.fillStyle = "#2a1a0e";
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function render() {
        createWall();
        whiteWindow.clip();
        allFlakes.forEach(function(flake) {
            flake.render();
        });
        whiteWindow.render();
    }

    Resources.load([
        'images/ZenBG.png',
        'images/justWindow.png'
    ]);

    Resources.onReady(init);

    global.ctx = ctx;
})(this);