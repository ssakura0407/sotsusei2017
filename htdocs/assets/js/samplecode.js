var map;
var json;

//重心を求めるために合計する
var latSum = 0;
var lngSum = 0;
//人口重心を求めるために合計する
var latPeopleSum = 0;
var lngPeopleSum = 0;
var peopleSum = 0;
//県内総生産重心を求めるために合計する
var latPrefproSum = 0;
var lngPrefproSum = 0;
var prefproSum = 0;
//震度５弱以上を観測した地震重心を求めるために合計する
var latQuakeSum = 0;
var lngQuakeSum = 0;
var quakeSum = 0;
//全時間帯別の到達エリア面積の重心を求めるために合計する
var latTraffic1Sum = 0; //~1時間
var lngTraffic1Sum = 0;
var traffic1Sum = 0;
var latTraffic5Sum = 0; //~5時間
var lngTraffic5Sum = 0;
var traffic5Sum = 0;
var latTraffic10Sum = 0; //~10時間
var lngTraffic10Sum = 0;
var traffic10Sum = 0;


function initialize() {
  if (GBrowserIsCompatible()) {
    map = new GMap2(document.getElementById("map"));
    map.addControl(new GMapTypeControl());
    map.addControl(new GLargeMapControl());
    map.setCenter(new GLatLng(36.13787471840729, 138.603515625), 6);

    GDownloadUrl("/assets/json/pref.json", createMap);
  }
}

function createMap(jsondata, statusCode){
  json = eval("(" + jsondata + ")");

  var selectHtml = "";
  selectHtml += "<form>";
  selectHtml += "<select id='pref' onChange='selectPref()'>";
  selectHtml += "<option value='0'>選択してください</option>";

  // console.log("都道府県jsonの合計数: "+json.marker.length);

  for (var i = 0; i < json.marker.length; i++) {
        console.log(json.marker[i]);
  // for (var i = 0; i < 46; i++) {
    var pref = json.marker[i].pref;
    var url = json.marker[i].url;
    var addr = json.marker[i].addr;
    // var lat = json.marker[i].lat;
    // var lng = json.marker[i].lng;
    var lat = json.marker[i].gsiLat;
    var lng = json.marker[i].gsiLng;
    var people = json.marker[i].people;
    var prefpro = json.marker[i].prefpro;
    var quake = json.marker[i].quake;
    var traffic1 = json.marker[i].traffic1;
    var traffic5 = json.marker[i].traffic5;
    var traffic10 = json.marker[i].traffic10;
    
    //合計するために+する
    latSum += lat;
    lngSum += lng;
    latPeopleSum += lat*people;
    lngPeopleSum += lng*people;
    peopleSum += people;
    latPrefproSum += lat*prefpro;
    lngPrefproSum += lng*prefpro;
    prefproSum += prefpro;
    latQuakeSum += lat*quake;
    lngQuakeSum += lng*quake;
    quakeSum += quake;
    latTraffic1Sum += lat*traffic1;
    lngTraffic1Sum += lng*traffic1;
    latTraffic5Sum += lat*traffic5;
    lngTraffic5Sum += lng*traffic5;
    latTraffic10Sum += lat*traffic10;
    lngTraffic10Sum += lng*traffic10;
    traffic1Sum += traffic1;
    traffic5Sum += traffic5;
    traffic10Sum += traffic10;

    // console.log(pref+" lat:"+lat+" lng:"+lng);

    //ここでマップにマーカーをつけている
    // var marker = createMarker(pref, url, addr, lat, lng)
    // map.addOverlay(marker);

    selectHtml += "<option value='" + lat + "," + lng + "'>" + pref + "</option>";
  }

  selectHtml += "</select>";
  selectHtml += "</form>";


  //重心を求める
  var centerMarker=createMarker("重心地","http://www.pref.hokkaido.lg.jp/","ここだよ〜",latSum/json.marker.length,lngSum/json.marker.length);
  map.addOverlay(centerMarker);
  console.log("latSum:"+latSum/json.marker.length+" lngSum:"+lngSum/json.marker.length);

  //人口重心を求める
  var peopleCenterMarker=createMarker("人口重心地","http://www.pref.hokkaido.lg.jp/","ここだよ〜",latPeopleSum/peopleSum,lngPeopleSum/peopleSum);
  map.addOverlay(peopleCenterMarker);
  // console.log("latPeopleSum:"+latPeopleSum/peopleSum+" lngPeopleSum:"+lngPeopleSum/peopleSum);

  //県内総生産重心を求める
  var prefproCenterMarker=createMarker("県内総生産重心地","http://www.esri.cao.go.jp/jp/sna/data/data_list/kenmin/files/contents/main_h26.html","ここだよ〜",latPrefproSum/prefproSum,lngPrefproSum/prefproSum);
  map.addOverlay(prefproCenterMarker);
  // console.log("latPrefproSum:"+latPrefproSum/prefproSum+" lngPrefproSum:"+lngPrefproSum/prefproSum);

  //震度５弱以上を観測した地震の県重心を求める
  // var quakeCenterMarker=createMarker("震度５弱以上を観測した地震の県重心地","http://www.data.jma.go.jp/svd/eew/data/suikei/eventlist.html","ここだよ〜",latQuakeSum/quakeSum,lngQuakeSum/quakeSum);
  // map.addOverlay(quakeCenterMarker);
  // console.log("latQuakeSum:"+latQuakeSum/quakeSum+" lngQuakeSum:"+lngQuakeSum/quakeSum);

  // //全時間帯別の到達エリア面積の重心を求める
  // var traffic1CenterMarker=createMarker("全時間帯別の到達エリア面積の~1時間重心地","http://www.data.jma.go.jp/svd/eew/data/suikei/eventlist.html","ここだよ〜",latTraffic1Sum/traffic1Sum,lngTraffic1Sum/traffic1Sum);
  // map.addOverlay(traffic1CenterMarker);
  // console.log("latTraffic1Sum:"+latTraffic1Sum/traffic1Sum+" lngTraffic1Sum:"+lngTraffic1Sum/traffic1Sum);

  // var traffic5CenterMarker=createMarker("全時間帯別の到達エリア面積の~5時間重心地","http://www.data.jma.go.jp/svd/eew/data/suikei/eventlist.html","ここだよ〜",latTraffic5Sum/traffic5Sum,lngTraffic5Sum/traffic5Sum);
  // map.addOverlay(traffic5CenterMarker);
  // console.log("latTraffic5Sum:"+latTraffic5Sum/traffic5Sum+" lngTraffic5Sum:"+lngTraffic5Sum/traffic5Sum);
  
  // var traffic10CenterMarker=createMarker("全時間帯別の到達エリア面積の~10時間重心地","http://www.data.jma.go.jp/svd/eew/data/suikei/eventlist.html","ここだよ〜",latTraffic10Sum/traffic10Sum,lngTraffic10Sum/traffic10Sum);
  // map.addOverlay(traffic10CenterMarker);
  // console.log("latTraffic10Sum:"+latTraffic10Sum/traffic10Sum+" lngTraffic10Sum:"+lngTraffic10Sum/traffic10Sum);

  
  document.getElementById("selectMenu").innerHTML = selectHtml;
}

function createMarker(pref, url, addr, lat, lng){
  var marker = new GMarker(new GLatLng(lat, lng));

  var html = "";
  html += "<p><a href='" + url + "'>" + pref + "</a></p>";
  html += "<p>" + addr + "</p>";

  GEvent.addListener(marker, "click", function(){
    marker.openInfoWindowHtml(html);
  });

  return marker;
}

function selectPref(){
  var val = document.getElementById("pref").value;

  if (val != "0"){
    var latlng = val.split(",");
    var lat = latlng[0];
    var lng = latlng[1];

    map.setCenter(new GLatLng(lat, lng), 14);
  }
}

function checkPos(){
  var displayPos=document.getElementById("displayPos");
  displayPos.style.width = 700;
  displayPos.style.height = 700;
  displayPos.style.position = "relative";

  for (var i = 0; i < json.marker.length; i++) {
    // var lat = Math.floor(json.marker[i].lat*30)-600;
    // var lng = Math.floor(json.marker[i].lng*30)-3700;
    var lat = Math.floor(json.marker[i].gsilat*30)-600;
    var lng = Math.floor(json.marker[i].gsilng*30)-3700;
    var pref = json.marker[i].pref;
    console.log("lat:"+lat+" lng:"+lng);

    var element = document.createElement("div");
    element.id = "dispos"+i;
    element.innerHTML = ".";//+pref;
    element.style.position = "absolute";
    element.style.left = lng;
    element.style.bottom = lat;
    element.style.fontSize = 14;
    element.style.fontWeight = "bold";

    displayPos.appendChild(element);
  }

  var element = document.createElement("div");
  element.id = "disposCenter";
  element.innerHTML = "●";//+pref;
  element.style.position = "absolute";
  element.style.left = Math.floor(lngSum/json.marker.length*30)-3700;
  element.style.bottom = Math.floor(latSum/json.marker.length*30)-600;
  element.style.fontSize = 8;
  element.style.color = "red";
  displayPos.appendChild(element);

  console.log("161:"+json.marker.length);
}

