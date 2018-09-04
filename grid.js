
var Grid = (function() {

    var pow = Math.pow,
        sqrt = Math.sqrt,
        abs = Math.abs,
        floor = Math.floor,
        ceil = Math.ceil,
        round = Math.round,
        W = 20,
        Z = 20,
        DEFAULT_STYLE = undefined;

    var define = Object.defineProperty;

    function draw(canvas, ctx, m, n, k, median, w, pixels) {

        canvas.width = 2*Z + w * m;
        canvas.height = 2*Z + w * n;

        console.log(w);

        var bottom = pixels(n, m);

        ctx.beginPath();

        ctx.font= ceil(w/2) + "px Roboto";

        for (let i = 0; i <= n; i++) {

            let p = pixels(i, 0);

            if (/*w > 14 &&*/ i != n) {
              ctx.strokeText("" + i, 0, p.y + (13*w)/20);
              ctx.fillText("" + i, 0, p.y + (13*w)/20);
            }

            ctx.moveTo(p.x, p.y);
            ctx.lineTo(bottom.x, p.y);
        }

        for (let j = 0; j <= m ; j++) {

            let p = pixels(0, j);

            if (/*w > 14 &&*/ j != m) {
              ctx.strokeText("" + j, p.x + (6*w/20), w/2 + 30/w);
              ctx.fillText("" + j, p.x + (6*w/20),  w/2 + 30/w);
            }

            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, bottom.y);

        }

        ctx.stroke();

        // k^th column
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        var k_column = pixels(0, k);
        ctx.fillRect(k_column.x, k_column.y, w, n*w);

        // EM-median
        var median_pixels = pixels(median.i, median.j);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(median_pixels.x, median_pixels.y, w, w);

        ctx.fillStyle = DEFAULT_STYLE;
    }

    function highlight(ctx, i, j, w, pixels) {

        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        let p = pixels(i, j);
        ctx.fillRect(p.x, p.y, w, w);
        ctx.fillStyle = DEFAULT_STYLE;

    }

    function _Grid(_canvas, _n, _m, _k, _median, _w) {

        _n = _n || 0;
        _m = _m || 0;
        _k = _k || 0;
        _median = _median || undefined;
        _w = _w || W;


        var _move_callbacks = [],
            ctx = _canvas.getContext("2d");

        DEFAULT_STYLE = ctx.fillStyle;

        define(this, "canvas", {
            writable: false,
            value: _canvas
        });

        define(this, "n", {
            set: function(n) {
                _n = n;
                _median = undefined;
                invalidate();

            },
            get: function() {
                return _n;
            }
        });

        define(this, "m", {
            set: function(m) {
                _m = m;
                _median = undefined;
                invalidate();

            },
            get: function() {
                return _m;
            }
        });

        define(this, "k", {
            set: function(k) {
                _k = k;
                _median = undefined;
                invalidate();

            },
            get: function() {
                return _k;
            }
        });

        define(this, "median", {
            set: function(median) {
                _median = median;
                invalidate();

            },
            get: function() {
                return _median;
            }
        });


        define(this, "w", {
            set: function(w) {
                if (w >= 5 && w <= 35) {
                    _w = w;
                }
                invalidate();
            },
            get: function() {
                return _w;
            }
        });


        this.addEventListener = function(evt, callback) {

            if (evt == "move") {
                _move_callbacks.push(callback);
            } else {
              _canvas.addEventListener(evt, callback);
            }
        }


        indexes = function(x, y) {

            var canvas_top = _canvas.getBoundingClientRect().top,
                canvas_left = _canvas.getBoundingClientRect().left;

            x -= canvas_left + Z;
            y -= canvas_top + Z;

            var i = floor(y/_w),
                j = floor(x/_w);

            if ( i >= 0 && i < _n && j >= 0 && j < _m) {
                return {i: i, j: j};
            } else {
                return undefined;
            }
        }


        pixels = function (i, j) {
            return {
                x: Z + _w * j,
                y: Z + _w * i
            };
        }


        function invalidate() {
            if (!isNaN(_n) && !isNaN(_m) && !isNaN(_k) && _median) {
                draw(_canvas, ctx, _m, _n, _k, _median, _w, pixels);
            }
        }

        _canvas.addEventListener("mousemove", function(evt) {

            var u = indexes(evt.clientX, evt.clientY);

            if (u) {

                invalidate();
                highlight(ctx, u.i, u.j, _w, pixels);

                evt.cell = u

                for( let i = 0; i < _move_callbacks.length ; i++) {
                    _move_callbacks[i](evt);
                }

            }
        });

    }

    return _Grid;

})();
