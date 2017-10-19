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
    
    if (category && type) {
      currentLabels.category = category;
      currentLabels.type = type;
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
      "category": currentLabels.category,
      "type": currentLabels.type,
      "confidence": currentLabels.confidence
    }
  } 
});

