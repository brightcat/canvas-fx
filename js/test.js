function main() {
    function getCanvasNode(id) {
        return document.getElementById(id);
    }
    function getCtx(canvasNode) {
        return canvasNode.getContext('2d');
    }
    
    function getEngine(ctx, width, height, frame) {
        return engine.canvas.Engine(ctx, width, height, frame);
    }
    
    function getRequestFrame() {
        return window.requestAnimationFrame;
    }
    
    console.log("start");
    
    var requestFrame = getRequestFrame();
    var canvasNode = getCanvasNode('canvas');
    var ctx = getCtx(canvasNode);
    var e = getEngine(ctx, canvasNode.width, canvasNode.height, requestFrame);
    
    var rect = shape.Rectangle({
        x:0,y:0,width:100,height:100,fill:'#000'
    });
    
    var circle = shape.Circle({
        x:50, y:50, radius: 50, stroke: '#2b2'
    });
    
    var i = 0;
    for (i=1; i<(canvasNode.width / 100)+1; i++ ) {
        var line = shape.Line({
            x:100*i, y:0, x2: 100*i, y2: canvasNode.height
        });
        e.addNode(line);
    }
    e.addNode(rect);
    
    requestFrame(e.drawFrame);
    
    var anim = e.animation.Value({
        from:0, to: 600,
        value:'x', node:rect,
        duration: 3000
    });
    
    var animy = e.animation.Value({
        from: 0, to: canvasNode.height-rect.height,
        node: rect, value:'y', duration: 2500
    });
    
    var animr = e.animation.Value({
        from: 0, to:2*Math.PI, duration: 1500, node:rect, value:'radians'
    });
    
//    animr.play();
    
    var sanim = e.animation.Sequence([anim, animr]);
    var panim = e.animation.Parallel([anim, animr]);
    panim.play();
    
    var binImage = new Image();
    var image = shape.Image({
        x:20, y:200, width:100, height:100, image: binImage
    });
    binImage.src = '../canvas/img/slot_machine_fruit.png';
    binImage.onload = function() {
        e.addNode(image);
        console.log("image loaded");
    };
//    
//    window.anim = anim;
//    window.animy = animy;
    window.sanim = sanim;
    window.panim = panim;
}
