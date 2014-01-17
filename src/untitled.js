countNQueensSolutions = function(n){
  var start = +new Date();
  var choices = [];
  for (var i = 0; i < n; i++){
    choices.push(i);
  }
  var results = 0;

  var recurseMe = function(choices){
    if (choices.length === 0){
      results += 1;
    }
    for (var i = 0; i < choices.length; i++){
      var invalidChoices = [];
      for (var j = 0; j < choices.length-1; j++){
        invalidChoices.push([]);
      }
      for (var k = 0; k < choices.length-1; k++){
        invalidChoices[k].push(choices[i]-1-k);
        invalidChoices[k].push(choices[i]+1+k);
      }
      var result = [];
      result.push(choices[i]);
      var newChoices = choices.slice(0);
      newChoices.splice(i,1);
      if (choices.length > 1){
        recurseMeHelper(newChoices, result, invalidChoices);
      }
    }
  };

  var recurseMeHelper = function(choices, result, invalidChoices){
    if (choices.length === 0){
      results += 1;
    }
    for (var m = 0; m < choices.length; m++){
      if (!~invalidChoices[0].indexOf(choices[m])){
        var newInvalidChoices = [];
        for (var q = 1; q < invalidChoices.length; q++){
          newInvalidChoices.push(invalidChoices[q].slice(0));
        }
        for (var u = 0; u < newInvalidChoices.length; u++){
          newInvalidChoices[u].push(choices[m]-1-u);
          newInvalidChoices[u].push(choices[m]+1+u);
        }
        var newResult = result.concat(choices[m]);
        var newChoices = choices.slice(0);
        newChoices.splice(m,1);
        if (choices.length > 0){
          recurseMeHelper(newChoices, newResult, newInvalidChoices);
        }
      }
    }
  };
  recurseMe(choices);
  var end = +new Date();
  console.log(end - start);
  return results;
};
