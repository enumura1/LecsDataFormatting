//シート１のセル内のデータを行ごとに分割し配列を生成
function removeLineBreaks(cellData) {
  console.log('cellData:  '+cellData)
  let splitedByLine = cellData.split('\n');
  console.log('splitedByLine'+splitedByLine)
  return splitedByLine;
}

//メイン関数
function outputLectureRoomData() {
  //★スプレッドシートIDを入力してください
  const ss = SpreadsheetApp.openById("10imou14gogxT5Vx0Om_Y26ZQf_T6v0kU_saH6u4uEc4");
  //★シート名を入力してください
  let sh = ss.getSheetByName("シート1");
  // 配当表シート1の行数
  let roomAmount = sh.getLastRow();
  // 配当表シート1の列数
  let lengthOfColumn = 27;
  // 全データを補完する変数
  let allData = [];
  // 教室配当表から得られる講義データの初期化
  let lectureData = [];
  const days = ["月", "火", "水", "木", "金"];

  for(let j=3; j<roomAmount+3; j++){

  // 教養＋大学ホール
  if(j<=23){
    //建物名
    let buildingName = sh.getRange(j, 1).getValue();
    //部屋名
    let roomName = sh.getRange(j, 2).getValue();
    let numberOfDays = -1;

    for(let i=3; i<lengthOfColumn+1; i++){
      //lecturedataの初期化
      lectureData = [];
      // 曜日の計算
      let time1 = ((i-3)%5)*2+1;
      let time2 = ((i-3)%5)*2+2;
      
      (i-3)%5==0 ? numberOfDays++ :false;
      let lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
      lectureData.push(lectureTime);

      //１セル内の授業データ
      let cellData = sh.getRange(j, i).getValue();
      console.log('cellData1:'+cellData)
      let shapedData = removeLineBreaks(cellData);
        if(shapedData.length == 1) {
          for(let i=0; i<3; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 2) {
          for(let i=0; i<2; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 3) {
          shapedData.push('')
        }else if(shapedData.length == 4) {
          shapedData[0] = shapedData[0]+shapedData[1];
          shapedData.splice( 1, 1 );
          shapedData.push('')
          console.log('4つ:  '+shapedData)
        }
      shapedData.map(x => lectureData.push(x));

      // 講義データを集約
      lectureData.push(buildingName);
      lectureData.push(roomName);
      allData.push(lectureData);
    }
  }

  // 法文棟
  else if(j<=34){
    //建物名
    let buildingName = sh.getRange(j, 1).getValue();
    //部屋名
    let roomName = sh.getRange(j, 2).getValue();
    let numberOfDays = -1;

  for(let i=3; i<lengthOfColumn+1; i++){
      //lecturedataの初期化
      lectureData = [];
      // 曜日の計算
      let time1 = ((i-3)%5)*2+1;
      let time2 = ((i-3)%5)*2+2;
      
      (i-3)%5==0 ? numberOfDays++ :false;
      let lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
      lectureData.push(lectureTime);

      //１セル内の授業データ
      let cellData = sh.getRange(j, i).getValue();
      let shapedData = removeLineBreaks(cellData);
        if(shapedData.length == 1) {
          for(let i=0; i<3; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 2) {
          for(let i=0; i<2; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 3) {
          shapedData.push('')
        }else if(shapedData.length == 4) {
          shapedData[0] = shapedData[0]+shapedData[1];
          shapedData.splice( 1, 1 );
          shapedData.push('')
          console.log('4つ:  '+shapedData)
        }
      shapedData.map(x => lectureData.push(x));

      // 講義データを集約
      lectureData.push(buildingName);
      lectureData.push(roomName);
      allData.push(lectureData);
    }
  }

  // 教育学部棟
  else if(j<=44){
    //建物名
    let buildingName = sh.getRange(j, 1).getValue();
    //部屋名
    let roomName = sh.getRange(j, 2).getValue();
    let numberOfDays = -1;

    for(let i=3; i<lengthOfColumn+1; i++){
      //lecturedataの初期化
      lectureData = [];
      // 曜日の計算
      let time1 = ((i-3)%5)*2+1;
      let time2 = ((i-3)%5)*2+2;
      
      (i-3)%5==0 ? numberOfDays++ :false;
      let lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
      lectureData.push(lectureTime);

      //１セル内の授業データ
      let cellData = sh.getRange(j, i).getValue();
      let shapedData = removeLineBreaks(cellData);
        if(shapedData.length == 1) {
          for(let i=0; i<3; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 2) {
          for(let i=0; i<2; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 3) {
          shapedData.push('')
        }else if(shapedData.length == 4) {
          shapedData[0] = shapedData[0]+shapedData[1];
          shapedData.splice( 1, 1 );
          shapedData.push('')
          console.log('4つ:  '+shapedData)
        }
      shapedData.map(x => lectureData.push(x));

      // 講義データを集約
      lectureData.push(buildingName);
      lectureData.push(roomName);
      allData.push(lectureData);
    }
  }

  //生物資源1
  else if(j<=61){
    //建物名
    let buildingName = sh.getRange(j, 1).getValue();
    //部屋名
    let roomName = sh.getRange(j, 2).getValue();
    let numberOfDays = -1;

    for(let i=3; i<lengthOfColumn+1; i++){
      //lecturedataの初期化
      lectureData = [];
      // 曜日の計算
      let time1 = ((i-3)%5)*2+1;
      let time2 = ((i-3)%5)*2+2;
      
      (i-3)%5==0 ? numberOfDays++ :false;
      let lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
      lectureData.push(lectureTime);

      //１セル内の授業データ
      let cellData = sh.getRange(j, i).getValue();
      let shapedData = removeLineBreaks(cellData);
        if(shapedData.length == 1) {
          for(let i=0; i<3; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 2) {
          for(let i=0; i<2; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 3) {
          shapedData.push('')
        }else if(shapedData.length == 4) {
          shapedData[0] = shapedData[0]+shapedData[1];
          shapedData.splice( 1, 1 );
          shapedData.push('')
          console.log('4つ:  '+shapedData)
        }
      shapedData.map(x => lectureData.push(x));

      // 講義データを集約
      lectureData.push(buildingName);
      lectureData.push(roomName);
      allData.push(lectureData);
    }
  }

  //総合理工
  else {
    //建物名
    let buildingName = sh.getRange(j, 1).getValue();
    //部屋名
    let roomName = sh.getRange(j, 2).getValue();
    let numberOfDays = -1;

    for(let i=3; i<lengthOfColumn+1; i++){
      //lecturedataの初期化
      lectureData = [];
      // 曜日の計算
      let time1 = ((i-3)%5)*2+1;
      let time2 = ((i-3)%5)*2+2;
      
      (i-3)%5==0 ? numberOfDays++ :false;
      let lectureTime = days[numberOfDays] + time1 + "," + days[numberOfDays] + time2;
      lectureData.push(lectureTime);

      //１セル内の授業データ
      let cellData = sh.getRange(j, i).getValue();
      let shapedData = removeLineBreaks(cellData);
        if(shapedData.length == 1) {
          for(let i=0; i<3; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 2) {
          for(let i=0; i<2; i++){
            shapedData.push('')
          }
        }else if(shapedData.length == 3) {
          shapedData.push('')
        }else if(shapedData.length == 4) {
          shapedData[0] = shapedData[0]+shapedData[1];
          shapedData.splice( 1, 1 );
          shapedData.push('')
          console.log('4つ:  '+shapedData)
        }
      shapedData.map(x => lectureData.push(x));

      // 講義データを集約
      lectureData.push(buildingName);
      lectureData.push(roomName);
      allData.push(lectureData);
    }
  }
}
  Logger.log(allData);

  console.log('途中経過')

  //データ一覧シートにセット
  sh = ss.getSheetByName("データ一覧");
  for(i=1; i<allData.length+1; i++){
    for(j=1; j<8;j++){
      sh.getRange(i+1, j).setValue(allData[i-1][j-1]);
    }
  }

}