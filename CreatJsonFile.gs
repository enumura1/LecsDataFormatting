//データ取得
function fetchData(faculty) {
  //書き込みシート
  const sheet = SpreadsheetApp.openById("14Tu3h4hfHlT1Db8DaFzgVyQ4bmpuLmLzeAs30QyNCUU");
  //出力先
  const gasTestFolder = '1EC7yF9Y-PDDHTkmDNqjTVoraqKZV949W';
  //学部ごとに実行させる
  const sheetName = sheet.getSheetByName(faculty);

  //行（横軸）と列（縦軸）の最大数を取得
  let maxRow = sheetName.getLastRow();
  let maxColumn = sheetName.getLastColumn();

  //JSON用のkey
  let keys = [];
  //データ格納
  let data = [];

  //１行目の'時間割所属'～'教室名'をjsonのkeyとして取得
  for (let x = 1; x <= maxColumn; x++) {
    keys.push(sheetName.getRange(1, x).getValue());
  }

  //列方向に2行目以下~シート書き込み最後最後の行までを取得
  for (let y = 2; y <= maxRow; y++) {
    let json = {};
    for (let x = 1; x <= maxColumn; x++) {
      json[keys[x-1]] = sheetName.getRange(y, x).getValue();
    }
    //データ格納
    data.push(json);
  }

  //整形してテキスト
  addedJsonData = JSON.stringify(data, null, '\t');
  console.log(addedJsonData);

  createJsonFile(gasTestFolder, addedJsonData, faculty);
}


function createJsonFile(gasTestFolder, contents, faculty) {  
  const contentType = 'application/json';
  // 文字コード
  const charset = 'UTF-8';
  // 出力先
  const folder = DriveApp.getFolderById(gasTestFolder);
  // Blob NOTE:出力後のJSONファイルをダウンロードした際に'facluty.json'となる　例：法文.json
  const blobData = Utilities.newBlob('', contentType, faculty).setDataFromString(contents, charset);
  // ファイルに保存
  folder.createFile(blobData);
}


//学部ごとのJSONファイル出力
function arangeEachFaclty(){
  let facltyArray = ['法文','教育','総合理工','生物資源','人間科学','教養教育','人文科学','総合理工（博士後期）',
  '教育学（教職）','自然科学','人間社会科学', '教育学'];

  facltyArray.map(function(value){
    fetchData(value)
  })  
}


