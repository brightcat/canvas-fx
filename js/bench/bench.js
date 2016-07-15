(function() {
    var canvas = document.getElementById('canvas'),
        WIDTH = canvas.width,
        HEIGHT = canvas.height,
        ctx = canvas.getContext('2d'),
        btnStop = document.getElementById('btnStop'),
        btnAdd = document.getElementById('btnAdd'),
        btnRemove = document.getElementById('btnRemove'),
        btnReset = document.getElementById('btnReset'),
        txtFps = document.getElementById('txtFps'),
        txtBalls = document.getElementById('txtBalls');
        
    var NUMBER_OF_BALLS = 100,
        SPF = 1000/60,
        FULL_ARC = Math.PI*2,
        HALF_WIDTH = WIDTH/2,
        HALF_HEIGHT = HEIGHT/2,
        prev = 0,
        running = true,
        drawFrame = window.requestAnimationFrame,
        balls = [];
        
    btnStop.onclick = function(e) {
        running = !running;
        if (running) {
            btnStop.textContent = 'Stop';
            drawFrame(animate);
        } else {
            btnStop.textContent = 'Start';
        }
    };
    
    btnAdd.onclick = function(e) {
        var i = 0;
        for( ; i < NUMBER_OF_BALLS; i++ ){
            balls.push(createRandomBall());
        }
        txtBalls.textContent = balls.length;
    };
    
    btnRemove.onclick = function(e) {
        var i = 0;
        for (; i < NUMBER_OF_BALLS; i++) {
            balls.pop();
        };
        txtBalls.textContent = balls.length;
    };
    
    btnReset.onclick = function(e) {
        balls = []
        txtBalls.textContent = balls.length;
    };
    
    function random(bound) {
        return Math.round(Math.random()*bound);
    };
    
    function createRandomBall() {
        var b = Object.create(null);
        b.x = random(HALF_WIDTH-21) + HALF_WIDTH/2;
        b.y = random(HALF_HEIGHT-21) + HALF_HEIGHT/2;
        b.r = 20;
        b.color = 'rgb(' + [255,255,255].map(random).join(',') +')';
        b.vx = random(9) - 5;
        b.vy = random(9) - 5;
        while (b.vx === 0 && b.vy === 0) {
            b.vx = random(9) - 5;
            b.vy = random(9) - 5;
        }
        return b;
    }
    
    function updateBall(ball) {
        if(ball.x + ball.r + ball.vx > WIDTH || ball.x - ball.r + ball.vx < 0) {
            ball.vx = -ball.vx;
        }
        if (ball.y + ball.r + ball.vy > HEIGHT || ball.y - ball.r + ball.vy < 0) {
            ball.vy = -ball.vy;
        }
        
        ball.x += ball.vx;
        ball.y += ball.vy;
    }
    
    function drawBall(ball) {
        ctx.save();
        
        ctx.beginPath();
        ctx.translate(ball.x, ball.y);
        ctx.fillStyle = ball.color;
        ctx.arc(0,0,ball.r, 0, FULL_ARC);
        ctx.fill();
        
        ctx.restore();
    }
    
    function clear() {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
    }
    
    function render(ball) {
        updateBall(ball);
        drawBall(ball);
    }
    
    function animate(el) {
        var dur = el - prev;
        prev = el;
        
        var fps = Math.ceil(1000/dur);
        if (dur - SPF > 0.1) {
            txtFps.textContent = fps;
        } else if (txtFps.textContent !== fps) {
            txtFps.textContent = fps;
        }
        
        clear();
        balls.forEach(render);
        
        if (running) {
            drawFrame(animate);
        }
    }
    
    if (running) {
        drawFrame(animate);
    }
})();
