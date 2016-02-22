'use strict';

var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    // var img = new Image();

    // img.onload = function() {
        canvas.width = 1000;
        canvas.height = 700;
        // ctx.drawImage(img, 0, 0);
    //     room.render();
    // };

    // img.src = 'images/livingRoomRedBlack1100.png';

    canvas.id = 'respondCanvas';

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

    function render() {
        room.render();

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
        'images/livingRoom1000.png',
        'images/window1000.png',
        'images/livingRoom2000.png',
        'images/livingRoom3000.png',
        'images/window2000.png'
    ]);

    Resources.onReady(init);

    global.ctx = ctx;
    global.canvas = canvas;

})(this);

