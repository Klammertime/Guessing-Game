"use strict";

var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 1100;
    canvas.height = 770;
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

    function createRoom() {
        ctx.drawImage(Resources.get('images/roomRed2.png'), 0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function render() {
        createRoom();
        whiteWindow.clip();
        allFlakes.forEach(function(flake) {
            flake.render();
        });
        whiteWindow.render();
    }

    Resources.load([
        'images/justWindow.png',
        'images/roomRed2.png',
        'images/northernSky.png',
        'images/livingRoomRedBlack1100.png',

    ]);

    Resources.onReady(init);

    global.ctx = ctx;
})(this);