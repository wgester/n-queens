/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = [];
  for (var i = 0; i < n; i++){
    solution.push([]);
    for (var j = 0; j < n; j++){
      if (i === j){
        solution[i].push(1);
      }else{
        solution[i].push(0);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount;
  var choices = [];
  for (var i = 0; i < n; i++){
    choices.push(i);
  }
  var resultsArray = [];

  var recurseMe = function(choices){
    for (var i = 0; i < choices.length; i++){
      var result = [];
      result.push(choices[i]);
      var newChoices = choices.slice(0);
      newChoices.splice(i,1);
      if (choices.length > 1){
        recurseMeHelper(newChoices, result);
      } else {
        resultsArray.push([i]);
      }
    }
  };

  var recurseMeHelper = function(choices, result){
    if (choices.length === 0){
      resultsArray.push(result);
    }
    for (var i = 0; i < choices.length; i++){
      var newResult = result.concat(choices[i]);
      var newChoices = choices.slice(0);
      newChoices.splice(i,1);
      if (choices.length > 0){
        recurseMeHelper(newChoices, newResult);
      }else {
        resultsArray.push(newResult);
      }
    }
  };
  recurseMe(choices);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return resultsArray.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
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
      for (var j = 0; j < choices.length; j++){
        invalidChoices.push([]);
      }
      for (var k = 0; k < choices.length; k++){
        invalidChoices[k].push(choices[i]-1-k);
        invalidChoices[k].push(choices[i]+1+k);
      }
      var result = [];
      result.push(choices[i]);
      var newChoices = choices.slice(0);
      newChoices.splice(i,1);
      if (choices.length > 1){
        recurseMeHelper(newChoices, result, invalidChoices);
      } else {
        results += 1;
      }
    }
  };

  var recurseMeHelper = function(choices, result, invalidChoices){
    if (choices.length === 0){
      results += 1;
    }
    for (var m = 0; m < choices.length; m++){
      if (invalidChoices[0].indexOf(choices[m]) === -1){
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
