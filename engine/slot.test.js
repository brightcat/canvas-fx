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
    var rect = node.Rectangle(20, 20, 80, 80);
    var anim = animation.Value(rect, 2000, 'x', 0, 700);
    
    var imageRenderer = renderer.Image();
    var groupRenderer = renderer.Group();
    engine.addRenderer(node.Type.IMAGE, imageRenderer);
    engine.addRenderer(node.Type.GROUP, groupRenderer);
    engine.addRenderer(node.Type.RECTANGLE, renderer.Rectangle());
    
    engine.addAnimation(anim);

    slots.forEach(function(slot) {
        engine.addNode(slot.getNode());
    });
    engine.addNode(rect);
    
    window.engine = engine;
    engine.start();// setInterval(function() { engine.stop(); }, 50);
    window.slot1 = slot1;
    window.anim = anim;
})();
