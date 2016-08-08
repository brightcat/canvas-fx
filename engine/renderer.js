var renderer = (function() {
    var r = Object.create(null);
    
    r.Image = (function() {
        return function() {
            var _img = Object.create(null);
            
            _img.render = function(ctx, img) {
                ctx.translate(img.x, img.y);
                ctx.drawImage(img.image, img.s.x, img.s.y, img.s.width, img.s.height, 0, 0, img.width, img.height);
            };
            
            return _img;
        };
    })();
    
    r.Group = (function() {
        return function() {
            var g = Object.create(null);
            g.render = function(ctx, group) {
                ctx.translate(group.x, group.y);
            };
            return g;
        };
    })();
    
    r.Rectangle = (function() {
        return function() {
            var r = Object.create(null);
            
            r.render = function(ctx, rect) {
                ctx.translate(rect.x, rect.y);
                if (rect.fill) {
                    ctx.fillStyle = rect.fill;
                }
                ctx.fillRect(0, 0, rect.width, rect.height);
            };
            
            return r;
        };
    })();
    
    return r;
})();
