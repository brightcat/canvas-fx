var bc = (function () {
    var _bc = Object.create(null);

    _bc.Slot = (function () {
        return function (spec) {
            var sprites = spec.sprites;
            var IMG_HEIGHT = sprites.getHeight();
            var SIZE = sprites.size();
            
            var s = Object.create(null);
            var group = node.Group(spec);
            
            var length = SIZE * IMG_HEIGHT;
            var maxHeight = IMG_HEIGHT * 3;
            var slideInIdx = spec.slideInIdx || SIZE - 1;
            var slideInPer = 0.0;
            
            console.log(length, maxHeight, slideInIdx, slideInPer, IMG_HEIGHT, SIZE);

            s.roll = function (per) {
                var dy = 0;
                group.children = [];
                var offset = length * per;
                slideInIdx = Math.floor(offset / IMG_HEIGHT) % SIZE;
                slideInPer = per * SIZE - slideInIdx;
                slideInIdx = SIZE - 1 - slideInIdx;
                
                console.log(offset + " => " + slideInIdx + " => " + slideInPer);
                
                var h = maxHeight;
                var img;
                var idx = (slideInIdx + 1) % SIZE;
                
                if (slideInPer > 0) {
                    var diff = IMG_HEIGHT * slideInPer;
                    img = sprites.image(slideInIdx);
                    img.s.height = diff;
                    img.height = diff;
                    img.s.y += IMG_HEIGHT - diff;
                    img.y = dy;
                    group.children.push(img);
                    h -= diff;
                    dy += diff;
                }
                
                while (h > 0) {
                    img = sprites.image(idx);
                    if (h < IMG_HEIGHT) {
                        img.s.height = h;
                        img.height = h;
                    } else {
                        img.s.height = IMG_HEIGHT;
                    }
                    img.y = dy;
                    dy += img.s.height;
                    idx = (idx + 1) % SIZE;
                    h -= img.s.height;
                    group.children.push(img);
                };
                
                console.log(group.children);
            };
            s.roll(0);

            s.getNode = function () {
                return group;
            };

            return s;
        }
    })();
    
    _bc.Spin = (function() {
        return function(slot, duration, startPosition) {
            var a = Object.create(null);
            
            var running = false;
            var total = startPosition;
            
            a.update = function(delta) {
                total += delta / duration;
                var e = 1 - total;
                if (e < 0.000001) {
                    total = 0;
                }
                slot.roll(total);
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
            
            return a;
        };
    })();

    return _bc;
})();

