var renderer = (function() {
    var r = Object.create(null);
    
    r.Image = (function() {
        return function() {
            var _img = Object.create(null);
            
            _img.render = function(ctx, img) {
                ctx.translate(img.x, img.y);
                ctx.drawImage(img.image, img.sx, img.sy, img.swidth, img.sheight, 0, 0, img.width, img.height);
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
    
    return r;
})();
