'use strict';

var fs = require('fs');
var csvSync = require('csv-parse/lib/sync');

var file = 'csv/movie.csv';
var jsonfile = '../htdocs/assets/json/pref.json';
let csvfile = fs.readFileSync(file);
var json = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
let csvData = csvSync(csvfile);

var data = json.map(function(jsonElement, jsonIndex) {
  // console.log(jsonElement);
  // console.log("---\n");
  // console.log("14:"+jsonElement["pref"]);
  var newLine = csvData.filter(function(csvElement, csvIndex){
    if(csvElement[0] == jsonElement["pref"]) {
      // console.log("\n");
      // console.log("18: csvIndex:"+csvIndex+" 森林面積:"+csvElement[8]);
      // console.log(csvIndex);
      // console.log("---\n");
      // console.log(csvElement);
      return csvIndex;
    }
  });

  // if(newLine[0][1]) jsonElement["farm"]=parseFloat(newLine[0][1]);
  // jsonElement["japanpeople"]=parseFloat(newLine[0][2]);
  jsonElement["movie"]=parseFloat(newLine[0][1]);
  return jsonElement;
});

console.log(JSON.stringify(data));
fs.writeFile(jsonfile, JSON.stringify(data), (error) => {});
