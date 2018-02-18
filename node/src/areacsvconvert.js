'use strict';

var fs = require('fs');
var csvSync = require('csv-parse/lib/sync');

var file = 'csv/arearank.csv';
let csvfile = fs.readFileSync(file);
var json = JSON.parse(fs.readFileSync('src/json/pref.json', 'utf8'));

let csvData = csvSync(csvfile);

// var csvData = csvSync(data, {
//     delimiter: ',', 
//     rowDelimiter: 'auto', 
//     quote: '"', 
//     escape: '"', 
//     columns: null, 
//     comment: '#', 
//     skip_empty_line: false, 
//     trim: false
// });

var data = json["marker"].map(function(jsonElement, jsonIndex) {
  // console.log(element);
  // console.log("---\n");
  // console.log("26:"+jsonElement["pref"]);
  var newLine = csvData.filter(function(csvElement, csvIndex){
    if(csvElement[0] == jsonElement["pref"]) {
      // console.log(csvIndex);
      return csvIndex;
    }
  });


  // console.log(newLine[6]);
  // console.log("---\n");
  jsonElement["arearank1"]=newLine[0][2];
  jsonElement["arearank5"]=newLine[0][6];
  jsonElement["arearank10"]=newLine[0][11];
  return jsonElement;
});

console.log(JSON.stringify(data));

