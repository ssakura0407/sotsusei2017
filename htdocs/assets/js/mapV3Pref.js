var map;
var json;

function initialize() {
  //基準を決める
  var glatlng = {lat: 36.13787471840729, lng: 137.903515625};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: glatlng
  });
  // var marker = new google.maps.Marker({
  //   position: glatlng,
  //   map: map
  // });

  createMap("/assets/json/pref.json");
}

function createMap(jsondata){
  var httpObj = new XMLHttpRequest();
  httpObj.open("get", jsondata, true);
  httpObj.onload = function() {

    json = JSON.parse(this.responseText);
    // console.log("都道府県jsonの合計数: "+json.length);

    for (var i = 0; i < json.length; i++) {
      // console.log(json[i]);
      var pref = json[i].pref;
      var url = json[i].url;
      var addr = json[i].addr;
      // var lat = json[i].lat;
      // var lng = json[i].lng;
      var lat = json[i].gsiLat;
      var lng = json[i].gsiLng;

      // console.log(pref+" lat:"+lat+" lng:"+lng);

      //ここでマップにマーカーをつけている
      var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        title: pref
      });

    }
  }
  httpObj.send(null);  
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
