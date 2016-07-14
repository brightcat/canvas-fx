var engine = engine || Object.create(null);
engine.canvas = engine.canvas || Object.create(null);

engine.canvas.Engine = function(ctx, WIDTH, HEIGHT, requestFrame) {
    var e = Object.create(null),
        prev = 0,
        animations = [],
        nodes = [];
    
    e.render = engine.canvas.Render(ctx);
    e.animation = engine.canvas.Animation(e);
    
    e.draw = function(node) {
        e.render[node._type](node);
    };
    
    e.clear = function() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    };
    
    e.drawFrame = function(el) {
        var spf =  el - prev;
        prev = el;
        animations.forEach(function(a) {
            if (a.isPlaying()) {
                a.update(spf);
            }
        });
        
        e.clear();
        
        nodes.forEach(function(n) {
            e.draw(n);
        });
        
        requestFrame(e.drawFrame);
    };
    
    e.addNode = function(node) {
        nodes.push(node);
    };
    
    e.addAnimation = function(animation) {
        animations.push(animation);
    };
    
    e.removeAnimation = function(a) {
        var idx = animations.indexOf(a);
        if (idx > -1) {
            animations.splice(idx, 1);
        }
    };
    
    return e;
};

