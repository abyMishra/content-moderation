$(document).ready(function() {
  var buttons = $("button");

  $("#slider").css("display", "none");

  $(".accordion").accordion({
    collapsible: true,
    active: false
  });

  $("img").jqImgBlur(blurOptns);

  $("button").click(function() {
    var id = $(this).attr("id");

    $("button").each(function(idx) {
      $(this)
        .removeClass("btn-warning")
        .addClass("btn-primary");
    });

    $(this)
      .addClass("btn-warning")
      .removeClass("btn-primary");

    if (id == "click") {
      $("#slider").css("display", "none");
      blurOptns = {
        stdDeviation: 14,
        sclick: {
          circle: { r: 50 }
        }
      }
    } else if (id == "mouse") {
      $("#slider").css("display", "none");
      blurOptns = {
        stdDeviation: 14,
        smouseover: {
          circle: { r: 50 }
        }
      }
    } else if (id == "slide") {
      $("#slider").css("display", "block");
      $("#slider").val(14);
      blurOptns = {
        stdDeviation: 14
      }
    }

    $("img").jqImgBlur(blurOptns);
  });
});