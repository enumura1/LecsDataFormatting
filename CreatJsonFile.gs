//ダウンロードダイヤログ表示
function toJSON() {
  //ダイヤログテンプレート読み込み
  let dl_html = HtmlService.createTemplateFromFile("dl_dialog").evaluate();

  //ダイヤログ表示
  SpreadsheetApp.getUi().showModalDialog(dl_html, "JSONファイルをダウンロード");
}

//データ取得
function getData() {
  //データ取得するシート（現在開いているシートを指定）
  let sheet = SpreadsheetApp.getActiveSheet();

  //行（横軸）と列（縦軸）の最大数を取得
  let maxRow = sheet.getLastRow();
  let maxColumn = sheet.getLastColumn();

  //JSON用のkey
  let keys = [];

  //データ格納配列
  let data = [];

  //2行目のkeyの名前取得
  //1行目は管理しやすいよう日本語で記述し、
  //JSON用のラベルは2行目で指定しているため
  //【getRange】の第1引数は【2】
  for (var x = 1; x <= maxColumn; x++) {
    keys.push(sheet.getRange(2, x).getValue());
  }

  //データの取得
  //実際のデータが3行目からなので【y = 3】から開始
  for (var y = 3; y <= maxRow; y++) {
    let json = {};
    for (var x = 1; x <= maxColumn; x++) {
      json[keys[x-1]] = sheet.getRange(y, x).getValue();
    }
    
    //データ格納
    data.push(json);
  }

  //整形してテキストにします
  return JSON.stringify(data, null, '\t');  
}


//スプレッドシート読み込み時に実行
function onOpen() {
  //メニューバーにJSON出力用メニューを追加
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let entries = [{
    name : "JSONで出力",
    functionName : "toJSON"
  }];
  spreadsheet.addMenu("JSON", entries);
};