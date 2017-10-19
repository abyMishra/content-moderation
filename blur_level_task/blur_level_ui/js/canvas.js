var canvas = $("canvas")[0];
var context;
var canvasImg;

function drawImg() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();

  context.drawImage(canvasImg, 0, 0, iw, ih, imgLeft, imgTop, imgWidth, imgHeight);

  context.restore();
}

function loadImage() {
  context = canvas.getContext("2d");
  var imgObj = new Image();
  imgObj.onload = function() {
    var width = this.width;
    var height = this.height;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(imgObj, 0, 0, width, height);
  }
  imgObj.src = currentImgSrc;
}

