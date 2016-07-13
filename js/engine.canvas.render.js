var engine = engine || Object.create(null);
engine.canvas = engine.canvas || Object.create(null);

engine.canvas.Render = function (ctx) {
    var render = Object.create(null),
        FULL_ARC = 2*Math.PI;

    function rotate(node) {
        ctx.translate(node.x + node.centerX, node.y + node.centerY);
        ctx.rotate(node.radians);
        ctx.translate(-node.centerX, -node.centerY);
    }
    
    render.rectangle = function(r) {
        ctx.save();
        
        if (r.radians) {
            rotate(r);
        } else {
            ctx.translate(r.x, r.y);
        }
        
        if (r.stroke) {
            ctx.beginPath()
            ctx.lineWidth = r.strokeWidth || ctx.strokeWidth;
            ctx.strokeStyle = r.stroke;
            ctx.rect(0, 0, r.width, r.height);
            ctx.stroke();
        }
        
        if (r.fill) {
            ctx.fillStyle = r.fill;
            ctx.fillRect(0, 0, r.width, r.height);
        }
        
        ctx.restore();
    };
    
    render.image = function(i) {
        ctx.save();
        
        if (i.radians) {
            rotate(i);
        } else {
            ctx.translate(i.x, i.y);
        }
        
        ctx.drawImage(i.image, i.sx, i.sy, i.swidth, i.sheight, 0, 0, i.width, i.height);
        
        ctx.restore();
    };
    
    render.circle = function(c) {
        ctx.save();
        
        ctx.translate(c.x, c.y);
        
        if (c.stroke) {
            ctx.beginPath();
            ctx.strokeStyle = c.stroke;
            ctx.lineWidth = c.strokeWidth;
        }
        ctx.arc(0, 0, c.radius, 0, FULL_ARC);
        if (c.stroke) {
            ctx.stroke();
        }
        
        if (c.fill) {
            ctx.fillStyle = c.fill;
            ctx.fill();
        }
        
        ctx.restore();
    };
    
    render.line = function(l) {
        ctx.save();
        
        ctx.translate(l.x, l.y);
        
        ctx.strokeStyle = l.stroke || ctx.strokeStyle;
        ctx.lineWidth = l.strokeWidth || ctx.lineWidth;
        
        ctx.beginPath();
        
        ctx.moveTo(0, 0);
        ctx.lineTo(l.x2 - l.x, l.y2 - l.y);
        
        ctx.stroke();
        
        ctx.restore();
    };
    
    return render;
}
