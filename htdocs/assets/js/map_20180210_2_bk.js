var map; //googlemapのオブジェクト
var json; //緯度経度格納jsonファイル
var data; //マーカーの情報
var marker = {}; //マーカーのオブジェクト

var centerMarker;


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
//森林面積の重心を求めるために合計する
var latForestSum = 0;
var lngForestSum = 0;
var forestSum = 0;
//財政力指数の重心を求めるために合計する
var latAdminiSum = 0;
var lngAdminiSum = 0;
var adminiSum = 0;
//博物館数の重心を求めるために合計する
var latMuseumSum = 0;
var lngMuseumSum = 0;
var museumSum = 0;
//空き家比率の重心を求めるために合計する
var latVacantSum = 0;
var lngVacantSum = 0;
var vacantSum = 0;
//ごみのリサイクル率の重心を求めるために合計する
var latRecyclingSum = 0;
var lngRecyclingSum = 0;
var recyclingSum = 0;
//ごみ埋立率の重心を求めるために合計する
var latLandfillSum = 0;
var lngLandfillSum = 0;
var landfillSum = 0;
//最終処分場残余容量の重心を求めるために合計する
var latFinalLandfillSum = 0;
var lngFinalLandfillSum = 0;
var finallandfillSum = 0;
//小売店数の重心を求めるために合計する
var latRetailstoreSum = 0;
var lngRetailstoreSum = 0;
var retailstoreSum = 0;
//大型小売店数の重心を求めるために合計する
var latLargeRetailstoreSum = 0;
var lngLargeRetailstoreSum = 0;
var largeretailstoreSum = 0;
//百貨店，総合スーパー数の重心を求めるために合計する
var latDepartmentSum = 0;
var lngDepartmentSum = 0;
var departmentSum = 0;
//コンビニエンスストア数の重心を求めるために合計する
var latCconvenienceSum = 0;
var lngConvenienceSum = 0;
var convenienceSum = 0;
//飲食店数の重心を求めるために合計する
var latRestaurantSum = 0;
var lngRestaurantSum = 0;
var restaurantSum = 0;
//公衆浴場数の重心を求めるために合計する
var latBathhouseSum = 0;
var lngBathhouseSum = 0;
var bathhouseSum = 0;
//市町村道舗装率の重心を求めるために合計する
var latMunicipalRoadSum = 0;
var lngMunicipalRoadSum = 0;
var municipalroadSum = 0;
//都市公園面積の重心を求めるために合計する
var latUrbanparkAreaSum = 0;
var lngUrbanparkAreaSum = 0;
var urbanparkareaSum = 0;
//都市公園数の重心を求めるために合計する
var latUrbanparkSum = 0;
var lngUrbanparkSum = 0;
var urbanparkSum = 0;
//実収入の重心を求めるために合計する
var latIncomeSum = 0;
var lngIncomeSum = 0;
var incomeSum = 0;
//貯蓄現在高の重心を求めるために合計する
var latSavingsSum = 0;
var lngSavingsSum = 0;
var savingsSum = 0;
//有価証券現在高割合の重心を求めるために合計する
var latSecuritiesSum = 0;
var lngSecuritiesSum = 0;
var securitiesSum = 0;
//負債現在高の重心を求めるために合計する
var latLiabilitiesSum = 0;
var lngLiabilitiesSum = 0;
var liabilitiesSum = 0;
//自動車所有数量の重心を求めるために合計する
var latAutomobileSum = 0;
var lngAutomobileSum = 0;
var automobileSum = 0;
//電子レンジの重心を求めるために合計する
var latMicrowaveSum = 0;
var lngMicrowaveSum = 0;
var microwaveSum = 0;
//ルームエアコン所有数量の重心を求めるために合計する
var latConditionerSum = 0;
var lngConditionerSum = 0;
var conditionerSum = 0;
//スマートフォンの重心を求めるために合計する
var latSmartphoneSum = 0;
var lngSmartphoneSum = 0;
var smartphoneSum = 0;
//パソコン所有数量の重心を求めるために合計する
var latComputerSum = 0;
var lngComputerSum = 0;
var computerSum = 0;
//消防署数の重心を求めるために合計する
var latFirestationSum = 0;
var lngFirestationSum = 0;
var firestationSum = 0;
//消防吏員数の重心を求めるために合計する
var latFirefighterSum = 0;
var lngFirefighterSum = 0;
var firefighterSum = 0;
//火災出火件数の重心を求めるために合計する
var latFirefireSum = 0;
var lngFirefireSum = 0;
var firefireSum = 0;
//建物火災出火件数の重心を求めるために合計する
var latBuildingfireSum = 0;
var lngBuildingfireSum = 0;
var buildingfireSum = 0;
//交通事故発生件数の重心を求めるために合計する
var latTrafficaccidentSum = 0;
var lngTrafficaccidentSum = 0;
var trafficaccidentSum = 0;
//警察署・交番・駐在所数の重心を求めるために合計する
var latPolicestationSum = 0;
var lngPolicestationSum = 0;
var policestationSum = 0;
//警察官数の重心を求めるために合計する
var latPolicemanSum = 0;
var lngPolicemanSum = 0;
var policemanSum = 0;
//公害苦情件数の重心を求めるために合計する
var latPollutionSum = 0;
var lngPollutionSum = 0;
var pollutionSum = 0;

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
  getJsonfile().then(() => {
    setMarker();
  }).catch((e) => {
    console.error(e);
  });
}

function createMap(){
  var glatlng = {lat: 35.13787471840729, lng: 135.903515625};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: glatlng
  });
}


function getJsonfile(jsondata){
  return new Promise((resolve, reject)=>{
    var httpObj = new XMLHttpRequest();
    httpObj.open("get", "/assets/json/pref_20180210_2.json", true);
    httpObj.onload = () => {
      if(httpObj.status != 200) reject(new Error(httpObj.statusText));

      json = JSON.parse(httpObj.responseText);
      // console.log("都道府県jsonの合計数: "+json.length);

      for (var i = 0; i < json.length; i++) {
        // console.log(json[i]);
        var pref = json[i].pref;
        var url = json[i].url;
        var addr = json[i].addr;
        var lat = json[i].lat;
        var lng = json[i].lng;
        var people = json[i].people;
        var prefpro = json[i].prefpro;
        var quake = json[i].quake;
        var traffic1 = json[i].traffic1;
        var traffic5 = json[i].traffic5;
        var traffic10 = json[i].traffic10;
        var forest = json[i].forest;
        var admini = json[i].admini;
        var museum = json[i].museum;
        var vacant = json[i].vacant;
        var recycling = json[i].recycling;
        var landfill = json[i].landfill;
        var finallandfill = json[i].finallandfill;
        var retailstore = json[i].retailstore;
        var largeretailstore = json[i].largeretailstore;
        var department = json[i].department;
        var convenience = json[i].convenience;
        var restaurant = json[i].restaurant;
        var bathhouse = json[i].bathhouse;
        var municipalroad = json[i].municipalroad;
        var urbanparkarea = json[i].urbanparkarea;
        var urbanpark = json[i].urbanpark;
        var income = json[i].income;
        var savings = json[i].savings;
        var securities = json[i].securities;
        var liabilities = json[i].liabilities;
        var automobile = json[i].automobile;
        var microwave = json[i].microwave;
        var conditioner = json[i].conditioner;
        var smartphone = json[i].smartphone;
        var computer = json[i].computer;
        var firestation = json[i].firestation;
        var firefighter = json[i].firefighter;
        var firefire = json[i].firefire;
        var buildingfire = json[i].buildingfire;
        var trafficaccident = json[i].trafficaccident;
        var policestation = json[i].policestation;
        var policeman = json[i].policeman;
        var pollution = json[i].pollution;

        //重心は重さをもたないため緯度経度のみで計算する
        json[i].center = 1;

        //合計するために+する
        Object.keys(data).forEach(function(val){
          data[val].latSum += lat * json[i][val];
          data[val].lngSum += lng * json[i][val];
          data[val].sum += json[i][val];
        });

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
        latForestSum += lat*forest;
        lngForestSum += lng*forest;
        forestSum += forest;
        latAdminiSum += lat*admini;
        lngAdminiSum += lng*admini;
        adminiSum += admini;
        latMuseumSum += lat*museum;
        lngMuseumSum += lng*museum;
        museumSum += museum;
        latVacantSum += lat*vacant;
        lngVacantSum += lng*vacant;
        vacantSum += vacant;
        latRecyclingSum += lat*recycling;
        lngRecyclingSum += lng*recycling;
        recyclingSum += recycling;
        latLandfillSum += lat*landfill;
        lngLandfillSum += lng*landfill;
        landfillSum += landfill;
        latFinalLandfillSum += lat*finallandfill;
        lngFinalLandfillSum += lng*finallandfill;
        finallandfillSum += finallandfill;
        latRetailstoreSum += lat*retailstore;
        lngRetailstoreSum += lng*retailstore;
        retailstoreSum += retailstore;
        latLargeRetailstoreSum += lat*largeretailstore;
        lngLargeRetailstoreSum += lng*largeretailstore;
        largeretailstoreSum += largeretailstore;
        latDepartmentSum += lat*department;
        lngDepartmentSum += lng*department;
        departmentSum += department;
        latCconvenienceSum += lat*convenience;
        lngConvenienceSum += lng*convenience;
        convenienceSum += convenience;
        latRestaurantSum += lat*restaurant;
        lngRestaurantSum += lng*restaurant;
        restaurantSum += restaurant;
        latBathhouseSum += lat*bathhouse;
        lngBathhouseSum += lng*bathhouse;
        bathhouseSum += bathhouse;
        latMunicipalRoadSum += lat*municipalroad;
        lngMunicipalRoadSum += lng*municipalroad;
        municipalroadSum += municipalroad;
        latUrbanparkAreaSum += lat*urbanparkarea;
        lngUrbanparkAreaSum += lng*urbanparkarea;
        urbanparkareaSum += urbanparkarea;
        latUrbanparkSum += lat*urbanpark;
        lngUrbanparkSum += lng*urbanpark;
        urbanparkSum += urbanpark;
        latIncomeSum += lat*income;
        lngIncomeSum += lng*income;
        incomeSum += income;
        latSavingsSum += lat*savings;
        lngSavingsSum += lng*savings;
        savingsSum += savings;
        latSecuritiesSum += lat*securities;
        lngSecuritiesSum += lng*securities;
        securitiesSum += securities;
        latLiabilitiesSum += lat*liabilities;
        lngLiabilitiesSum += lng*liabilities;
        liabilitiesSum += liabilities;
        latAutomobileSum += lat*automobile;
        lngAutomobileSum += lng*automobile;
        automobileSum += automobile;
        latMicrowaveSum += lat*microwave;
        lngMicrowaveSum += lng*microwave;
        microwaveSum += microwave;
        latConditionerSum += lat*conditioner;
        lngConditionerSum += lng*conditioner;
        conditionerSum += conditioner;
        latSmartphoneSum += lat*smartphone;
        lngSmartphoneSum += lng*smartphone;
        smartphoneSum += smartphone;
        latComputerSum += lat*computer;
        lngComputerSum += lng*computer;
        computerSum += computer;
        latFirestationSum += lat*firestation;
        lngFirestationSum += lng*firestation;
        firestationSum += firestation;
        latFirefighterSum += lat*firefighter;
        lngFirefighterSum += lng*firefighter;
        firefighterSum += firefighter;
        latFirefireSum += lat*firefire;
        lngFirefireSum += lng*firefire;
        firefireSum += firefire;
        latBuildingfireSum += lat*buildingfire;
        lngBuildingfireSum += lng*buildingfire;
        buildingfireSum += buildingfire;
        latTrafficaccidentSum += lat*trafficaccident;
        lngTrafficaccidentSum += lng*trafficaccident;
        trafficaccidentSum += trafficaccident;
        latPolicestationSum += lat*policestation;
        lngPolicestationSum += lng*policestation;
        policestationSum += policestation;
        latPolicemanSum += lat*policeman;
        lngPolicemanSum += lng*policeman;
        policemanSum += policeman;
        latPollutionSum += lat*pollution;
        lngPollutionSum += lng*pollution;
        pollutionSum += pollution;

        // console.log(pref+" lat:"+lat+" lng:"+lng);

        //ここでマップにマーカーをつけている
        var markers = new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map,
          title: pref,
          icon: icons["prefecture"].icon,
        });
      }
      console.log("finish json");
      resolve(httpObj.response);
    }
    httpObj.send(null);  
  });
}

function setMarker(){
  console.log("setMarker");
  Object.keys(data).forEach(function(val){
    marker[val] = {};
    marker[val].plot = new google.maps.Marker({
      position: {lat: data[val].latSum/data[val].sum, lng: data[val].lngSum/data[val].sum},
      map: map,
      title: data[val].title,
      icon: icons["center"].icon
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

    //重心を求める
    /*centerMarker = new google.maps.Marker({
    // var centerMarker = new google.maps.Marker({
      position: {lat: latSum/json.length, lng: lngSum/json.length},
      map: map,
      title: "重心地",
      icon: icons["center"].icon
    });
    var centerWindow = setTextContent("重心地", "土地の重心地");
    // centerMarker.addListener('click',function(){
    //   centerWindow.open(map, centerMarker);
    // });
    centerMarker.addListener('mouseover',function(){
      centerWindow.open(map, centerMarker);
    });
    centerMarker.addListener('mouseout',function(){
      centerWindow.close(map, centerMarker);
    });

    //人口重心を求める
    var peopleCenterMarker = new google.maps.Marker({
      position: {lat: latPeopleSum/peopleSum, lng: lngPeopleSum/peopleSum},
      map: map,
      title: "人口重心地",
      icon: icons["center"].icon
    });
    var peopleCenterWindow = setTextContent("人口重心地", "人口の重心地");
    peopleCenterMarker.addListener('mouseover',function(){
      peopleCenterWindow.open(map, peopleCenterMarker);
    });
    peopleCenterMarker.addListener('mouseout',function(){
      peopleCenterWindow.close(map, peopleCenterMarker);
    });

    //県内総生産重心を求める
    var prefproCenterMarker = new google.maps.Marker({
      position: {lat: latPrefproSum/prefproSum, lng: lngPrefproSum/prefproSum},
      map: map,
      title: "県内総生産重心地",
      icon: icons["center"].icon
    });
    var prefproCenterWindow  = setTextContent("県内総生産重心地", "県内総生産の重心地");
    prefproCenterMarker.addListener('mouseover',function(){
      prefproCenterWindow .open(map, prefproCenterMarker);
    });
    prefproCenterMarker.addListener('mouseout',function(){
      prefproCenterWindow .close(map, prefproCenterMarker);
    });


    // //震度５弱以上を観測した地震の県重心を求める
    // var quakeCenterMarker = new google.maps.Marker({
    //   position: {lat: latQuakeSum/quakeSum, lng: lngQuakeSum/quakeSum},
    //   map: map,
    //   title: "震度５弱以上を観測した地震の県重心地"
    // });
    // var quakeCenterWindow = setTextContent("震度５弱以上を観測した地震の県重心地重心地", "震度５弱以上の地震が発生した重心地");
    // quakeCenterMarker.addListener('click',function(){
    //   quakeCenterWindow.open(map, quakeCenterMarker);
    // });

    //全時間帯別の到達エリア面積の重心を求める
    var traffic1CenterMarker = new google.maps.Marker({
      position: {lat: latTraffic1Sum/traffic1Sum, lng: lngTraffic1Sum/traffic1Sum},
      map: map,
      title: "全時間帯別の到達エリア面積の~1時間重心地",
      icon: icons["land"].icon
    });
    var traffic1CenterWindow = setTextContent("到達エリア面積の~1時間重心地", "到達エリア面積~1時間の重心地");
    // traffic1CenterMarker.addListener('click',function(){
    //   traffic1CenterWindow.open(map, traffic1CenterMarker);
    // });
    traffic1CenterMarker.addListener('mouseover',function(){
      traffic1CenterWindow.open(map, traffic1CenterMarker);
    });
    traffic1CenterMarker.addListener('mouseout',function(){
      traffic1CenterWindow.close(map, traffic1CenterMarker);
    });
    
    var traffic5CenterMarker = new google.maps.Marker({
      position: {lat: latTraffic5Sum/traffic5Sum, lng: lngTraffic5Sum/traffic5Sum},
      map: map,
      title: "全時間帯別の到達エリア面積の~5時間重心地",
      icon: icons["land"].icon
    });
    var traffic5CenterWindow = setTextContent("到達エリア面積の~5時間重心地", "到達エリア面積~5時間の重心地");
    traffic5CenterMarker.addListener('mouseover',function(){
      traffic5CenterWindow.open(map, traffic5CenterMarker);
    });
    traffic5CenterMarker.addListener('mouseout',function(){
      traffic5CenterWindow.close(map, traffic5CenterMarker);
    });


    var traffic10CenterMarker = new google.maps.Marker({
      position: {lat: latTraffic10Sum/traffic10Sum, lng: lngTraffic10Sum/traffic10Sum},
      map: map,
      title: "全時間帯別の到達エリア面積の~10時間重心地",
      icon: icons["land"].icon
    });
    var traffic10CenterWindow = setTextContent("到達エリア面積の~10時間重心地", "到達エリア面積~10時間の重心地");
    traffic10CenterMarker.addListener('mouseover',function(){
      traffic10CenterWindow.open(map, traffic10CenterMarker);
    });
    traffic10CenterMarker.addListener('mouseout',function(){
      traffic10CenterWindow.close(map, traffic10CenterMarker);
    });


    var forestCenterMarker = new google.maps.Marker({
      position: {lat: latForestSum/forestSum, lng: lngForestSum/forestSum},
      map: map,
      title: "森林面積の重心地",
      icon: icons["land"].icon
    });
    var forestCenterWindow = setTextContent("森林面積の重心地", "森林面積の重心地");
    forestCenterMarker.addListener('mouseover',function(){
      forestCenterWindow.open(map, forestCenterMarker);
    });
    forestCenterMarker.addListener('mouseout',function(){
      forestCenterWindow.close(map, forestCenterMarker);
    });


    var adminiCenterMarker = new google.maps.Marker({
      position: {lat: latAdminiSum/adminiSum, lng: lngAdminiSum/adminiSum},
      map: map,
      title: "財政力指数の重心地",
      icon: icons["culture"].icon
    });
    var adminiCenterWindow = setTextContent("行政基盤 財政力指数の重心地", "財政力指数の重心地");
    adminiCenterMarker.addListener('mouseover',function(){
      adminiCenterWindow.open(map, adminiCenterMarker);
    });
    adminiCenterMarker.addListener('mouseout',function(){
      adminiCenterWindow.close(map, adminiCenterMarker);
    });


    var museumCenterMarker = new google.maps.Marker({
      position: {lat: latMuseumSum/museumSum, lng: lngMuseumSum/museumSum},
      map: map,
      title: "博物館数の重心地",
      icon: icons["culture"].icon
    });
    var museumCenterWindow = setTextContent("人口100万人当たりの博物館数指標値の重心地", "博物館数の重心地");
    museumCenterMarker.addListener('mouseover',function(){
      museumCenterWindow.open(map, museumCenterMarker);
    });
    museumCenterMarker.addListener('mouseout',function(){
      museumCenterWindow.close(map, museumCenterMarker);
    });

    var vacantCenterMarker = new google.maps.Marker({
      position: {lat: latVacantSum/vacantSum, lng: lngVacantSum/vacantSum},
      map: map,
      title: "空き家比率の重心地",
      icon: icons["culture"].icon
    });
    var vacantCenterWindow = setTextContent("空き家比率（対総住宅数）の重心地", "空き家比率の重心地");
    vacantCenterMarker.addListener('mouseover',function(){
      vacantCenterWindow.open(map, vacantCenterMarker);
    });
    vacantCenterMarker.addListener('mouseout',function(){
      vacantCenterWindow.close(map, vacantCenterMarker);
    });

    var recyclingCenterMarker = new google.maps.Marker({
      position: {lat: latRecyclingSum/recyclingSum, lng: lngRecyclingSum/recyclingSum},
      map: map,
      title: "ごみのリサイクル率の重心地",
      icon: icons["culture"].icon
    });
    var recyclingCenterWindow = setTextContent("ごみのリサイクル率の重心地", "ごみのリサイクル率の重心地");
    recyclingCenterMarker.addListener('mouseover',function(){
      recyclingCenterWindow.open(map, recyclingCenterMarker);
    });
    recyclingCenterMarker.addListener('mouseout',function(){
      recyclingCenterWindow.close(map, recyclingCenterMarker);
    });

    var landfillCenterMarker = new google.maps.Marker({
      position: {lat: latLandfillSum/landfillSum, lng: lngLandfillSum/landfillSum},
      map: map,
      title: "ごみ埋立率の重心地",
      icon: icons["culture"].icon
    });
    var landfillCenterWindow = setTextContent("ごみ埋立率の重心地", "ごみ埋立率の重心地");
    landfillCenterMarker.addListener('mouseover',function(){
      landfillCenterWindow.open(map, landfillCenterMarker);
    });
    landfillCenterMarker.addListener('mouseout',function(){
      landfillCenterWindow.close(map, landfillCenterMarker);
    });

    var finallandfillCenterMarker = new google.maps.Marker({
      position: {lat: latFinalLandfillSum/finallandfillSum, lng: lngFinalLandfillSum/finallandfillSum},
      map: map,
      title: "最終処分場残余容量の重心地",
      icon: icons["culture"].icon
    });
    var finallandfillCenterWindow = setTextContent("最終処分場残余容量の重心地", "最終処分場残余容量の重心地");
    finallandfillCenterMarker.addListener('mouseover',function(){
      finallandfillCenterWindow.open(map, finallandfillCenterMarker);
    });
    finallandfillCenterMarker.addListener('mouseout',function(){
      finallandfillCenterWindow.close(map, finallandfillCenterMarker);
    });

    var retailstoreCenterMarker = new google.maps.Marker({
      position: {lat: latRetailstoreSum/retailstoreSum, lng: lngRetailstoreSum/retailstoreSum},
      map: map,
      title: "小売店数の重心地",
      icon: icons["store"].icon
    });
    var retailstoreCenterWindow = setTextContent("小売店数（人口千人当たり）の重心地", "小売店数の重心地");
    retailstoreCenterMarker.addListener('mouseover',function(){
      retailstoreCenterWindow.open(map, retailstoreCenterMarker);
    });
    retailstoreCenterMarker.addListener('mouseout',function(){
      retailstoreCenterWindow.close(map, retailstoreCenterMarker);
    });

    var largeretailstoreCenterMarker = new google.maps.Marker({
      position: {lat: latLargeRetailstoreSum/largeretailstoreSum, lng: lngLargeRetailstoreSum/largeretailstoreSum},
      map: map,
      title: "大型小売店数の重心地",
      icon: icons["store"].icon
    });
    var largeretailstoreCenterWindow = setTextContent("大型小売店数（人口10万人当たり）の重心地", "大型小売店数の重心地");
    largeretailstoreCenterMarker.addListener('mouseover',function(){
      largeretailstoreCenterWindow.open(map, largeretailstoreCenterMarker);
    });
    largeretailstoreCenterMarker.addListener('mouseout',function(){
      largeretailstoreCenterWindow.close(map, largeretailstoreCenterMarker);
    });

    var departmentCenterMarker = new google.maps.Marker({
      position: {lat: latDepartmentSum/departmentSum, lng: lngDepartmentSum/departmentSum},
      map: map,
      title: "百貨店，総合スーパー数の重心地",
      icon: icons["store"].icon
    });
    var departmentCenterWindow = setTextContent("百貨店，総合スーパー数（人口10万人当たり）の重心地", "百貨店，総合スーパー数の重心地");
    departmentCenterMarker.addListener('mouseover',function(){
      departmentCenterWindow.open(map, departmentCenterMarker);
    });
    departmentCenterMarker.addListener('mouseout',function(){
      departmentCenterWindow.close(map, departmentCenterMarker);
    });

    var convenienceCenterMarker = new google.maps.Marker({
      position: {lat: latCconvenienceSum/convenienceSum, lng: lngConvenienceSum/convenienceSum},
      map: map,
      title: "コンビニエンスストア数の重心地",
      icon: icons["store"].icon
    });
    var convenienceCenterWindow = setTextContent("コンビニエンスストア数（人口10万人当たり）の重心地", "コンビニエンスストア数の重心地");
    convenienceCenterMarker.addListener('mouseover',function(){
      convenienceCenterWindow.open(map, convenienceCenterMarker);
    });
    convenienceCenterMarker.addListener('mouseout',function(){
      convenienceCenterWindow.close(map, convenienceCenterMarker);
    });

    var restaurantCenterMarker = new google.maps.Marker({
      position: {lat: latRestaurantSum/restaurantSum, lng: lngRestaurantSum/restaurantSum},
      map: map,
      title: "飲食店数の重心地",
      icon: icons["store"].icon
    });
    var restaurantCenterWindow = setTextContent("飲食店数（人口千人当たり）の重心地", "飲食店数の重心地");
    restaurantCenterMarker.addListener('mouseover',function(){
      restaurantCenterWindow.open(map, restaurantCenterMarker);
    });
    restaurantCenterMarker.addListener('mouseout',function(){
      restaurantCenterWindow.close(map, restaurantCenterMarker);
    });

    var bathhouseCenterMarker = new google.maps.Marker({
      position: {lat: latBathhouseSum/bathhouseSum, lng: lngBathhouseSum/bathhouseSum},
      map: map,
      title: "公衆浴場数の重心地",
      icon: icons["store"].icon
    });
    var bathhouseCenterWindow = setTextContent("公衆浴場数（人口10万人当たり）の重心地", "公衆浴場数の重心地");
    bathhouseCenterMarker.addListener('mouseover',function(){
      bathhouseCenterWindow.open(map, bathhouseCenterMarker);
    });
    bathhouseCenterMarker.addListener('mouseout',function(){
      bathhouseCenterWindow.close(map, bathhouseCenterMarker);
    });

    var municipalroadCenterMarker = new google.maps.Marker({
      position: {lat: latMunicipalRoadSum/municipalroadSum, lng: lngMunicipalRoadSum/municipalroadSum},
      map: map,
      title: "市町村道舗装率の重心地",
      icon: icons["land"].icon
    });
    var municipalroadCenterWindow = setTextContent("市町村道舗装率（対市町村道実延長）の重心地", "市町村道舗装率の重心地");
    municipalroadCenterMarker.addListener('mouseover',function(){
      municipalroadCenterWindow.open(map, municipalroadCenterMarker);
    });
    municipalroadCenterMarker.addListener('mouseout',function(){
      municipalroadCenterWindow.close(map, municipalroadCenterMarker);
    });

    var urbanparkareaCenterMarker = new google.maps.Marker({
      position: {lat: latUrbanparkAreaSum/urbanparkareaSum, lng: lngUrbanparkAreaSum/urbanparkareaSum},
      map: map,
      title: "都市公園面積の重心地",
      icon: icons["land"].icon
    });
    var urbanparkareaCenterWindow = setTextContent("都市公園面積（人口１人当たり）の重心地", "都市公園面積の重心地");
    urbanparkareaCenterMarker.addListener('mouseover',function(){
      urbanparkareaCenterWindow.open(map, urbanparkareaCenterMarker);
    });
    urbanparkareaCenterMarker.addListener('mouseout',function(){
      urbanparkareaCenterWindow.close(map, urbanparkareaCenterMarker);
    });

    var urbanparkCenterMarker = new google.maps.Marker({
      position: {lat: latUrbanparkSum/urbanparkSum, lng: lngUrbanparkSum/urbanparkSum},
      map: map,
      title: "都市公園数の重心地",
      icon: icons["land"].icon
    });
    var urbanparkCenterWindow = setTextContent("都市公園数(可住地面積100k㎡当たり)の重心地", "都市公園数の重心地");
    urbanparkCenterMarker.addListener('mouseover',function(){
      urbanparkCenterWindow.open(map, urbanparkCenterMarker);
    });
    urbanparkCenterMarker.addListener('mouseout',function(){
      urbanparkCenterWindow.close(map, urbanparkCenterMarker);
    });

    var incomeCenterMarker = new google.maps.Marker({
      position: {lat: latIncomeSum/incomeSum, lng: lngIncomeSum/incomeSum},
      map: map,
      title: "実収入の重心地",
      icon: icons["culture"].icon
    });
    var incomeCenterWindow = setTextContent("実 収 入（１世帯当たり１か月間）の重心地", "実 収 入の重心地");
    incomeCenterMarker.addListener('mouseover',function(){
      incomeCenterWindow.open(map, incomeCenterMarker);
    });
    incomeCenterMarker.addListener('mouseout',function(){
      incomeCenterWindow.close(map, incomeCenterMarker);
    });

    var savingsCenterMarker = new google.maps.Marker({
      position: {lat: latSavingsSum/savingsSum, lng: lngSavingsSum/savingsSum},
      map: map,
      title: "貯蓄現在高の重心地",
      icon: icons["culture"].icon
    });
    var savingsCenterWindow = setTextContent("貯蓄現在高（１世帯当たり）の重心地", "貯蓄現在高の重心地");
    savingsCenterMarker.addListener('mouseover',function(){
      savingsCenterWindow.open(map, savingsCenterMarker);
    });
    savingsCenterMarker.addListener('mouseout',function(){
      savingsCenterWindow.close(map, savingsCenterMarker);
    });

    var securitiesCenterMarker = new google.maps.Marker({
      position: {lat: latSecuritiesSum/securitiesSum, lng: lngSecuritiesSum/securitiesSum},
      map: map,
      title: "有価証券現在高割合の重心地",
      icon: icons["culture"].icon
    });
    var securitiesCenterWindow = setTextContent("有価証券現在高割合（対貯蓄現在高）の重心地", "有価証券現在高割合の重心地");
    securitiesCenterMarker.addListener('mouseover',function(){
      securitiesCenterWindow.open(map, securitiesCenterMarker);
    });
    securitiesCenterMarker.addListener('mouseout',function(){
      securitiesCenterWindow.close(map, securitiesCenterMarker);
    });

    var liabilitiesCenterMarker = new google.maps.Marker({
      position: {lat: latLiabilitiesSum/liabilitiesSum, lng: lngLiabilitiesSum/liabilitiesSum},
      map: map,
      title: "負債現在高の重心地",
      icon: icons["culture"].icon
    });
    var liabilitiesCenterWindow = setTextContent("負債現在高（１世帯当たり）の重心地", "負債現在高の重心地");
    liabilitiesCenterMarker.addListener('mouseover',function(){
      liabilitiesCenterWindow.open(map, liabilitiesCenterMarker);
    });
    liabilitiesCenterMarker.addListener('mouseout',function(){
      liabilitiesCenterWindow.close(map, liabilitiesCenterMarker);
    });

    var automobileCenterMarker = new google.maps.Marker({
      position: {lat: latAutomobileSum/automobileSum, lng: lngAutomobileSum/automobileSum},
      map: map,
      title: "自動車所有数量の重心地",
      icon: icons["have"].icon
    });
    var automobileCenterWindow = setTextContent("自動車所有数量（千世帯当たり）の重心地", "自動車所有数量の重心地");
    automobileCenterMarker.addListener('mouseover',function(){
      automobileCenterWindow.open(map, automobileCenterMarker);
    });
    automobileCenterMarker.addListener('mouseout',function(){
      automobileCenterWindow.close(map, automobileCenterMarker);
    });

    var microwaveCenterMarker = new google.maps.Marker({
      position: {lat: latMicrowaveSum/microwaveSum, lng: lngMicrowaveSum/microwaveSum},
      map: map,
      title: "電子レンジの重心地",
      icon: icons["have"].icon
    });
    var microwaveCenterWindow = setTextContent("電子レンジ所有数量（千世帯当たり）の重心地", "電子レンジの重心地");
    microwaveCenterMarker.addListener('mouseover',function(){
      microwaveCenterWindow.open(map, microwaveCenterMarker);
    });
    microwaveCenterMarker.addListener('mouseout',function(){
      microwaveCenterWindow.close(map, microwaveCenterMarker);
    });

    var conditionerCenterMarker = new google.maps.Marker({
      position: {lat: latConditionerSum/conditionerSum, lng: lngConditionerSum/conditionerSum},
      map: map,
      title: "ルームエアコン所有数量",
      icon: icons["have"].icon
    });
    var conditionerCenterWindow = setTextContent("ルームエアコン所有数量（千世帯当たり）の重心地", "ルームエアコン所有数量");
    conditionerCenterMarker.addListener('mouseover',function(){
      conditionerCenterWindow.open(map, conditionerCenterMarker);
    });
    conditionerCenterMarker.addListener('mouseout',function(){
      conditionerCenterWindow.close(map, conditionerCenterMarker);
    });

    var smartphoneCenterMarker = new google.maps.Marker({
      position: {lat: latSmartphoneSum/smartphoneSum, lng: lngSmartphoneSum/smartphoneSum},
      map: map,
      title: "スマートフォン所有数量の重心地",
      icon: icons["have"].icon
    });
    var smartphoneCenterWindow = setTextContent("スマートフォン所有数量（千世帯当たり）の重心地", "スマートフォン所有数量の重心地");
    smartphoneCenterMarker.addListener('mouseover',function(){
      smartphoneCenterWindow.open(map, smartphoneCenterMarker);
    });
    smartphoneCenterMarker.addListener('mouseout',function(){
      smartphoneCenterWindow.close(map, smartphoneCenterMarker);
    });


    var computerCenterMarker = new google.maps.Marker({
      position: {lat: latComputerSum/computerSum, lng: lngComputerSum/computerSum},
      map: map,
      title: "パソコン所有数量の重心地",
      icon: icons["have"].icon
    });
    var computerCenterWindow = setTextContent("パソコン所有数量（千世帯当たり）の重心地", "パソコン所有数量の重心地");
    computerCenterMarker.addListener('mouseover',function(){
      computerCenterWindow.open(map, computerCenterMarker);
    });
    computerCenterMarker.addListener('mouseout',function(){
      computerCenterWindow.close(map, computerCenterMarker);
    });

    var firestationCenterMarker = new google.maps.Marker({
      position: {lat: latFirestationSum/firestationSum, lng: lngFirestationSum/firestationSum},
      map: map,
      title: "消防署数の重心地",
      icon: icons["culture"].icon
    });
    var firestationCenterWindow = setTextContent("消防署数(可住地面積100k㎡当たり)の重心地", "消防署数の重心地");
    firestationCenterMarker.addListener('mouseover',function(){
      firestationCenterWindow.open(map, firestationCenterMarker);
    });
    firestationCenterMarker.addListener('mouseout',function(){
      firestationCenterWindow.close(map, firestationCenterMarker);
    });

    var firefighterCenterMarker = new google.maps.Marker({
      position: {lat: latFirefighterSum/firefighterSum, lng: lngFirefighterSum/firefighterSum},
      map: map,
      title: "消防吏員数の重心地",
      icon: icons["culture"].icon
    });
    var firefighterCenterWindow = setTextContent("消防吏員数（人口10万人当たり）の重心地", "消防吏員数の重心地");
    firefighterCenterMarker.addListener('mouseover',function(){
      firefighterCenterWindow.open(map, firefighterCenterMarker);
    });
    firefighterCenterMarker.addListener('mouseout',function(){
      firefighterCenterWindow.close(map, firefighterCenterMarker);
    });

    var firefireCenterMarker = new google.maps.Marker({
      position: {lat: latFirefireSum/firefireSum, lng: lngFirefireSum/firefireSum},
      map: map,
      title: "火災出火件数の重心地",
      icon: icons["culture"].icon
    });
    var firefireCenterWindow = setTextContent("火災出火件数（人口10万人当たり）の重心地", "火災出火件数の重心地");
    firefireCenterMarker.addListener('mouseover',function(){
      firefireCenterWindow.open(map, firefireCenterMarker);
    });
    firefireCenterMarker.addListener('mouseout',function(){
      firefireCenterWindow.close(map, firefireCenterMarker);
    });

    var buildingfireCenterMarker = new google.maps.Marker({
      position: {lat: latBuildingfireSum/buildingfireSum, lng: lngBuildingfireSum/buildingfireSum},
      map: map,
      title: "建物火災出火件数の重心地",
      icon: icons["culture"].icon
    });
    var buildingfireCenterWindow = setTextContent("建物火災出火件数（人口10万人当たり）の重心地", "建物火災出火件数の重心地");
    buildingfireCenterMarker.addListener('mouseover',function(){
      buildingfireCenterWindow.open(map, buildingfireCenterMarker);
    });
    buildingfireCenterMarker.addListener('mouseout',function(){
      buildingfireCenterWindow.close(map, buildingfireCenterMarker);
    });

    var trafficaccidentCenterMarker = new google.maps.Marker({
      position: {lat: latTrafficaccidentSum/trafficaccidentSum, lng: lngTrafficaccidentSum/trafficaccidentSum},
      map: map,
      title: "交通事故発生件数の重心地",
      icon: icons["culture"].icon
    });
    var trafficaccidentCenterWindow = setTextContent("交通事故発生件数（人口10万人当たり）の重心地", "交通事故発生件数の重心地");
    trafficaccidentCenterMarker.addListener('mouseover',function(){
      trafficaccidentCenterWindow.open(map, trafficaccidentCenterMarker);
    });
    trafficaccidentCenterMarker.addListener('mouseout',function(){
      trafficaccidentCenterWindow.close(map, trafficaccidentCenterMarker);
    });

    var policestationCenterMarker = new google.maps.Marker({
      position: {lat: latPolicestationSum/policestationSum, lng: lngPolicestationSum/policestationSum},
      map: map,
      title: "警察署・交番・駐在所数の重心地",
      icon: icons["culture"].icon
    });
    var policestationCenterWindow = setTextContent("警察署・交番・駐在所数(可住地面積100k㎡当たり)の重心地", "警察署・交番・駐在所数の重心地");
    policestationCenterMarker.addListener('mouseover',function(){
      policestationCenterWindow.open(map, policestationCenterMarker);
    });
    policestationCenterMarker.addListener('mouseout',function(){
      policestationCenterWindow.close(map, policestationCenterMarker);
    });

    var policemanCenterMarker = new google.maps.Marker({
      position: {lat: latPolicemanSum/policemanSum, lng: lngPolicemanSum/policemanSum},
      map: map,
      title: "警察官数の重心地",
      icon: icons["culture"].icon
    });
    var policemanCenterWindow = setTextContent("警察官数（人口千人当たり）の重心地", "警察官数の重心地");
    policemanCenterMarker.addListener('mouseover',function(){
      policemanCenterWindow.open(map, policemanCenterMarker);
    });
    policemanCenterMarker.addListener('mouseout',function(){
      policemanCenterWindow.close(map, policemanCenterMarker);
    });

    var pollutionCenterMarker = new google.maps.Marker({
      position: {lat: latPollutionSum/pollutionSum, lng: lngPollutionSum/pollutionSum},
      map: map,
      title: "公害苦情件数の重心地",
      icon: icons["culture"].icon
    });
    var pollutionCenterWindow = setTextContent("公害苦情件数（人口10万人当たり）の重心地", "公害苦情件数の重心地");
    pollutionCenterMarker.addListener('mouseover',function(){
      pollutionCenterWindow.open(map, pollutionCenterMarker);
    });
    pollutionCenterMarker.addListener('mouseout',function(){
      pollutionCenterWindow.close(map, pollutionCenterMarker);
    });

    var btnCenter = document.getElementById('center');
    btnCenter.onclick = function() {
      if(icons["center"].view == true){
        centerMarker.setMap(null);
        peopleCenterMarker.setMap(null);
        prefproCenterMarker.setMap(null);
        icons["center"].view = false;
      } else {
        centerMarker.setMap(map);
        peopleCenterMarker.setMap(map);
        prefproCenterMarker.setMap(map);
        icons["center"].view = true;
      }
    }



  }
  httpObj.send(null);  
}*/

function setData(){
  data = {
    center: { title: "重心地", text: "土地の重心地", latSum: 0, lngSum: 0, sum: 0 },
    people: { title: "人口重心地", text: "人口の重心地", latSum: 0, lngSum: 0, sum: 0 },
    prefpro: { title: "県内総生産重心地", text: "県内総生産の重心地", latSum: 0, lngSum: 0, sum: 0 },
    // quake: { title: "震度５弱以上を観測した地震の県重心地重心地", text: "震度５弱以上の地震が発生した重心地", latSum: 0, lngSum: 0, sum: 0 },
    traffic1: { title: "到達エリア面積の~1時間重心地", text: "到達エリア面積~1時間の重心地", latSum: 0, lngSum: 0, sum: 0 },
    traffic5: { title: "到達エリア面積の~5時間重心地", text: "到達エリア面積~5時間の重心地", latSum: 0, lngSum: 0, sum: 0 },
    traffic10: { title: "到達エリア面積の~10時間重心地", text: "到達エリア面積~10時間の重心地", latSum: 0, lngSum: 0, sum: 0 },
    forest: { title: "森林面積の重心地", text: "森林面積の重心地", latSum: 0, lngSum: 0, sum: 0 },
    admini: { title: "行政基盤 財政力指数の重心地", text: "財政力指数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    museum: { title: "人口100万人当たりの博物館数指標値の重心地", text: "博物館数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    vacant: { title: "空き家比率（対総住宅数）の重心地", text: "空き家比率の重心地", latSum: 0, lngSum: 0, sum: 0 },
    recycling: { title: "ごみのリサイクル率の重心地", text: "ごみのリサイクル率の重心地", latSum: 0, lngSum: 0, sum: 0 },
    landfill: { title: "ごみ埋立率の重心地", text: "ごみ埋立率の重心地", latSum: 0, lngSum: 0, sum: 0 },
    finallandfill: { title: "最終処分場残余容量の重心地", text: "最終処分場残余容量の重心地", latSum: 0, lngSum: 0, sum: 0 },
    retailstore: { title: "小売店数（人口千人当たり）の重心地", text: "小売店数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    largeretailstore: { title: "大型小売店数（人口10万人当たり）の重心地", text: "大型小売店数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    department: { title: "百貨店，総合スーパー数（人口10万人当たり）の重心地", text: "百貨店，総合スーパー数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    convenience: { title: "コンビニエンスストア数（人口10万人当たり）の重心地", text: "コンビニエンスストア数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    restaurant: { title: "飲食店数（人口千人当たり）の重心地", text: "飲食店数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    bathhouse: { title: "公衆浴場数（人口10万人当たり）の重心地", text: "公衆浴場数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    municipalroad: { title: "市町村道舗装率（対市町村道実延長）の重心地", text: "市町村道舗装率の重心地", latSum: 0, lngSum: 0, sum: 0 },
    urbanparkarea: { title: "都市公園面積（人口１人当たり）の重心地", text: "都市公園面積の重心地", latSum: 0, lngSum: 0, sum: 0 },
    urbanpark: { title: "都市公園数(可住地面積100k㎡当たり)の重心地", text: "都市公園数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    income: { title: "実収入（１世帯当たり１か月間）の重心地", text: "実収入の重心地", latSum: 0, lngSum: 0, sum: 0 },
    savings: { title: "貯蓄現在高（１世帯当たり）の重心地", text: "貯蓄現在高の重心地", latSum: 0, lngSum: 0, sum: 0 },
    securities: { title: "有価証券現在高割合（対貯蓄現在高）の重心地", text: "有価証券現在高割合の重心地", latSum: 0, lngSum: 0, sum: 0 },
    liabilities: { title: "負債現在高（１世帯当たり）の重心地", text: "負債現在高の重心地", latSum: 0, lngSum: 0, sum: 0 },
    automobile: { title: "自動車所有数量（千世帯当たり）の重心地", text: "自動車所有数量の重心地", latSum: 0, lngSum: 0, sum: 0 },
    microwave: { title: "電子レンジ所有数量（千世帯当たり）の重心地", text: "電子レンジの重心地", latSum: 0, lngSum: 0, sum: 0 },
    conditioner: { title: "ルームエアコン所有数量（千世帯当たり）の重心地", text: "ルームエアコン所有数量", latSum: 0, lngSum: 0, sum: 0 },
    smartphone: { title: "スマートフォン所有数量（千世帯当たり）の重心地", text: "スマートフォン所有数量の重心地", latSum: 0, lngSum: 0, sum: 0 },
    computer: { title: "パソコン所有数量（千世帯当たり）の重心地", text: "パソコン所有数量の重心地", latSum: 0, lngSum: 0, sum: 0 },
    firestation: { title: "消防署数(可住地面積100k㎡当たり)の重心地", text: "消防署数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    firefighter: { title: "消防吏員数（人口10万人当たり）の重心地", text: "消防吏員数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    firefire: { title: "火災出火件数（人口10万人当たり）の重心地", text: "火災出火件数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    buildingfire: { title: "建物火災出火件数（人口10万人当たり）の重心地", text: "建物火災出火件数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    trafficaccident: { title: "交通事故発生件数（人口10万人当たり）の重心地", text: "交通事故発生件数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    policestation: { title: "警察署・交番・駐在所数(可住地面積100k㎡当たり)の重心地", text: "警察署・交番・駐在所数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    policeman: { title: "警察官数（人口千人当たり）の重心地", text: "警察官数の重心地", latSum: 0, lngSum: 0, sum: 0 },
    pollution: { title: "公害苦情件数（人口10万人当たり）の重心地", text: "公害苦情件数の重心地", latSum: 0, lngSum: 0, sum: 0 }
  };
}

//アイコン画像の設定
function setIcon(){
  iconBase = '/assets/img/mapicon/';
  icons = {
    prefecture: {
      icon: iconBase + 'prefecture.png',
      view: true
    },
    center: {
      icon: iconBase + 'center.png',
      view: true
    },
    land: {
      icon: iconBase + 'land.png',
      view: true
    },
    culture: {
      icon: iconBase + 'culture.png',
      view: true
    },
    store: {
      icon: iconBase + 'store.png',
      view: true
    },
    have: {
      icon: iconBase + 'have.png',
      view: true
    }
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
