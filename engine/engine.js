var Engine = (function() {
    return function(ctx, WIDTH, HEIGHT, frame) {
        var e = Object.create(null);
        
        var animations = [];
        var renderers = Object.create(null);
        var nodes = [];
        var running = false;
        var prev = 0;
        
        function animate(elapsed) {
            if (!running) {
                return;
            };
            frame(animate);
            
            var delta = elapsed - prev;
            prev = elapsed;
            
            animations.forEach(function(a) {
                if (a.isPlaying()) {
                    a.update(delta);
                }
            });
            
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            function render (n) {
                ctx.save();
                renderers[n._type].render(ctx, n);
                if (n.children && n.children.length > 0) {
                    n.children.forEach(render);
                }
                ctx.restore();
            }
            nodes.forEach(render);
        };
        
        e.start = function() {
            if (running) return;
            running = true;
            frame(animate);
        };
        
        e.stop = function() {
            running = false;
        };
        
        e.addNode = function(n) {
            nodes.push(n);
        };
        
        e.addAnimation = function(a) {
            animations.push(a);
        };
        
        e.addRenderer = function(type, r) {
            renderers[type] = r;
        };
        
        return e;
    };
})();
