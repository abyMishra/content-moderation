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
    
    if (category) {
      currentLabels.answer = category;
      return true;
    }

    alert("Please make sure you've answered the question.");
    return false;
  }

  function nextImg(ok, error) {
    if (!ok)
      return;

    if (error) {
      workerAnswers[currentImg] = "error";
      currentLabels.answer = "";
      currentLabels.confidence = 3;
    }
    else
      saveLabels();

    if (current == imgs.length - 1) {
      $("#feedback").css("display", "block");
      return;
    }

    current += 1;
    prepImg();
  }

  function saveLabels() {
    currentLabels.confidence = parseInt($("#confidenceRange").val());

    workerAnswers[currentImg] = {
      "answer": currentLabels.answer,
      "confidence": currentLabels.confidence
    }
  } 
});

