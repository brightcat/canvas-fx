var bc = (function () {
    var _bc = Object.create(null);

    _bc.Type = (function () {
        var type = Object.create(null);

        type.GROUP = 1;
        type.IMAGE = 2;
        type.SLOT = 3;
        return type;
    })();

    _bc.Node = (function () {
        return function (type, x, y, width, height) {
            var node = Object.create(null);
            node.x = x;
            node.y = y;
            node.width = width;
            node._type = type;
            node.height = height;
            return node;
        };
    })();

    var Type = _bc.Type;
    var Node = _bc.Node;

    _bc.Image = (function () {
        return function (image, x, y, width, height) {
            var _image = Node(Type.IMAGE, x, y, width, height);
            _image.image = image;
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
                io.sx = ix * width;
                io.sy = iy * height;
                io.swidth = width;
                io.sheight = height;
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
            var s = Object.create(null);
            s._type = Type.SLOT;
            var sprites = spec.sprites;
            var group = bc.Group(spec);
            
            var length = sprites.size() * sprites.getHeight();
            var maxHeight = 350/2 * 3;
            var slideInIdx = spec.slideInIdx || 7;
            var slideInPer = 0.0;
            var IMG_HEIGHT = sprites.getHeight();
            var SIZE = sprites.size();
            
            console.log(length, maxHeight, slideInIdx, slideInPer, IMG_HEIGHT, SIZE);

            s.roll = function (per) {
                group.children = [];
                var offset = length * per;
                slideInIdx = Math.floor(offset / IMG_HEIGHT) % SIZE;
                slideInPer = per * SIZE - slideInIdx;
                
                console.log(offset + " => " + slideInIdx + " => " + slideInPer);
                
                var h = maxHeight;
                var img;
                var idx = (slideInIdx + 1) % SIZE;
                
                if (slideInPer > 0) {
                    var diff = IMG_HEIGHT * slideInPer;
                    img = sprites.image(slideInIdx);
                    img.sheight = diff;
                    img.sy += IMG_HEIGHT - diff;
                    group.children.push(img);
                    h -= diff;
                }
                
                while (h > 0) {
                    img = sprites.image(idx);
                    if (h < IMG_HEIGHT) {
                        img.sheight = h;
                    } else {
                        img.sheight = IMG_HEIGHT;
                    }
                    idx = (idx + 1) % SIZE;
                    h -= img.sheight;
                    group.children.push(img);
                };
                
                var offset = 350 / 2;
                group.children.forEach(function (i, idx) {
                    i.y = idx * offset;
                });
                
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

