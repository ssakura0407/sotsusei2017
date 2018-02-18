'use strict';

var fs = require('fs');
var csvSync = require('csv-parse/lib/sync');

// var file = 'csv/ken-d_administrative.csv';
var file = 'csv/ken-k_safety.csv';
let csvfile = fs.readFileSync(file);
var json = JSON.parse(fs.readFileSync('src/json/adminipref.json', 'utf8'));
let csvData = csvSync(csvfile);

var data = json.map(function(jsonElement, jsonIndex) {
  // console.log(jsonElement);
  // console.log("---\n");
  // console.log("14:"+jsonElement["pref"]);
  var newLine = csvData.filter(function(csvElement, csvIndex){
    //indexのセルの番号を知るための処理
    // if(csvIndex == 0){
    //   csvElement.filter(function(element,index){
    //     if(element == "消 防 署 数") console.log("消 防 署 数:"+index);
    //     if(element == "消防吏員数") console.log("消防吏員数:"+index);
    //     if(element == "火災出火件数") console.log("火災出火件数:"+index);
    //     if(element == "建物火災出火件数") console.log("建物火災出火件数:"+index);
    //     if(element == "交通事故発生件数") console.log("交通事故発生件数:"+index);
    //     if(element == "警察署・交番・駐在所数") console.log("警察署・交番・駐在所数:"+index);
    //     if(element == "警 察 官 数") console.log("警 察 官 数:"+index);
    //     if(element == "公害苦情件数") console.log("公害苦情件数:"+index);
    //   });
    // }
    if(csvElement[1] == jsonElement["pref"]) {
    //   // console.log("\n");
    //   // console.log("18: csvIndex:"+csvIndex+" 博物館数:"+csvElement[8]);
    //   // console.log(csvIndex);
    //   console.log("---\n");
    //   console.log(csvElement);
      return csvIndex;
    }
  });
  // console.log("---\n 26");
  // console.log(newLine[0]);
  jsonElement["firestation"]=parseFloat(newLine[0][4].replace(/,/g, '')); //消防署数:4
  jsonElement["firefighter"]=parseFloat(newLine[0][12].replace(/,/g, '')); //消防吏員数:12
  jsonElement["firefire"]=parseFloat(newLine[0][18].replace(/,/g, '')); //火災出火件数:18
  jsonElement["buildingfire"]=parseFloat(newLine[0][20].replace(/,/g, '')); //建物火災出火件数:20
  jsonElement["trafficaccident"]=parseFloat(newLine[0][41].replace(/,/g, '')); //交通事故発生件数:41
  jsonElement["policestation"]=parseFloat(newLine[0][56].replace(/,/g, '')); //警察署・交番・駐在所数:56
  jsonElement["policeman"]=parseFloat(newLine[0][58].replace(/,/g, '')); //警察官数:58
  jsonElement["pollution"]=parseFloat(newLine[0][77].replace(/,/g, '')); //公害苦情件数:77
  return jsonElement;
});

console.log(JSON.stringify(data));

