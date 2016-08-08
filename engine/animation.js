var animation = (function () {
    var a = Object.create(null);
    
    a.Value = (function() {
        return function(node, duration, value, from, to) {
            var v = Object.create(null);
            
            var distance = to - from;
            var running = false;
            var right = distance > 0;
            
            node[value] = from;
            
            v.update = function(delta) {
                var movement = distance * delta / duration;
                node[value] += movement;
                if ((right && node[value] >= to) || (!right && node[value] <= to)) {
                    running = false;
                }
            };
            
            v.isPlaying = function() {
                return running;
            };
            
            v.play = function() {
                running = true;
            };
            
            v.stop = function() {
                running = false;
            }
            
            return v;
        };
    })();
    
    return a;
})();
