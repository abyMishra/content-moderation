var sexDef = "Content showing any obvious sexual activity or visible \"private\" parts, even through clothing. Kissing without nudity is allowed.";
var graphicDef = "Content displaying violence, mutilation, or torture towards a person or animal, or content displaying excessive injury, blood, or gore.";
var safeDef = "Content that you could comfortably share with your 10-year-old child, elderly grandmother, or your boss and coworkers.";
var otherDef = "None of the other categories adequately describe this content."

var categories =
  ["<input type='radio' name='category' value='sex_nudity'> Sex and nudity "
    + "<a href='#' data-toggle='tooltip' data-placement='right' title='" + sexDef + "'>"
    + "<span class='glyphicon glyphicon-question-sign'></span></a><br>",
  "<input type='radio' name='category' value='graphic'> Graphic content "
    + "<a href='#' data-toggle='tooltip' data-placement='right' title='" + graphicDef + "'>"
    + "<span class='glyphicon glyphicon-question-sign'></span></a><br>",
  "<input type='radio' name='category' value='safe'> Safe for general audiences "
    + "<a href='#' data-toggle='tooltip' data-placement='right' title='" + safeDef + "'>"
    + "<span class='glyphicon glyphicon-question-sign'></span></a><br>",
  "<input type='radio' name='category' value='other'> Other "
    + "<a href='#' data-toggle='tooltip' data-placement='right' title='" + otherDef + "'>"
    + "<span class='glyphicon glyphicon-question-sign'></span></a><br>"];

var types =
  ["<input type='radio' name='type' value='realistic'> Yes<br>",
  "<input type='radio' name='type' value='synthetic'> No<br>"];

var approval =
  ["<input type='radio' name='approval' value='approve'> Yes<br>",
  "<input type='radio' name='approval' value='disapprove'> No<br>"];


function shuffleInputs() {
  shuffle(categories);
  shuffle(types);
  shuffle(approval);

  $("#categories").empty();
  $("#categories").append(categories.join("\n"));

  $("#types").empty();
  $("#types").append(types.join("\n"));

  $("#approval").empty();
  $("#approval").append(approval.join("\n"));

  $(document).ready(function() {
    $("[data-toggle='tooltip']").tooltip();
  });
}

/* https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array*/
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}
