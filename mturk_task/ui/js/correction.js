// fixes unblurring placement issue caused by collapsible div
$(document).ready(function() {
  var collapsed = $("#ui-id-2").height();
  var uncollapsed = collapsed + $("#ui-id-2").height();
  correction = collapsed;

  console.log(collapsed, uncollapsed)

  $(".accordion").on("accordionactivate", function(event, ui) {
    console.log('xxx')
    if (!ui.newHeader)
      correction = collapsed;
    else
      correction = uncollapsed;
   });
});
