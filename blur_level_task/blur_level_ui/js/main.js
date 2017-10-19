var imgs = [];
var current = 0;
var currentImg = -1;
var currentLabels = {};
var workerAnswers = {};

(function(key) {
  var regexS = "[\\?&]" + key + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var tmpURL = window.location.href;
  tmpURL = decodeURIComponent(tmpURL);
  var results = regex.exec(tmpURL);
  if(results != null) {
    imgs = results[1].split(",");
    currentImg = imgs[current];
    $("#total").text(imgs.length);
    prepImg();
  }
})("imgs");

function prepImg() {
  currentImg = imgs[current];
  currentImgSrc = "../../images/" + currentImg + ".jpg";
  
  $("#counter").text(current + 1);

  var prevAnswers = workerAnswers[currentImg];
  if (prevAnswers && prevAnswers.answer !== "error") {
    $("input[name=category][value='" + prevAnswers.answer + "']").prop("checked", true);
    $("#confidenceRange").val(prevAnswers.confidence);
  } else {
    $("input[name=category]").prop("checked", false);
    $("#confidenceRange").val(3);
  }
  setConfidenceLabel();

  loadImage();
}

