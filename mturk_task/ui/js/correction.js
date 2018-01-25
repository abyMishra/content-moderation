// fixes unblurring placement issue caused by collapsible div
$(document).ready(function() {
  var collapsed = $("#ui-id-2").height();
  var uncollapsed = collapsed + $("#ui-id-2").height();

  $(".accordion").on("accordionactivate", function(event, ui) {
    if (JSON.stringify(ui.newHeader) != '{}')
      correction = collapsed;
    else
      correction = uncollapsed;
   });
});
