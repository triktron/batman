var canvas;
var context;
var mx = 0;
var my = 0;

var eyes = [
  {
   'centerX' : 142,
   'centerY' : 238,
   'radius' : 31
  },   {
     'centerX' : 257,
     'centerY' : 217,
     'radius' : 32
   }
]

var backImg = new Image()
backImg.src = "batman.png";
var eyeImg = new Image()
eyeImg.src = "eye.png";

window.onload = function() {
  canvas = document.getElementById('eyes');
  context = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 512;
  context.fillStyle = "#fff"
  window.onmousemove = function(evt) { setPoint(evt.x,evt.y) };
  window.addEventListener("touchstart", function(evt) {setPoint(evt.touches[0].pageX,evt.touches[0].pageY); }, false);
  window.addEventListener("touchmove", function(evt) { setPoint(evt.touches[0].pageX,evt.touches[0].pageY); }, false);
  drawFrame();
}

function setPoint(x,y) {
  mx = x / (canvas.getBoundingClientRect().width / 512)
  my = y / (canvas.getBoundingClientRect().height / 512)
}

function drawFrame() {
  context.fillRect(0,0,canvas.width,canvas.height)
  for (var i = 0; i < eyes.length; i++) {
    drawEye(eyes[i]);
  };
  context.drawImage(backImg, 0, 0);
  // loop
  requestAnimationFrame(drawFrame);
}

function drawEye(eye) {
  calcEye(eye);

  context.drawImage(eyeImg,eye.centerX + eye.pupilX - 10,eye.centerY + eye.pupilY - 10);

}

function calcEye(eye) {
  dx = mx - eye.centerX;
  dy = my - eye.centerY;

  c = Math.sqrt((dx*dx) + (dy*dy));


  r = eye.radius * 0.8;


  if (Math.abs(dx) < r && Math.abs(dy) < r && c < r) {
    r = c;
  }

  alfa = Math.asin(dy / c);


  eye.pupilX = Math.cos(alfa) * r;

  eye.pupilX = (dx < 0 ? eye.pupilX * -1 : eye.pupilX);
  eye.pupilY = Math.sin(alfa) * r;

}
