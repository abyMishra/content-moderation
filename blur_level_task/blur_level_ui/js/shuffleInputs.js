var categories =
  ["<input type='radio' name='category' value='pornography'> Pornography<br>", 
  "<input type='radio' name='category' value='violence'> Violence<br>", 
  "<input type='radio' name='category' value='sfw'> Safe for work (SFW)<br>"];

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
