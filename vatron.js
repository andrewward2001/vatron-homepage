let canvas = document.getElementById('up-canvas')
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth

let colors = []

let gradient = ctx.createLinearGradient(0,0,canvas.width,0)
gradient.addColorStop(0, 'rgb(115,102,72)')
gradient.addColorStop(1, 'rgb(158,134,81)')
colors.push(gradient)

gradient = ctx.createLinearGradient(0,0,canvas.width,0)
gradient.addColorStop(0, 'rgb(63,65,73)')
gradient.addColorStop(1, 'rgb(93,96,110)')
colors.push(gradient)

gradient = ctx.createLinearGradient(0,0,canvas.width,0)
gradient.addColorStop(0, 'rgb(116,179,32)')
gradient.addColorStop(1, 'rgb(146,207,65)')
colors.push(gradient)

gradient = ctx.createLinearGradient(0,0,canvas.width,0)
gradient.addColorStop(0, 'rgb(0,87,116)')
gradient.addColorStop(1, 'rgb(0,160,214)')
colors.push(gradient)

console.log(canvas.offsetWidth)
console.log(canvas.offsetHeight)

var i = 0;
function draw() {
  ctx.canvas.width = window.innerWidth
  for(var j = colors.length - 1; j >= 0; j--) {
    var offset = i + j*j*(.5*j) * Math.PI * 5;
                                         // |
                                         // layer variation
                                         // lower  -> layers more similar
                                         // (1     -> layers essentially identical (little to no crossover), but with point location determined by magnitude of j)
                                         // (5     -> 'sweet spot', layers more dissimilar from each other while still maintaining a good amount of separation)
                                         // (20    -> layers have a lot of crossover, lots of variation between layers)
                                         // higher -> layers more more apparently random (variated)
    ctx.fillStyle = (colors[j]);
    var randomLeftConstraint   = 200 + (25*j) + (Math.sin((offset/80)  + 1)  + 1) / 2 * 100;
    var randomRightConstraint  = 130 + (30*j) + (Math.sin((offset/70)  + 1)  + 1) / 2 * 100;
    var randomMidConstraint    = 50  + (40*j) + (Math.sin((offset/60)  + 2)  + 1) / 2 * 100;
    var randomLeft             = 30 + (30*j) + (Math.sin((offset/100) + 1)  + 1) / 2 * 100;
    var randomRight            = 100 + (Math.sin((offset/100) + 1)  + 1) / 2 * 100
    var randomLeftConstraint1  = (Math.sin((offset/60)  + 1)  + 1);
    var randomRightConstraint1 = (Math.sin((offset/60)  + 1)  + 1);
    var points = [
      {x: 0, y: (400 + (50 * randomRightConstraint1))},
      {x: canvas.width / 6, y: randomLeftConstraint},
      {x: canvas.width / 6 * 2, y: randomRightConstraint},
      {x: canvas.width /2, y: randomMidConstraint},
      {x: canvas.width / 6 * 4, y: randomLeft},
      {x: canvas.width / 6 * 5, y: randomRight},
      {x: canvas.width, y: (50 * randomLeftConstraint1)}
    ]
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (l = 1; l < points.length - 2; l ++)
    {
      var xc = (points[l].x + points[l + 1].x) / 2;
      var yc = (points[l].y + points[l + 1].y) / 2;
      ctx.quadraticCurveTo(points[l].x, points[l].y, xc, yc);
      //ctx.fillRect(points[l].x, points[l].y, 5, 5) // draw reference points for the curve
    }
    // curve through the last two points
    ctx.quadraticCurveTo(points[l].x, points[l].y, points[l+1].x,points[l+1].y);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(0, 1000);
    ctx.closePath();
    ctx.fill();
  }
  i = i + 1
}
setInterval("draw()", 20);
