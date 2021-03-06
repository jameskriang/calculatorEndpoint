var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var resultArrays = queryToArrayParser(req.originalUrl.slice(22));
  var numberArr = resultArrays[0];
  var signArr = resultArrays[1];
  try{
    var result = calculate(numberArr,signArr);
    // res.render('calculation', { value: result});
    res.status(200).send(result.toString());
  }catch(e){
    console.log(e);
    res.status(500).send("something bad happened");
    // res.render('calculation', { value: "something bad happened"});
  }
});

function queryToArrayParser(queryString){
  var signRegEx = /[+-]+|\*+|\/+/;
  var numberRegEx = /[0-9]+/;
  var numberArr = queryString.split(signRegEx).map(val => parseInt(val)).filter(val => !isNaN(val) );
  var signArr = queryString.split(numberRegEx).filter(Boolean);
  var returnArrays = [numberArr,signArr];
  return returnArrays;
}

function calculate(numberArr,signArr){
    var result = numberArr.shift();
    while(numberArr.length != 0){
      var val2 = numberArr.shift();
      var sign = signArr.shift();
      switch(sign){
        case '+':
          try{
            result += val2;
          }catch(e){
            console.log(e);
            return e.message;
          }
          break;
        case '-':
          try{
            result -= val2;
          }catch(e){
            console.log(e);
            return e.message;
          }
          break;
        case '*':
          try{
            result =  result * val2;
          }catch(e){
            console.log(e);
            return e.message;
          }
          break;
        case '/':
          try{
            result =  result/val2;
          }catch(e){
            console.log(e);
            return e.message;
          }
          break;
        default:
          return '"Incorrect input"';
      }
    }
    if(signArr.length > 0){
      return '"Incorrect input"';
    }
    return result;
}

module.exports = router;
