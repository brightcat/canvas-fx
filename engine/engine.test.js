(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var engine = Engine(ctx, canvas.width, canvas.height, window.requestAnimationFrame);
    
    var rect = {
        _type: 'rect',
        x: 20, y: 20, width: 100, height: 100,
        fill: 'rgb(48, 48, 152)'
    };
    
    var SimpleRectRenderer = {
        render: function(ctx, node) {
            ctx.fillStyle = node.fill;
            ctx.fillRect(node.x, node.y, node.width, node.height);
        }
    };
    
    var animation = {
        playing: false,
        duration: 5000,
        from: 20,
        to: 700,
        
        isPlaying: function() {
            return this.playing;
        },
        update: function(delta) {
            var moved = (this.to - this.from) * delta / this.duration;
            rect.x += moved;
            if (rect.x >= this.to) {
                rect.x = this.to;
                this.playing = false;
            }
        },
        play: function() {
            this.playing = true;
        },
        reset: function() {
            rect.x = this.from;
        },
        stop: function() {
            this.playing = false;
            
        }
    }
    
    engine.addRenderer('rect', SimpleRectRenderer);
    engine.addAnimation(animation);
    engine.addNode(rect);
    
    engine.start();
    window.engine = engine;
    window.animation = animation;
})();
