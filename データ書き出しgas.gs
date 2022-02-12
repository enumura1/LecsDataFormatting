function outputLectureRoomData() {
// L: 法文
// S: 総理
// F: 
// H: 教育
// A: 生物資源

// 4~71: 4
// 72~80: 1
// 81~116: 4
// 117~138: 2
// 139~154: 4
// 155~180: 2
//★スプレッドシートIDを入力してください
const ss = SpreadsheetApp.openById("1ReU89JFjy6PKBhH9NNW6FMaCxUPtGzCTJQhsroP0CPU");

//★シート名を入力してください
let sh = ss.getSheetByName("シート1");

// 部屋数の計算
let roomAmount = (86-2)/4 + (130-86)/4 + (170-130)/4 + (238-170)/4 + (301-238)/4 ;

// シートの列の幅
let lengthOfColumn = 27;

// 全データを補完する変数
let allData = [];
const days = ["月", "火", "水", "木", "金"];
 // 教室配当表から得られる講義データの初期化
 let lectureData = [];

 for(var j=0; j<roomAmount; j++){
  // 教養＋大学ホール
  if(j<=(86-2)/4){
  //建物と部屋の名前を取得
  let buildingName = sh.getRange(-1+4*(j+1), 1).getValue();
  let roomName = sh.getRange(-1+4*(j+1), 2).getValue();

  var numberOfDays = 0;

  for(var i=0; i<lengthOfColumn-2; i++){

    lectureData = [];

    // 曜日の計算
    let time1 = (i%5)*2+1;
    let time2 = (i%5)*2+2;
    var lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
    if (i%5==4){
      numberOfDays++;
    }

    lectureData.push(lectureTime);
    for(var k=0; k<4; k++){
      lectureData.push(sh.getRange(-1+4*(j+1)+k, i+3).getValue());
    }

    // 講義データを集約
    lectureData.push(buildingName);
    lectureData.push(roomName);
    allData.push(lectureData);
  }
  }

  // 法文棟
  else if(j>(86-2)/4 && j <= (86-2)/4 + (130-86)/4){
        //建物と部屋の名前を取得
  let buildingName = sh.getRange(83+4*(j-(86-2)/4) ,1).getValue();
  let roomName = sh.getRange(83+4*(j-(86-2)/4) ,2).getValue();

  var numberOfDays = 0;

  for(var i=0; i<lengthOfColumn-2; i++){

    lectureData = [];

    // 曜日の計算
    let time1 = (i%5)*2+1;
    let time2 = (i%5)*2+2;
    var lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
    if (i%5==4){
      numberOfDays++;
    }

    lectureData.push(lectureTime);
    for(var k=0; k<4; k++){
      lectureData.push(sh.getRange(83+4*(j-(86-2)/4)+k, i+3).getValue());
    }

    // 講義データを集約
    lectureData.push(buildingName);
    lectureData.push(roomName);
    allData.push(lectureData);
  }
  }

  // 教育学部棟
  else if(j>(86-2)/4 + (130-86)/4 && j <= (86-2)/4 + (130-86)/4 + (170-130)/4){
  //建物と部屋の名前を取得
  let buildingName = sh.getRange(127+4*(j-((86-2)/4 + (130-86)/4)), 1).getValue();
  let roomName = sh.getRange(127+4*(j-((86-2)/4 + (130-86)/4)), 2).getValue();

  var numberOfDays = 0;

  for(var i=0; i<lengthOfColumn-2; i++){

    lectureData = [];

    // 曜日の計算
    let time1 = (i%5)*2+1;
    let time2 = (i%5)*2+2;
    var lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
    if (i%5==4){
      numberOfDays++;
    }

    lectureData.push(lectureTime);
    for(var k=0; k<4; k++){
      lectureData.push(sh.getRange(127+4*(j-((86-2)/4 + (130-86)/4))+k, i+3).getValue());
    }

    // 講義データを集約
    lectureData.push(buildingName);
    lectureData.push(roomName);
    allData.push(lectureData);
  }
  }

  //生物資源1
  else if(j>(86-2)/4 + (130-86)/4 + (170-130)/4 && j <= (86-2)/4 + (130-86)/4 + (170-130)/4 + (238-170)/4){
  //建物と部屋の名前を取得
  let buildingName = sh.getRange(167+4*(j-((86-2)/4 + (130-86)/4 + (170-130)/4)), 1).getValue();
  let roomName = sh.getRange(167+4*(j-((86-2)/4 + (130-86)/4 + (170-130)/4)), 2).getValue();

  var numberOfDays = 0;

  for(var i=0; i<lengthOfColumn-2; i++){

    lectureData = [];

    // 曜日の計算
    let time1 = (i%5)*2+1;
    let time2 = (i%5)*2+2;
    var lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
    if (i%5==4){
      numberOfDays++;
    }

    lectureData.push(lectureTime);
    for(var k=0; k<4; k++){
      lectureData.push(sh.getRange(167+4*(j-((86-2)/4 + (130-86)/4 + (170-130)/4))+k, i+3).getValue());
    }

    // 講義データを集約
    lectureData.push(buildingName);
    lectureData.push(roomName);
    allData.push(lectureData);
  }
  }
  //総合理工
  else {
  //建物と部屋の名前を取得
  let buildingName = sh.getRange(235+4*(j-((86-2)/4 + (130-86)/4 + (170-130)/4 + (238-170)/4)), 1).getValue();
  let roomName = sh.getRange(235+4*(j-((86-2)/4 + (130-86)/4 + (170-130)/4 + (238-170)/4)), 2).getValue();

  var numberOfDays = 0;

  for(var i=0; i<lengthOfColumn-2; i++){

    lectureData = [];

    // 曜日の計算
    let time1 = (i%5)*2+1;
    let time2 = (i%5)*2+2;
    var lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
    if (i%5==4){
      numberOfDays++;
    }

    lectureData.push(lectureTime);
    for(var k=0; k<4; k++){
      lectureData.push(sh.getRange(235+4*(j-((86-2)/4 + (130-86)/4 + (170-130)/4 + (238-170)/4))+k, i+3).getValue());
    }

    // 講義データを集約
    lectureData.push(buildingName);
    lectureData.push(roomName);
    allData.push(lectureData);
  }
  }
}
Logger.log(allData);
sh = ss.getSheetByName("データ一覧");
for(i=1; i<allData.length+1; i++){
  for(j=1; j<8;j++){
    sh.getRange(i+1, j).setValue(allData[i-1][j-1]);
  }
}
}