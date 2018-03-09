var map; //googlemapのオブジェクト
var json; //緯度経度格納jsonファイル
var centerData = {}; //分野ごとの重心地のデータ
var data; //各データの重心地
var styledMapType; //マーカーのスタイル設定
var marker = {}; //マーカーのオブジェクト
var prefMarker = {}; //都道府県マーカーのオブジェクト
var iconBase; //アイコン画像のバス
var cats; //カテゴリの設定
var glatlng = {lat: 35.34309245582935, lng: 137.1177203049981}; //マップの中心地
var btn = {};
var btnView = {};


function initialize() {
  //カテゴリ・アイコン画像の設定
  setCat();
  
  //プロットする要素の設定
  setData();

  //マップの作成
  createMap();

  //jsonファイルの読み込み
  getJsonfile()
  .then(() => {
  
    //マーカーのプロット処理
    setMarker();
  }).then(() => {

    //ボタンの表示切り替え設定
    setBtnView();

    //表示するデータの設定
    setZoomData();
  }).catch((e) => {
    console.error(e);
  });
}

//マップの作成・設定
function createMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: glatlng,
    // zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    // rotateControl: boolean,
    fullscreenControl: false
  });
  // スタイル設定
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  // 表示範囲の設定
  map.addListener('dragend', function(){
    var center = map.getCenter();
    if(22.4353 <= center.lat() && center.lat() <= 46.1895 &&
       121.3590 <= center.lng() && center.lng() <= 151.2857) return;
    //日本の範囲外であれば3秒後に中心地に戻す
    window.setTimeout(function(){
      map.panTo(glatlng);
    }, 100);
  });

    // var kesu1 = new google.maps.Marker({ position: {lat: 46.1895, lng: 121.3590}, map: map });
    // var kesu2 = new google.maps.Marker({ position: {lat: 46.1895, lng: 151.2857}, map: map });
    // var kesu3 = new google.maps.Marker({ position: {lat: 22.4353, lng: 121.3590}, map: map });
    // var kesu2 = new google.maps.Marker({ position: {lat: 22.4353, lng: 151.2857}, map: map });

}

//jsonファイルの読み込み
function getJsonfile(){
  return fetch("/assets/json/pref.json", {
    method: "GET",
    credentials: "same-origin",
    mode: "cors"    
  }).then(res => res.json())
  .then(function(response){
    json = response;
    for (var i = 0; i < json.length; i++) {
      var pref = json[i].pref;
      // var url = json[i].url;
      // var addr = json[i].addr;
      var lat = json[i].lat;
      var lng = json[i].lng;
      var cat = json[i].cat;
      //重心は重さをもたないため緯度経度のみで計算する
      json[i].prefcenter = 1;

      //合計するために+する
      Object.keys(data).forEach(function(val){
        //各データの重心地
        data[val].latSum += lat * json[i][val];
        data[val].lngSum += lng * json[i][val];
        data[val].sum += json[i][val];
      });
    }
  });
}

function setMarker(){
  //都道府県のマーカーをプロットする
  setPrefMarker();

  //各データのマーカーをプロットする
  setDataMarker();
}

function setPrefMarker(){
  //都道府県のマーカーをプロットする
  for (var i = 0; i < json.length; i++) {
    var pref = json[i].pref;
    var lat = json[i].lat;
    var lng = json[i].lng;
    prefMarker[pref] = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: pref,
      icon: cats.prefecture.icon,
      zIndex: 1
    });
  }
}

//各データのマーカーをプロットする
function setDataMarker(){
  //全データの重心地
  centerData["total"] = { latSum: 0, lngSum: 0, sum: 0 };
  marker["total"] = {};

  Object.keys(data).forEach(function(val,i){
    //全てのデータのプロットをする
    marker[val] = {};
    plotMarker(val, data[val].latSum/data[val].sum, data[val].lngSum/data[val].sum, 
      data[val].title, cats[data[val].cat].icon, data[val].text, 2);
    //分野ごとの重心地を計算する
    if(!centerData[data[val].cat]) centerData[data[val].cat] = { latSum: 0, lngSum: 0, sum: 0 };
    if(data[val].latSum) centerData[data[val].cat].latSum += data[val].latSum;
    if(data[val].lngSum) centerData[data[val].cat].lngSum += data[val].lngSum;
    if(data[val].sum) centerData[data[val].cat].sum += data[val].sum;

    //重心地計算終了後
    if((Object.keys(data).length-1)==i){
      //全分野の重心地データから1つの重心地を求める
      Object.keys(centerData).forEach(function(val2,i2){
        centerData.total.latSum += centerData[val2].latSum;
        centerData.total.lngSum += centerData[val2].lngSum;
        centerData.total.sum += centerData[val2].sum;

        //分野の重心地をプロットする
        marker[val2] = {};
        if(val2!="prefecture" && val2!="total") plotMarker(val2, centerData[val2].latSum/centerData[val2].sum, centerData[val2].lngSum/centerData[val2].sum, 
            cats[val2].title, cats[val2].icon, cats[val2].text, 3);

        //全分野の重心地から求めた重心地をプロットする
        if((Object.keys(centerData).length-1)==i2){
          plotMarker("total", centerData.total.latSum/centerData.total.sum, centerData.total.lngSum/centerData.total.sum, 
            cats.total.title, cats.total.icon, cats.total.text, 4);
        }
      });
    }
  });
}

function setBtnView(){
  //使い方ボタン
  btn.howto = document.getElementById("btnHowto");
  btn.howtoRemove = document.getElementById("btnHowtoRemove");
  btn.howto.onclick = () => { displayHowto(); };
  btn.howtoRemove.onclick = () => { displayHowto(); };
  btnView.howto = document.getElementById("howto");

  //全体重心地切り替えボタン
  // btn.stage1 = document.getElementById("stage1");
  // btn.stage1.onclick = () => { moveCenterPlace("全体重心地"); };

  // //分野ごとの重心地切り替えボタン
  // btn.stage2 = document.getElementById("stage2");
  // btn.stage2.onclick = () => { moveCenterPlace("分野ごとの重心地"); };

  // //土地の重心地切り替えボタン
  // btn.stage3 = document.getElementById("stage3");
  // btn.stage3.onclick = () => { moveCenterPlace("分野ごとの重心地"); };

  // //文化の重心地切り替えボタン
  // btn.stage4 = document.getElementById("stage4");
  // btn.stage4.onclick = () => { moveCenterPlace("分野ごとの重心地"); };
}

//ズーム度合いによって見せるデータを変える処理
function setZoomData(){
  //最初は重心地以外のデータを非表示にする
  changeCatView(["total"], true);
  changeCatDataView([], true);

  //全体重心地をクリックしたら他の分野の重心地を表示する
  marker["total"].plot.addListener('click',function(){
    moveCenterPlace("分野ごとの重心地");
  });

  Object.keys(centerData).forEach(function(val){
    //分野の重心地の選択処理
    if(val!="prefecture" && val!="total"){
      marker[val].plot.addListener('click',function(){
        moveCenterPlace("分野の重心地データ一覧",val);
      });
      marker[val].plot.addListener('rightclick',function(){
        moveCenterPlace("全体重心地");
      });
    }
  });

  Object.keys(data).forEach(function(val){
    var nowDisplay = "catData";
    //各データの重心地　選択処理
    marker[val].plot.addListener('click',function(){
      if(nowDisplay=="catData"){
        moveCenterPlace("重心地データ詳細",val);
        nowDisplay = "dataDetail";
      }else{
        moveCenterPlace("分野の重心地データ一覧",data[val].cat);
        nowDisplay = "catData";
      }
    });
    marker[val].plot.addListener('rightclick',function(){
      if(nowDisplay=="catData"){
        moveCenterPlace("分野ごとの重心地");
      } else {
        moveCenterPlace("分野の重心地データ一覧",data[val].cat);
        nowDisplay = "catData";
      }
    });

  });
}

//カテゴリごとの重心地の表示切り替え処理　指定したカテゴリピンのみ表示・非表示を切り替える
function changeCatView(c, isView){
  Object.keys(centerData).forEach(function(val){
    if(c.includes(val)) isView? marker[val].plot.setMap(map) : marker[val].plot.setMap(null);
    else isView? marker[val].plot.setMap(null) : marker[val].plot.setMap(map);
  });
};

//カテゴリピンの表示切り替え処理
function changeCatDataView(c, isView){
  Object.keys(data).forEach(function(val){
    if(c.includes(data[val].cat)) isView? marker[val].plot.setMap(map) : marker[val].plot.setMap(null);
    else isView? marker[val].plot.setMap(null) : marker[val].plot.setMap(map);
  });
}

//各データごとの表示切り替え処理
function changeDataDetailView(d, isView){
  Object.keys(data).forEach(function(val){
    if(d.includes(val)) isView? marker[val].plot.setMap(map) : marker[val].plot.setMap(null);
    else isView? marker[val].plot.setMap(null) : marker[val].plot.setMap(map);
  });
}



//都道府県ごとのデータを見せる処理
function changeDataDetailPrefView(val){
  var min = data[val].min;
  var max = data[val].max;
  Object.keys(json).forEach(function(i){
    var prefVal;
    if(min == 0 && max == 0){
      prefVal = 0;
    } else{
      prefVal = (json[i][val] - min) / (max / 10);
      prefVal = (10 < Math.ceil(prefVal))? 10 : Math.ceil(prefVal);          
    }
    prefMarker[json[i].pref].setIcon(iconBase + '../prefectureSize/size' + prefVal + '.png');
  });
}

//都道府県重心地の表示切り替え処理
function changeViewPref(isView){
  if(isView){ //trueなら表示
    Object.keys(prefMarker).forEach(function(val){
      prefMarker[val].setMap(map);
    });
  } else { //falseなら非表示
    Object.keys(prefMarker).forEach(function(val){
      prefMarker[val].setMap(null);
    });
  }
}

//都道府県の重心地のアイコンをデフォルトに戻す
function changeDefaultPrefIcon(){
  Object.keys(json).forEach(function(i){
    prefMarker[json[i].pref].setIcon(cats.prefecture.icon);
  });
}

//ボタンの表示切り替え
function changeBtn(stage){
  Object.keys(btn).map(function(i){
    btn[i].style.background = (stage==i)? "#333" : "#FFF";
    btn[i].style.color = (stage==i)? "#DDD" : "#000";
  });
}

//使い方表示処理
function displayHowto(){
  var isView=btnView.howto.getAttribute("data-visible");
  if(isView){
    btnView.howto.style.display = "none";
    btnView.howto.setAttribute("data-visible", "");
  } else {
    btnView.howto.style.display = "block";
    btnView.howto.setAttribute("data-visible", "1");
  }
}

//表示切り替え処理
function moveCenterPlace(stage,val){
  switch (stage){
    case "全体重心地":
      map.setZoom(5);
      map.panTo(glatlng);
      changeCatView(["total"], true);
      changeCatDataView([], true);
      changeBtn("stage1");
      changeDefaultPrefIcon();
      break;
    case "分野ごとの重心地":
      map.setZoom(7);
      map.panTo(glatlng);
      changeCatView(["population", "land", "amusement", "economy", "traffic", "life"], true);
      changeCatDataView([], true);
      changeBtn("stage2");
      changeDefaultPrefIcon();
      break;
    case "分野の重心地データ一覧":
      map.setZoom(8);
      map.panTo(marker[val].plot.getPosition());
      changeCatView([], true);
      changeCatDataView([val], true);
      changeBtn("stage3");
      changeDefaultPrefIcon();
      break;
    case "重心地データ詳細":
      map.setZoom(5);
      map.panTo(glatlng);
      changeDataDetailView([val], true);
      changeDataDetailPrefView(val);
      changeBtn("stage4");
      break;
  }
}

function setData(){
  //データの分類設定
  data = {
    people: { cat: "population", title: "人口重心地", text: "人口の重心地", min: 589, max: 13159, latSum: 0, lngSum: 0, sum: 0 },
    japanpeople: { cat: "population", title: "日本人人口重心地", text: "日本人人口数の重心地", min: 582, max: 12624, latSum: 0, lngSum: 0, sum: 0 },
    foreignpeople: { cat: "population", title: "外国人人口重心地", text: "外国人人口数の重心地", min: 3, max: 319, latSum: 0, lngSum: 0, sum: 0 },
    prefcenter: { cat: "land", title: "都道府県の重心地を点とした重心地", text: "都道府県の重心地を点とした重心地", min: 0, max: 0, latSum: 0, lngSum: 0, sum: 0 },
    forest: { cat: "land", title: "森林面積の重心地", text: "森林面積の重心地", min: 30.1, max: 83.3, latSum: 0, lngSum: 0, sum: 0 },
    movie: { cat: "amusement", title: "映画館の重心地", text: "映画館スクリーン数の重心地", min: 11, max: 363, latSum: 0, lngSum: 0, sum: 0 },
    museum: { cat: "amusement", title: "博物館の重心地", text: "博物館数の重心地", min: 5, max: 95, latSum: 0, lngSum: 0, sum: 0 },
    library: { cat: "amusement", title: "図書館の重心地", text: "図書館数の重心地", min: 27, max: 397, latSum: 0, lngSum: 0, sum: 0 },
    prefpro: { cat: "economy", title: "県内総生産重心地", text: "県内総生産の重心地", min: 1779178, max: 94902086, latSum: 0, lngSum: 0, sum: 0 },
    savings: { cat: "economy", title: "貯蓄現在高（１世帯当たり）の重心地", text: "貯蓄現在高の重心地", min: 5747, max: 19669, latSum: 0, lngSum: 0, sum: 0 },
    traffic1: { cat: "traffic", title: "到達エリア面積の~1時間重心地", text: "到達エリア面積~1時間の重心地", min: 0.03, max: 0.47, latSum: 0, lngSum: 0, sum: 0 },
    traffic5: { cat: "traffic", title: "到達エリア面積の~5時間重心地", text: "到達エリア面積~5時間の重心地", min: 7.01, max: 37.11, latSum: 0, lngSum: 0, sum: 0 },
    traffic10: { cat: "traffic", title: "到達エリア面積の~10時間重心地", text: "到達エリア面積~10時間の重心地", min: 77.03, max: 98.39, latSum: 0, lngSum: 0, sum: 0 },
    foodstore: { cat: "life", title: "食品スーパーマーケットの重心地", text: "食品スーパーマーケット数の重心地", min: 90, max: 2394, latSum: 0, lngSum: 0, sum: 0 },
    farm: { cat: "life", title: "農家数の重心地", text: "販売農家数の重心地", min: 5623, max: 57239, latSum: 0, lngSum: 0, sum: 0 },
    finallandfill: { cat: "life", title: "最終処分場残余容量の重心地", text: "最終処分場残余容量の重心地", min: 0, max: 23571, latSum: 0, lngSum: 0, sum: 0 },
    // securities: { cat: "culture", title: "有価証券現在高割合（対貯蓄現在高）の重心地", text: "有価証券現在高割合の重心地", min: 5.4, max: 21.9, latSum: 0, lngSum: 0, sum: 0 },
    // vacant: { cat: "culture", title: "空き家比率（対総住宅数）の重心地", text: "空き家比率の重心地", min: 9.4, max: 22, latSum: 0, lngSum: 0, sum: 0 },
    // retailstore: { cat: "store", title: "小売店数（人口千人当たり）の重心地", text: "小売店数の重心地", min: 5.74, max: 11.13, latSum: 0, lngSum: 0, sum: 0 },
    // recycling: { cat: "culture", title: "ごみのリサイクル率の重心地", text: "ごみのリサイクル率の重心地", min: 13.5, max: 30.7, latSum: 0, lngSum: 0, sum: 0 },
    // landfill: { cat: "culture", title: "ごみ埋立率の重心地", text: "ごみ埋立率の重心地", min: 4.9, max: 18.2, latSum: 0, lngSum: 0, sum: 0 },
    // admini: { cat: "culture", title: "行政基盤 財政力指数の重心地", text: "財政力指数の重心地", min: 229, max: 925, latSum: 0, lngSum: 0, sum: 0 },
    // quake: { title: "震度５弱以上を観測した地震の県重心地重心地", text: "震度５弱以上の地震が発生した重心地", latSum: 0, lngSum: 0, sum: 0 },
    // largeretailstore: { cat: "store",  title: "大型小売店数（人口10万人当たり）の重心地", text: "大型小売店数の重心地", min: 9.22, max: 16.77, latSum: 0, lngSum: 0, sum: 0 },
    // department: { cat: "store",  title: "百貨店，総合スーパー数（人口10万人当たり）の重心地", text: "百貨店，総合スーパー数の重心地", min: 0.71, max: 2.11, latSum: 0, lngSum: 0, sum: 0 },
    // convenience: { cat: "store",  title: "コンビニエンスストア数（人口10万人当たり）の重心地", text: "コンビニエンスストア数の重心地", min: 17.1, max: 40.6, latSum: 0, lngSum: 0, sum: 0 },
    // restaurant: { cat: "store",  title: "飲食店数（人口千人当たり）の重心地", text: "飲食店数の重心地", min: 3.25, max: 7.21, latSum: 0, lngSum: 0, sum: 0 },
    // bathhouse: { cat: "store",  title: "公衆浴場数（人口10万人当たり）の重心地", text: "公衆浴場数の重心地", min: 0, max: 0, latSum: 0, lngSum: 0, sum: 0 },
    // municipalroad: { cat: "land", title: "市町村道舗装率（対市町村道実延長）の重心地", text: "市町村道舗装率の重心地", min: 0.1, max: 24.3, latSum: 0, lngSum: 0, sum: 0 },
    // urbanparkarea: { cat: "land", title: "都市公園面積（人口１人当たり）の重心地", text: "都市公園面積の重心地", min: 4.34, max: 25.6, latSum: 0, lngSum: 0, sum: 0 },
    // urbanpark: { cat: "land", title: "都市公園数(可住地面積100k㎡当たり)の重心地", text: "都市公園数の重心地", min: 18.15, max: 576.32, latSum: 0, lngSum: 0, sum: 0 },
    // income: { cat: "culture", title: "実収入（１世帯当たり１か月間）の重心地", text: "実収入の重心地", min: 395.8, max: 631.5, latSum: 0, lngSum: 0, sum: 0 },
    // liabilities: { cat: "culture", title: "負債現在高（１世帯当たり）の重心地", text: "負債現在高の重心地", min: 2734, max: 7889, latSum: 0, lngSum: 0, sum: 0 },
    // automobile: { cat: "have", title: "自動車所有数量（千世帯当たり）の重心地", text: "自動車所有数量の重心地", min: 665, max: 2111, latSum: 0, lngSum: 0, sum: 0 },
    // microwave: { cat: "have", title: "電子レンジ所有数量（千世帯当たり）の重心地", text: "電子レンジの重心地", min: 1004, max: 1105, latSum: 0, lngSum: 0, sum: 0 },
    // conditioner: { cat: "have", title: "ルームエアコン所有数量（千世帯当たり）の重心地", text: "ルームエアコン所有数量", min: 344, max: 3849, latSum: 0, lngSum: 0, sum: 0 },
    // smartphone: { cat: "have", title: "スマートフォン所有数量（千世帯当たり）の重心地", text: "スマートフォン所有数量の重心地", min: 826, max: 1281, latSum: 0, lngSum: 0, sum: 0 },
    // computer: { cat: "have", title: "パソコン所有数量（千世帯当たり）の重心地", text: "パソコン所有数量の重心地", min: 850, max: 1570, latSum: 0, lngSum: 0, sum: 0 },
    // firestation: { cat: "culture", title: "消防署数(可住地面積100k㎡当たり)の重心地", text: "消防署数の重心地", min: 2, max: 21.6, latSum: 0, lngSum: 0, sum: 0 },
    // firefighter: { cat: "culture", title: "消防吏員数（人口10万人当たり）の重心地", text: "消防吏員数の重心地", min: 93.6, max: 200.9, latSum: 0, lngSum: 0, sum: 0 },
    // firefire: { cat: "culture", title: "火災出火件数（人口10万人当たり）の重心地", text: "火災出火件数の重心地", min: 20.5, max: 51.8, latSum: 0, lngSum: 0, sum: 0 },
    // buildingfire: { cat: "culture", title: "建物火災出火件数（人口10万人当たり）の重心地", text: "建物火災出火件数の重心地", min: 11.1, max: 23.1, latSum: 0, lngSum: 0, sum: 0 },
    // trafficaccident: { cat: "culture", title: "交通事故発生件数（人口10万人当たり）の重心地", text: "交通事故発生件数の重心地", min: 82.1, max: 2210.2, latSum: 0, lngSum: 0, sum: 0 },
    // policestation: { cat: "culture", title: "警察署・交番・駐在所数(可住地面積100k㎡当たり)の重心地", text: "警察署・交番・駐在所数の重心地", min: 3.5, max: 83.6, latSum: 0, lngSum: 0, sum: 0 },
    // policeman: { cat: "culture", title: "警察官数（人口千人当たり）の重心地", text: "警察官数の重心地", min: 1.57, max: 3.22, latSum: 0, lngSum: 0, sum: 0 },
    // pollution: { cat: "culture", title: "公害苦情件数（人口10万人当たり）の重心地", text: "公害苦情件数の重心地", min: 15.5, max: 62.8, latSum: 0, lngSum: 0, sum: 0 }
  };

  //マップの表示スタイル設定
  styledMapType = new google.maps.StyledMapType([
  { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.neighborhood", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "color": "#333333" }, { "weight": 1 }] },
  // { "featureType": "administrative.locality", "stylers": [{ "visibility": "off" }] },
  { "featureType": "landscape", "stylers": [{ "visibility": "off" }] },
  { "featureType": "poi", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] },
  { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "featureType": "transit", "stylers": [{ "visibility": "off" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#f0f8ff" }] },
  { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }
  ], {name: 'Styled Map'});
}

//マーカーを作成する
function plotMarker(val, lat, lng, title, iconimg, text, zindex){
  marker[val].plot = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    title: title,
    icon: iconimg,
    zIndex: zindex
  });
  marker[val].window = setTextContent(title, text);
  marker[val].plot.addListener('mouseover',function(){
    marker[val].window.open(map, marker[val].plot);
  });
  marker[val].plot.addListener('mouseout',function(){
    marker[val].window.close(map, marker[val].plot);
  });
}

//カテゴリの設定
function setCat(){
  iconBase = '/assets/img/mapicon/';
  cats = {
    total: { icon: iconBase + 'center.png', title:'日本の重心地 -首都-', text:'全分野の重心地から取得した重心地' },
    prefecture: { icon: iconBase + 'prefecture.png', title:'都道府県一覧', text:'' },
    population: { icon: iconBase + 'population.png', title:'人口の重心地', text:'' },
    land: { icon: iconBase + 'land.png', title:'土地の重心地', text:'' },
    amusement: { icon: iconBase + 'amusement.png', title:'娯楽の重心地', text:'' },
    economy: { icon: iconBase + 'economy.png', title:'経済の重心地', text:'' },
    traffic: { icon: iconBase + 'traffic.png', title:'交通の重心地', text:'' },
    life: { icon: iconBase + 'life.png', title:'生活の重心地', text:'' }
  };
}

function setTextContent(title, text){
  string = '<div id="content">'+
           '<h1 id="firstHeading" class="firstHeading">'+title+'</h1>'+
           '<div id="bodyContent">'+
           '<p>'+text+'</p>'+
           '</div>'+
           '</div>';
  return new google.maps.InfoWindow({
    content: string
  });
}
