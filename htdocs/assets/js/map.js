var map; //googlemapのオブジェクト
var json; //緯度経度格納jsonファイル
var data; //マーカーの情報
var styledMapType; //マーカーのスタイル設定
var marker = {}; //マーカーのオブジェクト
var prefMarker = {}; //都道府県マーカーのオブジェクト
var iconBase; //アイコン画像のバス
var icons; //アイコン画像の設定

function initialize() {
  //アイコン画像の設定
  setIcon();
  
  //プロットする要素の設定
  setData();

  //マップの作成
  createMap();

  //jsonファイルの読み込み
  getJsonfile()
  .then(() => {
    //マーカーのプロット処理
    setMarker();
    //ボタンの表示切り替え設定
    setBtnView();
  }).catch((e) => {
    console.error(e);
  });
}

//マップの作成・設定
function createMap(){
  var glatlng = {lat: 35.1307, lng: 136.0807};
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
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  map.addListener('center_changed', function() {
    window.setTimeout(function(){
      map.panTo(glatlng);
    }, 3000);
  });
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
      //重心は重さをもたないため緯度経度のみで計算する
      json[i].center = 1;

      //合計するために+する
      Object.keys(data).forEach(function(val){
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
      icon: icons["prefecture"].icon,
    });
  }
}

//各データのマーカーをプロットする
function setDataMarker(){
  Object.keys(data).forEach(function(val){
    marker[val] = {};
    marker[val].plot = new google.maps.Marker({
      position: {lat: data[val].latSum/data[val].sum, lng: data[val].lngSum/data[val].sum},
      map: map,
      title: data[val].title,
      icon: icons[data[val].cat].icon
    });
    marker[val].window = setTextContent(data[val].title, data[val].text);
    marker[val].plot.addListener('mouseover',function(){
      marker[val].window.open(map, marker[val].plot);
    });
    marker[val].plot.addListener('mouseout',function(){
      marker[val].window.close(map, marker[val].plot);
    });
  });
}

function setBtnView(){
  //重心地切り替えボタン
  var btnCenter = document.getElementById("center");
  btnCenter.onclick = () => { changeView("center"); };

  //県の重心地切り替えボタン
  var btnPrefecture = document.getElementById("prefecture");
  btnPrefecture.onclick = () => { changeViewPref(); };

  //土地の重心地切り替えボタン
  var btnLand = document.getElementById("land");
  btnLand.onclick = () => { changeView("land"); };

  //文化の重心地切り替えボタン
  var btnCulture = document.getElementById("culture");
  btnCulture.onclick = () => { changeView("culture"); };

  //店舗数の重心地切り替えボタン
  var btnStore = document.getElementById("store");
  btnStore.onclick = () => { changeView("store"); };

  //重心地切り替えボタン
  var btnHave = document.getElementById("have");
  btnHave.onclick = () => { changeView("have"); };

}

function changeView(cat){
  if(icons[cat].view == true){
    Object.keys(data).forEach(function(val){
      if(data[val].cat == cat){
        marker[val].plot.setMap(null);
        icons[cat].view = false;
      }
    });
  } else {
    Object.keys(data).forEach(function(val){
      if(data[val].cat == cat){
        marker[val].plot.setMap(map);
        icons[cat].view = true;
      }
    });
  }
  console.log("click btn");
}

function changeViewPref(){
  if(icons["prefecture"].view == true){
    Object.keys(prefMarker).forEach(function(val){
      prefMarker[val].setMap(null);
      icons["prefecture"].view = false;
    });
  } else {
    Object.keys(prefMarker).forEach(function(val){
      prefMarker[val].setMap(map);
      icons["prefecture"].view = true;
    });
  }
}

function setData(){
  //データの分類設定
  data = {
    center: { cat: "center", title: "重心地", text: "土地の重心地", latSum: 0, lngSum: 0, sum: 0 },
    people: { cat: "center", title: "人口重心地", text: "人口の重心地", latSum: 0, lngSum: 0, sum: 0 },
    prefpro: { cat: "center", title: "県内総生産重心地", text: "県内総生産の重心地", latSum: 0, lngSum: 0, sum: 0 },
    // quake: { title: "震度５弱以上を観測した地震の県重心地重心地", text: "震度５弱以上の地震が発生した重心地", latSum: 0, lngSum: 0, sum: 0 },
    traffic1: { cat: "land", title: "到達エリア面積の~1時間重心地", text: "到達エリア面積~1時間の重心地", latSum: 0, lngSum: 0, sum: 0 },
    traffic5: { cat: "land", title: "到達エリア面積の~5時間重心地", text: "到達エリア面積~5時間の重心地", latSum: 0, lngSum: 0, sum: 0 },
    traffic10: { cat: "land", title: "到達エリア面積の~10時間重心地", text: "到達エリア面積~10時間の重心地", latSum: 0, lngSum: 0, sum: 0 },
    forest: { cat: "land", title: "森林面積の重心地", text: "森林面積の重心地", latSum: 0, lngSum: 0, sum: 0 },
    admini: { cat: "culture", title: "行政基盤 財政力指数の重心地", text: "財政力指数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    museum: { cat: "culture", title: "人口100万人当たりの博物館数指標値の重心地", text: "博物館数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    vacant: { cat: "culture", title: "空き家比率（対総住宅数）の重心地", text: "空き家比率の重心地", latSum: 0, lngSum: 0, sum: 0 },
    recycling: { cat: "culture", title: "ごみのリサイクル率の重心地", text: "ごみのリサイクル率の重心地", latSum: 0, lngSum: 0, sum: 0 },
    landfill: { cat: "culture", title: "ごみ埋立率の重心地", text: "ごみ埋立率の重心地", latSum: 0, lngSum: 0, sum: 0 },
    finallandfill: { cat: "culture", title: "最終処分場残余容量の重心地", text: "最終処分場残余容量の重心地", latSum: 0, lngSum: 0, sum: 0 },
    retailstore: { cat: "store", title: "小売店数（人口千人当たり）の重心地", text: "小売店数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    foodstore: { cat: "store", title: "食品スーパーマーケットの重心地", text: "食品スーパーマーケット数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    largeretailstore: { cat: "store",  title: "大型小売店数（人口10万人当たり）の重心地", text: "大型小売店数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    department: { cat: "store",  title: "百貨店，総合スーパー数（人口10万人当たり）の重心地", text: "百貨店，総合スーパー数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    convenience: { cat: "store",  title: "コンビニエンスストア数（人口10万人当たり）の重心地", text: "コンビニエンスストア数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    restaurant: { cat: "store",  title: "飲食店数（人口千人当たり）の重心地", text: "飲食店数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    bathhouse: { cat: "store",  title: "公衆浴場数（人口10万人当たり）の重心地", text: "公衆浴場数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    municipalroad: { cat: "land", title: "市町村道舗装率（対市町村道実延長）の重心地", text: "市町村道舗装率の重心地", latSum: 0, lngSum: 0, sum: 0 },
    urbanparkarea: { cat: "land", title: "都市公園面積（人口１人当たり）の重心地", text: "都市公園面積の重心地", latSum: 0, lngSum: 0, sum: 0 },
    urbanpark: { cat: "land", title: "都市公園数(可住地面積100k㎡当たり)の重心地", text: "都市公園数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    income: { cat: "culture", title: "実収入（１世帯当たり１か月間）の重心地", text: "実収入の重心地", latSum: 0, lngSum: 0, sum: 0 },
    savings: { cat: "culture", title: "貯蓄現在高（１世帯当たり）の重心地", text: "貯蓄現在高の重心地", latSum: 0, lngSum: 0, sum: 0 },
    securities: { cat: "culture", title: "有価証券現在高割合（対貯蓄現在高）の重心地", text: "有価証券現在高割合の重心地", latSum: 0, lngSum: 0, sum: 0 },
    liabilities: { cat: "culture", title: "負債現在高（１世帯当たり）の重心地", text: "負債現在高の重心地", latSum: 0, lngSum: 0, sum: 0 },
    automobile: { cat: "have", title: "自動車所有数量（千世帯当たり）の重心地", text: "自動車所有数量の重心地", latSum: 0, lngSum: 0, sum: 0 },
    microwave: { cat: "have", title: "電子レンジ所有数量（千世帯当たり）の重心地", text: "電子レンジの重心地", latSum: 0, lngSum: 0, sum: 0 },
    conditioner: { cat: "have", title: "ルームエアコン所有数量（千世帯当たり）の重心地", text: "ルームエアコン所有数量", latSum: 0, lngSum: 0, sum: 0 },
    smartphone: { cat: "have", title: "スマートフォン所有数量（千世帯当たり）の重心地", text: "スマートフォン所有数量の重心地", latSum: 0, lngSum: 0, sum: 0 },
    computer: { cat: "have", title: "パソコン所有数量（千世帯当たり）の重心地", text: "パソコン所有数量の重心地", latSum: 0, lngSum: 0, sum: 0 },
    firestation: { cat: "culture", title: "消防署数(可住地面積100k㎡当たり)の重心地", text: "消防署数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    firefighter: { cat: "culture", title: "消防吏員数（人口10万人当たり）の重心地", text: "消防吏員数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    firefire: { cat: "culture", title: "火災出火件数（人口10万人当たり）の重心地", text: "火災出火件数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    buildingfire: { cat: "culture", title: "建物火災出火件数（人口10万人当たり）の重心地", text: "建物火災出火件数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    trafficaccident: { cat: "culture", title: "交通事故発生件数（人口10万人当たり）の重心地", text: "交通事故発生件数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    policestation: { cat: "culture", title: "警察署・交番・駐在所数(可住地面積100k㎡当たり)の重心地", text: "警察署・交番・駐在所数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    policeman: { cat: "culture", title: "警察官数（人口千人当たり）の重心地", text: "警察官数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    pollution: { cat: "culture", title: "公害苦情件数（人口10万人当たり）の重心地", text: "公害苦情件数の重心地", latSum: 0, lngSum: 0, sum: 0 }
  };

  styledMapType = new google.maps.StyledMapType([
  { "featureType": "administrative.land_parcel",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.neighborhood",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#333333" }, { "weight": 1 }] },
  { "featureType": "administrative.locality",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "poi.business",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "road",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "road",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "transit",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#add8e6" }] },
  { "featureType": "water",
    "elementType": "labels.text",
    "stylers": [{ "visibility": "off" }] },
  { "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9e9e9e" }] }
  ], {name: 'Styled Map'});
}

//アイコン画像の設定
function setIcon(){
  iconBase = '/assets/img/mapicon/';
  icons = {
    prefecture: { icon: iconBase + 'prefecture.png', view: true },
    center: { icon: iconBase + 'center.png', view: true },
    land: { icon: iconBase + 'land.png', view: true },
    culture: { icon: iconBase + 'culture.png', view: true },
    store: { icon: iconBase + 'store.png', view: true },
    have: { icon: iconBase + 'have.png', view: true }
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
