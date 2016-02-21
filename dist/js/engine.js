'use strict';

var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    var img = new Image();

    img.onload = function() {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
    };

    img.src = 'images/livingRoomRedBlack1100.png';

    //TODO: figure out if want to use this way, to use Resources.get, prob do
    // function createRoom() {
    //     ctx.drawImage(Resources.get('images/roomRed2.png'), 0, 0, ctx.canvas.width, ctx.canvas.height);
    // }

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

    function render() {
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
    global.canvas = canvas;
})(this);