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
            
//            console.log(length, maxHeight, slideInIdx, slideInPer, IMG_HEIGHT, SIZE);
            function updateSlide(per) {
                var offset = LENGTH * per;
                var idx = Math.floor(offset / IMG_HEIGHT) % SIZE;
                var inPer = per * SIZE - idx;
                idx = SIZE - 1 - idx;
//                console.log(offset + " => " + idx + " => " + inPer);
                return [idx,inPer];
            }

            s.roll = function (per) {
                var dy = 0;
                group.children = [];
                var slide = updateSlide(per);
                slideInIdx = slide[0];
                slideInPer = slide[1];
                
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
                
//                console.log(group.children);
            };
            s.roll(slideInPer);
            s.position = function() {
                return slideInPer;
            };
            
            s.getPosition = function(idx) {
                return ((idx + .5) * IMG_HEIGHT) / LENGTH;
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
            
            a.update = function(delta) {
                total += delta / duration;
                var e = 1 - total;
                if (e < 0.000001) {
                    total = 0;
                } else if (stopping) {
                    var ne = Math.abs(pos - total);
                    console.log("ne", ne);
                    if (ne < 0.01) {
                        total = pos;
                        running = false;
                        stopping = false;
                    }
                }
                slot.roll(total);
            };
            
            a.stopOn = function(idx) {
                pos = slot.getPosition(idx);
                stopping = true;
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
