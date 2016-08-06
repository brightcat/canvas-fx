(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var engine = Engine(ctx, canvas.width, canvas.height, window.requestAnimationFrame);
    var image = new Image();
    image.src = 'img/test.png';
    var sprites = bc.SpriteSheet(image,4,2,750/4,350/2);
    
    var img1 = sprites.image(6);
    var img2 = sprites.image(0);
    var img3 = sprites.image(1);
    var images = [img1, img2, img3];
    var offset = 350/2;
    images.forEach(function(i,idx) {
        i.y = idx * offset;
    });
    var group = bc.Group({children:images});
    console.log(img1);
    
    var imageRenderer = renderer.Image();
    var groupRenderer = renderer.Group();
    console.log(imageRenderer);
    engine.addRenderer(bc.Type.IMAGE, imageRenderer);
    engine.addRenderer(bc.Type.GROUP, groupRenderer);
    engine.addNode(group);
    
    window.engine = engine;
    engine.start(); setInterval(function() { engine.stop(); }, 50);
})();
