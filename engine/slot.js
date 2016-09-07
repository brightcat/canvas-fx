var bc = (function () {
    var _bc = Object.create(null);
    _bc.Slot = (function () {
        return function (spec) {
            var sprites = spec.sprites;
            var IMG_HEIGHT = sprites.getHeight();
            var SIZE = sprites.size();
            
            var s = Object.create(null);
            var group = node.Group(spec);
            
            var LENGTH = SIZE * IMG_HEIGHT;
            var maxHeight = IMG_HEIGHT * 3;
            var slideInIdx = spec.slideInIdx || Math.floor(Math.random()*SIZE);
            var slideInPer = IMG_HEIGHT/LENGTH*(slideInIdx + .5);
            
            s.roll = function(r) {
                var size = r * LENGTH;
                var idx = Math.floor(size / IMG_HEIGHT) % SIZE;
                var sr = (size % IMG_HEIGHT) / IMG_HEIGHT;
                s.slotRoll(idx, sr);
            };
            
            s.slotRoll =function(_idx, r) {
                group.children = [];
                
                // 1
                var offset = IMG_HEIGHT * (1 + r);
                var dy = offset;
                var img = sprites.image(_idx);
                img.y = dy;
                group.children.push(img);
                
                // bottom idx + SIZE
                dy += img.height;
                var idx = (_idx + SIZE-1) % SIZE;
                img = sprites.image(idx);
                img.y = dy;
                var diff = maxHeight - dy;
                if (img.height > diff) {
                    img.height = maxHeight - dy;
                    img.s.height = diff;
                }
                group.children.push(img);
                
                // top idx + 1
                offset -= IMG_HEIGHT;
                idx = (_idx+1)%SIZE;
                img = sprites.image(idx);
                img.y = offset;
                group.children.push(img);
                
                var diffOffset = IMG_HEIGHT-offset;
                
                if (offset > 0) {
                    idx = (idx + 1) % SIZE;
                    img = sprites.image(idx);
                    img.y = 0;
                    img.s.y += diffOffset;
                    img.height = offset;
                    img.s.height = offset;
                    group.children.push(img);
                }
                
            };

            s.roll(slideInPer);
            s.position = function() {
                return slideInPer;
            };
            
            s.getPosition = function(idx) {
                var i = idx;
                var pos = i * IMG_HEIGHT / LENGTH;
                return pos;
            };
            
            s.distance = function(idx) {
                var idxPos = IMG_HEIGHT * (idx + .5);
                return slideInPer - (idxPos / LENGTH);
            };
            
            s.getNode = function () {
                return group;
            };

            return s;
        };
    })();
    
    _bc.Spin = (function() {
        return function(slot, duration, startPosition) {
            var a = Object.create(null);
            
            var running = false;
            var total = startPosition || slot.position();
            var stopping = false;
            var pos;
            var _resolve;
            
            a.update = function(delta) {
                total += delta / duration;
                var e = 1 - total;
                if (e < 0.000001) {
                    total = 0;
                } 
                if (stopping) {
                    var ne = Math.abs(pos - total);
                    if (ne < 0.0001) {
                        total = pos;
                        running = false;
                        stopping = false;
                        _resolve(total);
                        _resolve = null;
                    }
                }
                slot.roll(total);
            };
            
            a.stopOn = function(idx) {
                pos = slot.getPosition(idx);
                stopping = true;
                var p = new Promise(function(resolve, reject) {
                    _resolve = resolve;
                });
                
                return p;
            };
            
            a.reset = function() {
                total = 0;
            };
            
            a.isPlaying = function() {
                return running;
            };
            
            a.play = function() {
                running = true;
            };
            
            a.stop = function() {
                running = false;
            };
            
            a.slot = function() {
                return slot;
            };
            
            return a;
        };
    })();

    _bc.StopOn = function(slot, idx, duration) {
        var a = Object.create(null);
        
        var running = false;
        
        a.play = function() {
            running = true;
        };
        
        a.stop = function() {
            running = false;
        };
        
        a.isPlaying = function() {
            return running;
        };
        
        return a;
    };
    
    return _bc;
})();
