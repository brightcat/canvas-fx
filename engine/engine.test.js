(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var engine = Engine(ctx, canvas.width, canvas.height, window.requestAnimationFrame);
    
    var r1 = {
        _type: 'rect',
        x: 20, y: 20, width: 100, height: 100,
        fill: 'rgb(48, 48, 152)'
    };
    var r2 = {
        _type: 'rect',
        x: 200, y: 20, width: 80, height: 100,
        fill: 'rgb(48, 152, 48)'
    };
    
    function Group(nodes) {
        var max = {w:0,h:0};
        nodes.forEach(function(n) {
            if (n.x + n.width > max.w) {
                max.w = n.width + n.x;
            }
            if (n.y + n.height > max.h) {
                max.w = n.y + n.height
            }
        });
        var g = {
            _type: 'group',
            x:0,y:0,width:max.w,height:max.h,
            children: nodes
        };
        return g;
    }
    
    var group = Group([r1, r2]);
    
    var SimpleRectRenderer = {
        render: function(ctx, node) {
            ctx.fillStyle = node.fill;
            ctx.fillRect(node.x, node.y, node.width, node.height);
        }
    };
    var SimpleGroupRenderer = {
        render: function(ctx, group) {
            ctx.translate(group.x, group.y);
        }
    }
    
    var animation = {
        playing: false,
        duration: 5000,
        from: 20,
        to: 700,
        node: group,
        
        isPlaying: function() {
            return this.playing;
        },
        update: function(delta) {
            var moved = (this.to - this.from) * delta / this.duration;
            this.node.x += moved;
            if (this.node.x >= this.to) {
                this.node.x = this.to;
                this.playing = false;
            }
        },
        play: function() {
            this.playing = true;
        },
        reset: function() {
            this.node.x = this.from;
        },
        stop: function() {
            this.playing = false;
            
        }
    }
    
    engine.addRenderer('rect', SimpleRectRenderer);
    engine.addRenderer('group',SimpleGroupRenderer);
    engine.addAnimation(animation);
    engine.addNode(group);
    
    engine.start();
    window.engine = engine;
    window.animation = animation;
})();
