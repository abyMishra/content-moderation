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
    $("#survey").css("display", "none");
  });

  $(window).click(function(event) {
    if (event.target == $("#survey")[0]) {
      $("#survey").css("display", "none");
    }
  });

  if ($("textarea[name='survey']").val() === '' )
    $("#submitButton").prop("disabled", true);

  $("textarea[name='survey']").on("input", function(e) {
    if (e.target.value === '')
      $("#submitButton").attr("disabled", true);
    else
      $("#submitButton").attr("disabled", false);
  });

  $("#submitButton").click(function(e) {
    $("#task").remove();

    $("<input />")
      .attr("type", "hidden")
      .attr("name", "labels")
      .attr("value", JSON.stringify(workerAnswers))
      .appendTo("#mturk_form");

    $("<input />")
      .attr("type", "hidden")
      .attr("name", "survey")
      .attr("value", $("textarea[name='survey']").val())
      .appendTo("#mturk_form");
  });

  function checkAnswers() {
    var category = $("input[name=category]:checked").val();
    var type = $("input[name=type]:checked").val();
    var approval = $("input[name=approval]:checked").val();
    var rationale = $("textarea[name=rationale]").val();

    if (category && type && approval) {
      currentLabels.category = category;
      currentLabels.type = type;
      currentLabels.approval = approval;
      currentLabels.rationale = rationale;
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
      workerAnswers[currentImg] = JSON.parse(JSON.stringify(currentLabels));

    isFirstImageLoad = false;

    if (current == imgs.length - 1) {
      $("#survey").css("display", "block");
      return;
    }

    current += 1;
    prepImg();
  }
});
