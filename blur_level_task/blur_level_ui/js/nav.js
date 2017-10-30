$(document).ready(function() {
  $("#prev").click(function() {
    if (current != 0) {
      current -= 1;
      prepImg();
    }
  });

  $("#next").click(function() {
    nextImg(checkAnswers(), false);
  });

  $("#issue").click(function() {
    nextImg(true, true);
  });

  $("#submit-cancel").click(function() {
    $("#feedback").css("display", "none");
  });

  $(window).click(function(event) {
    if (event.target == $("#feedback")[0]) {
      $("#feedback").css("display", "none");
    }
  });

  $("#submitButton").click(function() {
    $("input[type=radio], #confidenceRange").remove();

    $("<input />")
      .attr("type", "hidden")
      .attr("name", "labels")
      .attr("value", workerAnswers)
      .appendTo("#mturk_form");
  });

  function checkAnswers() {
    var category = $("input[name=category]:checked").val();
    var type = $("input[name=type]:checked").val();
    var approval = $("input[name=approval]:checked").val();
    
    if (category && type && approval) {
      currentLabels.category = category;
      currentLabels.type = type;
      currentLabels.confidence = parseInt($("#confidenceRange").val());
      currentLabels.approval = approval;
      return true;
    }

    alert("Please make sure you've answered all questions.");
    return false;
  }

  function nextImg(ok, error) {
    if (!ok)
      return;

    if (error)
      workerAnswers[currentImg] = "error";
    else
      workerAnswers[currentImg] = Object.create(currentLabels);

    if (current == imgs.length - 1) {
      $("#feedback").css("display", "block");
      return;
    }

    current += 1;
    prepImg();
  }
});

