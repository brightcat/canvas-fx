var bc = (function () {
    var _bc = Object.create(null);

    function Dim(x,y,width,height) {
        var dim = Object.create(null);
        dim.x = x;
        dim.y = y;
        dim.width = width;
        dim.height = height;
        return dim;
    };
    _bc.Type = (function () {
        var type = Object.create(null);

        type.GROUP = 1;
        type.IMAGE = 2;
        type.SLOT = 3;
        return type;
    })();

    _bc.Node = (function () {
        return function (type, x, y, width, height) {
            var node = Dim(x,y,width,height);
            node._type = type;
            return node;
        };
    })();

    var Type = _bc.Type;
    var Node = _bc.Node;
    
    _bc.Image = (function () {
        return function (image, x, y, width, height) {
            var _image = Node(Type.IMAGE, x, y, width, height);
            _image.image = image;
            _image.s = Dim(x,y,width,height);
            return _image;
        };
    })();

    _bc.Group = (function () {
        return function (g) {
            var _g = Node(Type.GROUP);
            g = g || Object.create(null);
            _g.children = g.children || [];
            _g.x = g.x || 0;
            _g.y = g.y || 0;
            return _g;
        };
    })();



    _bc.SpriteSheet = (function () {
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
                var io = bc.Image(img, 0, 0, width, height);
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

    _bc.Slot = (function () {
        return function (spec) {
            var sprites = spec.sprites;
            var IMG_HEIGHT = sprites.getHeight();
            var SIZE = sprites.size();
            
            var s = Object.create(null);
            s._type = Type.SLOT;
            var group = bc.Group(spec);
            
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

    return _bc;
})();

