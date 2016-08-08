var node = (function() {
    var n = Object.create(null);
    
    function Dim(x,y,width,height) {
        var dim = Object.create(null);
        dim.x = x;
        dim.y = y;
        dim.width = width;
        dim.height = height;
        return dim;
    };
    
    n.Type = (function () {
        var type = Object.create(null);

        type.GROUP = 1;
        type.IMAGE = 2;
        type.RECTANGLE = 3;
        return type;
    })();

    n.Node = (function () {
        return function (type, x, y, width, height) {
            var node = Dim(x,y,width,height);
            node._type = type;
            return node;
        };
    })();

    var Type = n.Type;
    var Node = n.Node;
    
    n.Image = (function () {
        return function (image, x, y, width, height) {
            var _image = Node(Type.IMAGE, x, y, width, height);
            _image.image = image;
            _image.s = Dim(x,y,width,height);
            return _image;
        };
    })();
    
    n.Rectangle = (function() {
        return function(x, y, w, h) {
            var r = Node(Type.RECTANGLE, x, y, w, h);
            return r;
        };
    })();

    n.Group = (function () {
        return function (g) {
            var _g = Node(Type.GROUP);
            g = g || Object.create(null);
            _g.children = g.children || [];
            _g.x = g.x || 0;
            _g.y = g.y || 0;
            return _g;
        };
    })();

    n.SpriteSheet = (function () {
        return function (img, cols, rows, width, height) {
            var p = new Promise(function (resolve, reject) {
                img.onload = function () {
                    resolve(img);
                };
                img.onerror = function (e) {
                    console.log(e);
                    alert(e);
                    reject(e);
                }
            });

            var _size = cols * rows;
            var s = Object.create(null);
            
            s.getHeight = function() {
                return height;
            };
            s.getWidth = function(){ 
                return width;
            };
            s.image = function (idx) {
                var ix = idx % cols;
                var iy = Math.floor(idx / cols);
                var io = node.Image(img, 0, 0, width, height);
                io.s.x = ix * width;
                io.s.y = iy * height;
                io.s.width = width;
                io.s.height = height;
                return io;
            };

            s.size = function () {
                return _size;
            };

            p.then(function (img) {}).catch(function (e) {
                console.log(e);
            });

            return s;
        }
    })();

    return n;
})();  
