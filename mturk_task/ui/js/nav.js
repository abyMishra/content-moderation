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

  $("#submitButton").prop("disabled", true);

  $("textarea[name='survey']").keyup(function() {
    if($(this).val().length > 0) {
      $("#submitButton").attr("disabled", false);
    }
    else {
      $("#submitButton").attr("disabled", true);
    }
  });

  $("#submitButton").click(function(e) {
    $("#task").remove();

    $("<input />")
      .attr("type", "hidden")
      .attr("name", "labels")
      .attr("value", workerAnswers)
      .appendTo("#mturk_form");
  });

  function checkAnswers() {
    var category = $("input[name=category]:checked").val();
    var type = $("input[name=type]:checked").val();
    var confidence = $("input[name=confidence]:checked").val();
    var approval = $("input[name=approval]:checked").val();
    var rationale = $("textarea[name=rationale]").val();

    if (category && type && confidence && approval) {
      currentLabels.category = category;
      currentLabels.type = type;
      currentLabels.confidence = confidence;
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
      workerAnswers[currentImg] = Object.create(currentLabels);

    isFirstImageLoad = false;

    if (current == imgs.length - 1) {
      $("#survey").css("display", "block");
      return;
    }

    current += 1;
    prepImg();
  }
});

