(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var engine = Engine(ctx, canvas.width, canvas.height, window.requestAnimationFrame);
    var image = new Image();
    image.src = 'img/test.png';
    var sprites = node.SpriteSheet(image,4,2,750/4,350/2);
    
    var slot1 = bc.Slot({sprites:sprites,x:20,y:20});
    var slot2 = bc.Slot({sprites:sprites,x:200, y:20});
    var slot3 = bc.Slot({sprites:sprites, x:400, y:20});
    var slots = [slot1, slot2, slot3];
    var anim1 = bc.Spin(slot1, 2000, 0);
    var anim2 = bc.Spin(slot2, 2000, 0);
    var anim3 = bc.Spin(slot3, 2000, 0);
    var anims =[anim1,anim2,anim3];
    
    var imageRenderer = renderer.Image();
    var groupRenderer = renderer.Group();
    engine.addRenderer(node.Type.IMAGE, imageRenderer);
    engine.addRenderer(node.Type.GROUP, groupRenderer);
    engine.addRenderer(node.Type.RECTANGLE, renderer.Rectangle());

    anims.forEach(function(a, idx) {
        engine.addAnimation(a);
    });

    slots.forEach(function(slot) {
        engine.addNode(slot.getNode());
    });
    
    window.engine = engine;
    engine.start();// setInterval(function() { engine.stop(); }, 50);
    window.slot1 = slot1;
    window.anims = anims;
    window._start = function() {
        anims.forEach(function(a, i) {
            var id = setInterval(function() {
                a.play();
                clearInterval(id);
            }, i * 500);
        });
    };
    window._stop = function() {
        anims.forEach(function(a) {
            a.stop();
        });
    };
})();
