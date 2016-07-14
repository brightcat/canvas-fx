var engine = engine || Object.create(null);
engine.canvas = engine.canvas || Object.create(null);
engine.canvas.Animation = function (_engine) {
    var _a = Object.create(null);
    _a.cycle = Object.create(null);
    _a.cycle.Infinite = -1;
    
    function baseAnimation(a) {
        var o = Object.create(null),
                playing = false,
                elapsedTime = 0,
                cycle = a.cycle || 1;

        o.isPlaying = function () {
            return playing;
        };

        o.play = function () {
            playing = true;
        };

        o.stop = function () {
            playing = false;
        };

        o.reset = function () {
            elapsedTime = 0;
            a.node[a.value] = a.from;
        };

        o.setElapsedTime = function (time) {
            elapsedTime = time;
        };

        o.getElapsedTime = function () {
            return elapsedTime;
        };

        o.addTime = function (time) {
            elapsedTime += time;
        };

        _engine.addAnimation(o);
        return o;
    }
    
    _a.Value = function (a) {
        if (!a.duration) {
            throw "duration must be set " + a;
        }
        var o = baseAnimation(a),
                total = a.to - a.from,
                duration = a.duration,
                value = a.from,
                cycleCount = 1,
                isInfiniteCycle = a.cycle === _a.cycle.Infinite;
        a.node[a.value] = value;

        o.update = function (time) {
            var delta;
            o.addTime(time);
            delta = o.getElapsedTime() / duration;
            value = delta * total;
            if (o.isDone()) {
                value = total;
                if (isInfiniteCycle) {
                    value = a.from;
                    o.setElapsedTime(0);
                } else if (a.cycle >= cycleCount) {
                    o.stop();
                } else {
                    cycleCount += 1;
                }
            }
            a.node[a.value] = value;
        };

        o.isDone = function () {
            return value >= total;
        };

        return o;
    };
    _a.Sequence = function (as) {
        var o = Object.create(null),
                freset = function (a) {
                    a.reset();
                },
                idx = 0,
                playing = false;


        o.play = function () {
            playing = true;
            if (!o.isDone()) {
                playing = true;
                as[idx].play();
            }
        };
        o.reset = function () {
            as.forEach(freset);
            idx = 0;
        };
        o.stop = function () {
            playing = false;
            as[idx].stop();
        };
        o.isPlaying = function () {
            return playing;
        };

        o.update = function (time) {
            if (!o.isDone()) {
                var a = as[idx];

                if (a.isDone()) {
                    idx++;
                    return;
                }
                a.update(time);
            }
        };

        o.isDone = function () {
            return idx >= as.length;
        };

        _engine.addAnimation(o);
        as.forEach(function (a) {
            _engine.removeAnimation(a);
        });
        return o;
    };

    _a.Parallel = function (as) {
        var o = Object.create(null),
                fplay = function (a) {
                    a.play();
                },
                fstop = function (a) {
                    a.stop();
                },
                freset = function (a) {
                    a.reset();
                };

        o.play = function () {
            as.forEach(fplay);
        };

        o.reset = function () {
            as.forEach(freset);
        };

        o.stop = function () {
            as.forEach(fstop);
        };

        o.isPlaying = function () {
            var i;
            for (i in as) {
                if (as[i].isPlaying()) {
                    return true;
                }
            }
            return false;
        };

        o.update = function (time) {
            as.forEach(function (a) {
                a.update(time);
            });
        };

        _engine.addAnimation(o);
        as.forEach(function (a) {
            _engine.removeAnimation(a);
        });

        return o;
    };
    return _a;
};