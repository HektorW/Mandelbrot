(function() {

  var canvas, ctx;
  var w, h;

  var scalex, scaley;

  var iterations = 100;
  var palette = [];

  function init() {
    canvas = document.querySelector('canvas');
    w = canvas.width = 3000;//window.innerWidth;
    h = canvas.height = 2000;//window.innerHeight;
    ctx = canvas.getContext('2d');


    scalex = 3.5 / w;
    scaley = 2 / h;


    var dc = 256 / iterations;
    for(var i = iterations; i--; ) {
      palette.push('rgb(50,80,'+parseInt(i*dc, 10)+')');
    }
    palette[iterations] = 'black';
  }

  function render() {
    var px, py, x, y, i, j, xtemp, it;
    ctx.clearRect(0, 0, w, h);

    for(i = w; i--; ) {
      px = i * scalex - 2.5;
      for(j = h; j--; ) {
        py = j * scaley - 1;

        x = 0;
        y = 0;
        it = 0;
        while(x * x + y * y < 4 && it < iterations) {
          ++it;
          xtemp = x * x - y * y + px;
          y = 2 * x * y + py;
          x = xtemp;
        }
        ctx.fillStyle = palette[it];
        var z = Math.sqrt(x*x + y*y);
        ctx.fillStyle = 'rgb('+parseInt(it + 1 - Math.log(Math.log(Math.abs(z)))/Math.log(2), 10) + ',0,0)';
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }



  init();
  render();

}());