var auditors = {
  "before_typing_delay": false,
  "clicks_total": true,
  "focus_changes_total": false,
  "keypresses_total": false,
  "mouse_movement_total": true,
  "on_focus_time": true,
  "pastes_total": false,
  "recorded_time_disparity": false,
  "scrolled_pixels_total": false,
  "total_task_time": true,
  "within_typing_delay": false,
  "url": false,
  "user_agent": false
}

for (var name in auditors) {
  if (auditors[name]) {
    $("<script />")
      .attr("type", "text/javascript")
      .attr("src", "js/auditors/" + name + ".js")
      .appendTo("head")
  }
}