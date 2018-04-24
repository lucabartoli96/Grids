
( function () {
    
    var pow = Math.pow,
        sqrt = Math.sqrt,
        abs = Math.abs,
        floor = Math.floor,
        ceil = Math.ceil,
        round = Math.round,
        min = Math.min,
        max = Math.max;

    var d, d_q, d_r, delta, monge;
    
    //Manhattan distance functions
    
    function manhattan_distance(x, y, i, j) {
        return abs(x-i) + abs(y-j);
    }
    
    function manhattan_cost(n, m, x, y) {
        return m*pow(x, 2) + n * pow(y, 2) - (n - 1) * m * x - n * (m - 1) * y + m * n * (n + m - 2) /2;
    }
    
    //Euclid distance functions
    
    function euclid_distance(x, y, i, j) {
        return sqrt(pow(x - i, 2) + pow(y - j, 2));
    }
    
    function euclid_cost(n, m, x, y) {
        
        var s = 0;
        
        for (let i = 0; i < n; i++) {
            let a = pow(x - i, 2);
            for (let j = 0; i < m; j++) {
                let b = pow(y-j, 2);
                s += sqrt(a + b);
            }
        }
        
        return s;
    }
    
    //EM grids functions
    
    function EM_cost(n, m, k, x, y) {

        var manhattan_zone = (n * (m - k) * (m - k - 1)) / 2,
            row_manhattan = (m - k),
            euclid_card = n * k,
            min = Number.POSITIVE_INFINITY,
            s3 = 0;

        if ( y < k ) {

            let s1 = 0,
                s2 = 0,
                b = pow(y - k, 2);

            for (let i=0; i < n ; i++) {

                let a = pow(x - i, 2);

                for (let j = 0 ; j < k ; j++ ) {

                    let c = pow(y - j, 2);
                    s1 += sqrt(a + c);

                }

                s2 += sqrt(a + b);
            }

            return s1 + row_manhattan * s2 + manhattan_zone;

        } else {           

            for (let i=0; i < n; i++) {

                let a = pow((x - i), 2); 

                for (let j=0; j < k ; j++) {

                    let b = pow(k - j, 2);
                    s3 += sqrt(a + b);

                }
            }
            
            var s4 = manhattan_cost(n, m - k, x, y - k);
            
            return euclid_card * (y - k) + s3 + s4;

        }
    }
    
    function brute_force(n, m, k) {
        
        d = [];

        var manhattan_zone = (n * (m - k) * (m - k - 1)) / 2,
            row_manhattan = (m - k),
            euclid_card = n * k,
            min = Number.POSITIVE_INFINITY,
            med = {
                i: null,
                j: null
            },
            s3 = 0,
            trasmission = 0;

        for (let x=0; x < n ; x++) {

            d.push([]);
            
            s3 = 0;

            for (let i=0; i < n; i++) {

                let a = pow((x - i), 2); 

                for (let j=0; j < k ; j++) {

                    let b = pow(k - j, 2);
                    s3 += sqrt(a + b);

                }
            }

            for (let y = 0; y < m ; y++) {

                if ( y < k ) {

                    let s1 = 0,
                        s2 = 0,
                        b = pow(y - k, 2);

                    for (let i=0; i < n ; i++) {

                        let a = pow(x - i, 2);

                        for (let j = 0 ; j < k ; j++ ) {

                            let c = pow(y - j, 2);
                            s1 += sqrt(a + c);

                        }

                        s2 += sqrt(a + b);
                    }
                    
                    trasmission = s1 + row_manhattan * s2 + manhattan_zone;

                } else {           
                    
                    var s4 = manhattan_cost(n, m - k, x, y - k);
                    trasmission = euclid_card * (y - k) + s3 + s4;

                }

                d[x].push(trasmission);
                
                if ( trasmission < min ) {

                    min = trasmission;
                    med.i = x;
                    med.j = y;

                }
            }

        }

        return med;
    }
    
    function subtraction(n, m, k, p, D) {
        var v = 0;
        
        for( let j = 0; j <= k-p-1; j++) {
            v += D[j] - D[j+p+1];
        }
        
        v += (m-k)*D[k-p];
        v += floor((n-1)/2)*ceil((n-1)/2)*(m-k);
        v += n*(floor((m-1)/2)-k)*(ceil((m-1)/2)-k);
        v -= (m-k)*n*(n - 1)/2;
        
        return v;
    }
        
    function median_EM_grid(n, m, k) {
        
        var D = [];
        
        let row = floor((n-1)/2),
            C = d[row];
        
        for(let j = 0; j <= k; j++) {
            
            let sq_j = j*j,
                sum = 0;
            
            for(let i = 1; i <= row; i++) {
                sum += sqrt(i*i + sq_j);
            }
            
            D.push(j + 2*sum + ((n+1)%2)*(sqrt(n*n + 4*sq_j)/2));
        }
        
        
        var delta = function (y) {
            return D[y+1] - D[k-y-1] + (m-k)*(D[k-y-1] - D[k-y]);
        }
        
        var a = floor(k/2),
            b = min(k-1, floor(m/2)),
            p = NaN;
        
        do {
            
            p = floor((a+b)/2);
            
            if(delta(p-1) < 0) {
                if(delta(p) < 0) {
                    a = p+1;    
                } else {
                    a = b + 1;
                }                
            } else {
                b = p-1;
            }
            
        } while(a <= b);
        
        
        if ( k > floor((m-1)/2)) {
            return p;
        } else {
            
            if (subtraction(n, m, k, p, D)) {
                return floor((m-1)/2);
            } else {
                return p;
            }
            
        }

    }
    
    
    window.onload = function () {
        "use strict";

        var canvas = document.getElementsByTagName("canvas")[0];

        var grid = new Grid(canvas);

        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        
        var inputs = document.getElementsByTagName("input");

        ["n", "m", "k"].forEach(function(key) {

            inputs[key]
                .addEventListener("input", function(evt) {
                    grid[key] = Number(inputs[key].value);
                    grid.median = brute_force(grid.n, grid.m, grid.k);
                    
                    let p = median_EM_grid(grid.n, grid.m, grid.k);
 
            });

        });
        
        
        var pixels = document.getElementsByName("pixels")[0];
        
        pixels
            .addEventListener("input", function(evt) {
                grid.w = pixels.value;
            });


        grid.addEventListener("move", function (evt) {

                var i = evt.cell.i,
                    j = evt.cell.j;
            
                //DO SOMETHING WITH i and j

        });
    };
    
}() );
