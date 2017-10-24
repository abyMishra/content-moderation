var imgs = [];
var current = 0;
var currentImg = -1;
var currentLabels = {};
var workerAnswers = {};
var blurOptns = {
  stdDeviation : 7,
};

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
  $(".jqImgBlurPic").first().remove();

  currentImg = imgs[current];
  currentImgSrc = "../../images/" + currentImg + ".jpg";
  $("img").first().attr("src", currentImgSrc);
  $("img").first().jqImgBlur(blurOptns);

  $("#counter").text(current + 1);
  shuffleInputs();

  var prevAnswers = workerAnswers[currentImg];
  if (prevAnswers && prevAnswers !== "error") {
    $("input[name=category][value='" + prevAnswers.category + "']").prop("checked", true);
    $("input[name=type][value='" + prevAnswers.type + "']").prop("checked", true);
    $("#confidenceRange").val(prevAnswers.confidence);
  } else {
    $("input[name=category]").prop("checked", false);
    $("input[name=type]").prop("checked", false);
    $("#confidenceRange").val(3);
  }
  setConfidenceLabel();
}

