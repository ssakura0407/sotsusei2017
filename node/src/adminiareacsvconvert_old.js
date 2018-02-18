'use strict';

var fs = require('fs');
var csvSync = require('csv-parse/lib/sync');

// var file = 'csv/ken-d_administrative.csv';
var file = 'csv/ken-h_park.csv';
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
    //     if(element == "空き家比率") console.log("空き家比率:"+index);
    //     if(element == "ごみのリサイクル率") console.log("ごみのリサイクル率:"+index);
    //     if(element == "ごみ埋立率") console.log("ごみ埋立率:"+index);
    //     if(element == "最終処分場残余容量") console.log("最終処分場残余容量:"+index);
    //     if(element == "小売店数") console.log("小売店数:"+index);
    //     if(element == "大型小売店数") console.log("大型小売店数:"+index);
    //     if(element == "百貨店，総合スーパー数") console.log("百貨店，総合スーパー数:"+index);
    //     if(element == "コンビニエンスストア数") console.log("コンビニエンスストア数:"+index);
    //     if(element == "飲 食 店 数") console.log("飲 食 店 数:"+index);
    //     if(element == "公衆浴場数") console.log("公衆浴場数:"+index);
    //     if(element == "市町村道舗装率") console.log("市町村道舗装率:"+index);
    //     if(element == "都市公園面積") console.log("都市公園面積:"+index);
    //     if(element == "都市公園数") console.log("都市公園数:"+index);
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
  jsonElement["vacant"]=parseFloat(newLine[0][12].replace(/,/g, '')); //空き家比率:12
  jsonElement["recycling"]=parseFloat(newLine[0][79].replace(/,/g, '')); //ごみのリサイクル率:79
  jsonElement["landfill"]=parseFloat(newLine[0][81].replace(/,/g, '')); //ごみ埋立率:81
  jsonElement["finallandfill"]=parseFloat(newLine[0][83].replace(/,/g, '')); //最終処分場残余容量:83
  jsonElement["retailstore"]=parseFloat(newLine[0][85].replace(/,/g, '')); //小売店数:85
  jsonElement["largeretailstore"]=parseFloat(newLine[0][87].replace(/,/g, '')); //大型小売店数:87
  jsonElement["department"]=parseFloat(newLine[0][89].replace(/,/g, '')); //百貨店，総合スーパー数:89
  jsonElement["convenience"]=parseFloat(newLine[0][98].replace(/,/g, '')); //コンビニエンスストア数:98
  jsonElement["restaurant"]=parseFloat(newLine[0][100].replace(/,/g, '')); //飲 食 店 数:100
  jsonElement["bathhouse"]=parseFloat(newLine[0][106].replace(/,/g, '')); //公衆浴場数:106
  jsonElement["municipalroad"]=parseFloat(newLine[0][125].replace(/,/g, '')); //市町村道舗装率:125
  jsonElement["urbanparkarea"]=parseFloat(newLine[0][142].replace(/,/g, '')); //都市公園面積:142
  jsonElement["urbanpark"]=parseFloat(newLine[0][144].replace(/,/g, '')); //都市公園数:144
  return jsonElement;
});

console.log(JSON.stringify(data));

