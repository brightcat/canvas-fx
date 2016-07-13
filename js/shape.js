var shape = shape || Object.create(null);
shape.Node = function(r) {
    var o = Object.create(null);
    o._type = 'node';
    o.x = r.x;
    o.y = r.y;
    o.width = r.width;
    o.height = r.height;
    o.centerX = o.width/2;
    o.centerY = o.height/2;
    o.radians = r.radians;
    o.fill = r.fill;
    o.stroke = r.stroke;
    o.strokeWidth = (r.stroke && r.strokeWidth) || 1;
    o.children = r.children || [];
    
    return o;
};

shape.Circle = function(r) {
    r.width = r.radius * 2;
    r.height = r.width;
    var node = shape.Node(r);
    node.radius = r.radius;
    node.centerX = r.x;
    node.centerY = r.y;
    node._type = 'circle';
    
    return node;
};

shape.Rectangle = function(r) {
    var node = shape.Node(r);
    node._type = 'rectangle';
    
    return node;
};

shape.Line = function(l) {
    var node = shape.Node(l);
    node._type = 'line';
    node.x2 = l.x2 || l.width;
    node.y2 = l.y2 || l.height;
    
    return node;
};

shape.Image = function(i) {
    var node = shape.Node(i);
    node._type='image';
    node.sx = i.sx || 0;
    node.sy = i.sy || 0;
    node.swidth = i.swidth || node.width;
    node.sheight = i.sheight || node.height;
    node.image = i.image;
    
    return node;
};