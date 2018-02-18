'use strict';

var fs = require('fs');
var csvSync = require('csv-parse/lib/sync');

var file = 'csv/ken-b_forest.csv';
let csvfile = fs.readFileSync(file);
var json = JSON.parse(fs.readFileSync('src/json/forestpref.json', 'utf8'));
let csvData = csvSync(csvfile);

var data = json["marker"].map(function(jsonElement, jsonIndex) {
  // console.log(jsonElement);
  // console.log("---\n");
  // console.log("14:"+jsonElement["pref"]);
  var newLine = csvData.filter(function(csvElement, csvIndex){
    if(csvElement[1] == jsonElement["pref"]) {
      // console.log("\n");
      // console.log("18: csvIndex:"+csvIndex+" 森林面積:"+csvElement[8]);
      // console.log(csvIndex);
      // console.log("---\n");
      // console.log(csvElement);
      return csvIndex;
    }
  });

  // console.log("---\n 26");
  // console.log(newLine[0]);
  jsonElement["forest"]=parseFloat(newLine[0][8]);
  return jsonElement;
});

console.log(JSON.stringify(data));

