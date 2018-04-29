$(document).ready(function() {
  $("#slider").css("display", "none");

  $(".accordion").accordion({
    collapsible: true,
    active: false
  });

  $("img").jqImgBlur(blurOptns);

  $("button").click(function() {
    var id = $(this).attr("id");

    if (id == "click") {
      blurOptns = {
        stdDeviation: 14,
        sclick: {
          circle: { r: 50 }
        }
      }

      $("#slider").css("display", "none");
    } else if (id == "mouse") {
      blurOptns = {
        stdDeviation: 14,
        smouseover: {
          circle: { r: 50 }
        }
      }

      $("#slider").css("display", "none");
    } else if (id == "slide") {
      blurOptns = {
        stdDeviation: 14
      }

      $("#slider").css("display", "block");
      $("#slider").val(14);
    }

    $("img").jqImgBlur(blurOptns);
  });
});