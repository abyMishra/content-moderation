var imgs = [];
var isFirstImageLoad = true;
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
  if (results != null) {
    imgs = results[1].split(",");
    $("#total").text(imgs.length);
    prepImg();
  }
})("imgs");

$(document).ready(function() {
  $(".accordion").accordion({
    collapsible: true,
    active: false
  });

  $("#consent-accept").click(function() {
    $("#consent").css("display", "none");
    $(".accordion").accordion({active: 0});
  });

  $("#consent-decline").click(function() {
    $("#mturk_form").css("display", "none");
    $("body").text("Thank you for your interest in completing this HIT. Please click \"Return HIT\" to allow someone else to work on this task.");
  });
});

function prepImg() {
  currentImg = imgs[current];
  currentImgSrc = "https://s3-us-west-2.amazonaws.com/budang-moderation/" + currentImg + ".jpg";

  // preload and cache the next two images for faster load/display
  if (current + 1 < imgs.length)
    (new Image()).src = "https://s3-us-west-2.amazonaws.com/budang-moderation/" + imgs[current + 1] + ".jpg";
  if (current + 2 < imgs.length)
    (new Image()).src = "https://s3-us-west-2.amazonaws.com/budang-moderation/" + imgs[current + 2] + ".jpg";

  $("#pic")
    .attr("src", currentImgSrc)
    .jqImgBlur(blurOptns);

  $("#counter").text(current + 1);
  shuffleInputs();

  currentLabels = {};

  var prevAnswers = workerAnswers[currentImg];
  if (prevAnswers && prevAnswers !== "error") {
    $("input[name=category][value='" + prevAnswers.category + "']").prop("checked", true);
    $("input[name=type][value='" + prevAnswers.type + "']").prop("checked", true);
    $("input[name=confidence][value='" + prevAnswers.confidence + "']").prop("checked", true);
    $("input[name=approval][value='" + prevAnswers.approval + "']").prop("checked", true);
    $("textarea[name=rationale]").val(prevAnswers.rationale);
  } else {
    $("input[name=category]").prop("checked", false);
    $("input[name=type]").prop("checked", false);
    $("input[name=confidence]").prop("checked", false);
    $("input[name=approval]").prop("checked", false);
    $("textarea[name=rationale]").val("");
  }
}

