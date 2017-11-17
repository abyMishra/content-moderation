var pornDef = "This image displays pornography, nudity, or overly sexual themes.";
var violDef = "This image displays excessive violence, torture, gore, blood, or injury towards a person or animal.";
var safeDef = "This image would be ok to comfortably show a 10-year-old, your boss, or your coworkers.";

var categories =
  ["<input type='radio' name='category' value='pornography'> Pornography "
    + "<a href='#' data-toggle='tooltip' data-placement='right' title='" + pornDef + "'>"
    + "<span class='glyphicon glyphicon-question-sign'></span></a><br>",
  "<input type='radio' name='category' value='violence'> Violence / Gore "
    + "<a href='#' data-toggle='tooltip' data-placement='right' title='" + violDef + "'>"
    + "<span class='glyphicon glyphicon-question-sign'></span></a><br>",
  "<input type='radio' name='category' value='safe'> Safe for general audiences "
    + "<a href='#' data-toggle='tooltip' data-placement='right' title='" + safeDef + "'>"
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
