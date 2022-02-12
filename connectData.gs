//教室配当表データ格納配列
let haitou_data_array = [];

//授業科目一覧の全データ格納先
let kamokuItiranData_array = [];

//正規表現：日本語
function checkJapaneseFormat (word) {
    let retval_japaneseFormat = word.search(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]/);
    return retval_japaneseFormat
}

//正規表現：大文字英語
function checkUpperEnglishWord (word) {
  let retval_upperEnglishWord = word.search(/^[A-Z]/);
  return retval_upperEnglishWord
}

//正規表現：空白(全角半角)
function check_full_half_blank (word) {
  let retval_full_half_blank = word.search(/\s+/g);
  return retval_full_half_blank
}

//正規表現：カンマ
function checkComma(word) {
  let retval_comma = word.search(/,/);
  return retval_comma;
}

//正規表現：・ 
function checkDot (word) {
  let retval_dot = word.search(/・/g);
  return retval_dot
}

//全角(英数字)→半角に変換
function wordFormatFullTohalf (word) {
  //半角
  let retval_halfWord = word.replace(/[！-～]/g,
    function(word) {
      //コード値を0xFEE0分シフト
      return String.fromCharCode( word.charCodeAt(0)-0xFEE0);
    }
  );
  return retval_halfWord;
}

//教室配当表データ関数
function read_haitoudata () {

  const spreadSheet_id_haitou = SpreadsheetApp.openById("1ReU89JFjy6PKBhH9NNW6FMaCxUPtGzCTJQhsroP0CPU");
  const sheetName = spreadSheet_id_haitou.getSheetByName("データ一覧");
  let countRow = sheetName.getLastRow();
  
  for (let step = 2; step < countRow+1; step++) {
    //曜日・時限
    let day_periodTimeCell = sheetName.getSheetValues(step,1,1,1);
    let day_periodTime = day_periodTimeCell[0][0];

    //科目名
    let is_subjectBlank = sheetName.getRange(step,2).isBlank();
    let subjectCell = sheetName.getSheetValues(step,2,1,1);
    let subjectValue_0 =subjectCell[0][0];
    let subjectValue_1 = '';
    if(is_subjectBlank==false){
      subjectValue_1 = subjectValue_0;
    }

    //空白チェック
    let blankExistence =check_full_half_blank(subjectValue_1);
    //日本語チェック
    let japaneseFormat=checkJapaneseFormat(subjectValue_1);
    //大文字英語チェック
    let upperEnglishWord = checkUpperEnglishWord(subjectValue_1);

    //『、「、英語文字あり
    let subjectValue_2 = '';
    let subjectValue_3 = '';
    //日本語の有無
    if(japaneseFormat != 0 ) {
      //先頭が大文字英語→先頭文字以外を取り出し
      if(upperEnglishWord != -1){
        subjectValue_2 = subjectValue_1.slice(1);
        //空白チェック
        if(blankExistence != -1) {
          subjectValue_3=subjectValue_2.replace(/\s+/g, '');
        }else{
          subjectValue_3=subjectValue_2;
        }
      //先頭が「、『 →　先頭と最後以外を取り出し
      }else{
        let ii = subjectValue_1.slice(1);
        subjectValue_2 = ii.slice(0,-1);
        //空白チェック
        if(blankExistence != -1) {
          subjectValue_3=subjectValue_2.replace(/\s+/g, '');
        }else{
          subjectValue_3=subjectValue_2;
        }
      }
    }else{
      subjectValue_2 = subjectValue_1;
      if(blankExistence != -1) {
        subjectValue_3=subjectValue_2.replace(/\s+/g, '');
      }else{
        subjectValue_3=subjectValue_2;
      }
    }

    //Ⅰ,Ⅱ,Ⅲ → 1,2,3で入れ替え
    let subject = changeSymbolToNumber(subjectValue_3);

    //担当
    let is_tantouBlank = sheetName.getRange(step,3).isBlank();
    let tantouCell = sheetName.getSheetValues(step,3,1,1);
    let tantouValue_0 = tantouCell[0][0];
    let tantouValue_1 = '';
    //空白セルかどうか
    if(is_tantouBlank==false){
      tantouValue_1 = tantouValue_0;
    }

    //空白(全角半角)チェック
    let full_half_blank = check_full_half_blank(tantouValue_1);
    //カンマチェック
    let comma = checkComma(tantouValue_1);
    //日本語チェック
    let japaneseFormat_tantou=checkJapaneseFormat(tantouValue_1);

    let tantouValue_2 = '';
    let tantouValue_3 = '';
    let tantou = '';

    //先頭大文字英語、〇、＊(全角)、*(全角)
    if (japaneseFormat_tantou != 1) {
       tantouValue_2 = tantouValue_1.slice(1);
      //全角半角空白あり
      if (full_half_blank != -1){
        tantouValue_3 = tantouValue_2.replace(/\s+/g, '');
        // , あり
        if(comma != -1) {
           tantou = tantouValue_3.replace(/,/g,'');
        }else {
           tantou = tantouValue_3;
        }
      //全角半角空白無し
      }else{
        tantouValue_3 = tantouValue_2;
        // , あり
        if(comma != -1) {
           tantou = tantouValue_3.replace(/,/g,'');
        }else {
           tantou = tantouValue_3;
        }
      }
    }else{
      tantouValue_2 = tantouValue_1;
      //全角半角空白あり
      if (full_half_blank != -1){
         tantouValue_3 = tantouValue_2.replace(/\s+/g, '');
        // ,あり
        if(comma != -1) {
           tantou = tantouValue_3.replace(/,/g,'');
        }else {
           tantou = tantouValue_3;
        }
      //全角半角空白無し
      }else{
         tantouValue_3 = tantouValue_2;
        // , あり
        if(comma != -1) {
           tantou = tantouValue_3.replace(/,/g,'');
        }else {
           tantou = tantouValue_3;
        }
      }
    }

    //棟名
    let buildingCell = sheetName.getSheetValues(step,6,1,1);
    let buildingName = buildingCell[0][0];

    //教室名
    let classroomCell = sheetName.getSheetValues(step,7,1,1);
    let classroomName = classroomCell[0][0];

    //時間割コード
    let timeCodeCell = sheetName.getSheetValues(step,4,1,1);
    let timeCode = timeCodeCell[0][0];

    //追加配列:[曜日・時限],[科目名],[担当],[棟名],[教室名],[時間割コード]
    let add_haitou_array = [day_periodTime,subject,tantou,buildingName,classroomName,timeCode];
    haitou_data_array.push(add_haitou_array);
    if (step % 100 === 0) {
      console.log(step)
    }
  }

  //関数read_courseItiran_data実行
  read_courseItiran_data()
}

//授業科目一覧データ関数
function read_courseItiran_data () {

  const spreadSheet_id_kamokuItiran = SpreadsheetApp.openById("1ZktPKxYWmSwW89Jl_Ir5FS3QxkpeDJgJ16UzaBRDF1g");
  const gakubuNameArray = ['法文','教育','総合理工','生物資源','人間科学','教養教育','人文科学','総合理工（博士後期）',
  '教育学（教職）','自然科学','人間社会科学', '教育学'];

  //授業科目一覧:zk_●=[[曜日・時限],[科目名],[担当],[行数]]
  let zk_A = []; //法文
  let zk_B = []; //教育
  let zk_C = []; //総合理工
  let zk_D = []; //生物資源
  let zk_E = []; //人間科学
  let zk_F = []; //教養教育
  let zk_G = []; //人文科学
  let zk_H = []; //教育学
  let zk_I = []; //教育学（教職）
  let zk_J = []; //総合理工（博士後期）
  let zk_K = []; //自然科学
  let zk_L = []; //人間社会科学

  for (const gakubu of gakubuNameArray) {
    const sheetNameGakubu = spreadSheet_id_kamokuItiran.getSheetByName(gakubu);
    let countRow_itiran = sheetNameGakubu.getLastRow();
    console.log("シート名：  "+gakubu+' 行数：  '+countRow_itiran)

    for (let step = 2; step < countRow_itiran+1; step++){
      //曜日・時限
      let day_periodTimeCell_course = sheetNameGakubu.getSheetValues(step,4,1,1);
      let day_periodTime_course_0 = day_periodTimeCell_course[0][0]
      let blank_course = check_full_half_blank(day_periodTime_course_0);
      let dot = checkDot(day_periodTime_course_0);

      //空白、・チェック
      let day_periodTime_course_1 = '';
      let day_periodTime_course= '';
      if(blank_course != -1) {
        day_periodTime_course_1 = day_periodTime_course_0.replace(/\s+/g,'');
        //・→,のチェック
        if(dot!=-1){
          day_periodTime_course = day_periodTime_course_1.replace(/・/g,',');
        }else{
          day_periodTime_course = day_periodTime_course_1;
        }
      } else {
        day_periodTime_course = day_periodTime_course_0;
      }
      
      //科目
      let subjectCell_cource = sheetNameGakubu.getSheetValues(step,6,1,1);
      let subject_cource_0 = subjectCell_cource[0][0];
      let subject_cource = changeSymbolToNumber(subject_cource_0);

      //担当
      let tantouCell_cource = sheetNameGakubu.getSheetValues(step,7,1,1);
      let tantouValue_cource_0 = tantouCell_cource[0][0]
      //空白チェック
      let fullHalf_blank_cource = check_full_half_blank(tantouValue_cource_0)
      //カンマ(全角)
      let fullFormatComma = tantouValue_cource_0.search(/，/);
      let tantouValue_cource_1 = '';
      let tantou_cource = '';
      if(fullHalf_blank_cource != -1) {
        //空白を削除
        tantouValue_cource_1 = tantouValue_cource_0.replace(/\s+/g,'');
        // , チェック
        if(fullFormatComma != -1) {
          tantou_cource = tantouValue_cource_1.replace(/，/g,'');
        }else{
          tantou_cource = tantouValue_cource_1
        }
      } else {
        tantouValue_cource_1 = tantouValue_cource_0;
        // , チェック
        if(fullFormatComma != -1) {
          tantou_cource = tantouValue_cource_1.replace(/，/g,'');
        }else{
          tantou_cource = tantouValue_cource_1
        }
      }

      //行数
      let row_cource = step;

      //時間割コード
      let timeCodeCell_cource = sheetNameGakubu.getSheetValues(step,5,1,1);
      let timeCode_corce = timeCodeCell_cource[0][0];

      //追加配列 [曜日・時限,科目名,担当,行数,時間割コード]
      let add_itiran_array = [day_periodTime_course,subject_cource,tantou_cource,row_cource,timeCode_corce];

      if(gakubu == '法文') {
        zk_A.push(add_itiran_array);
      }else if(gakubu == '教育'){
        zk_B.push(add_itiran_array);
      }else if(gakubu == '総合理工'){
        zk_C.push(add_itiran_array);
      }else if(gakubu == '生物資源'){
        zk_D.push(add_itiran_array);
      }else if(gakubu == '人間科学'){
        zk_E.push(add_itiran_array);
      }else if (gakubu =='教養教育'){
        zk_F.push(add_itiran_array);
      }else if (gakubu == '人文科学'){
        zk_G.push(add_itiran_array);
      }else if (gakubu == '教育学'){
        zk_H.push(add_itiran_array);
      }else if (gakubu == '教育学（教職）'){
        zk_I.push(add_itiran_array);
      }else if (gakubu == '総合理工（博士後期）'){
        zk_J.push(add_itiran_array);
      }else if (gakubu == '自然科学') {
        zk_K.push(add_itiran_array);
      }else {
        //人間社会科学
        zk_L.push(add_itiran_array);
      }
  　}
  }

  let gakubu_array = [zk_A,zk_B,zk_C,zk_D,zk_E,zk_F,zk_G,zk_I,zk_J,zk_K,zk_L];
  kamokuItiranData_array.push(gakubu_array)
  //writing_GakubuData関数の実行
  writing_GakubuData(kamokuItiranData_array)
}

//データの書き込み関数
function writing_GakubuData (i) {
  console.log("writing_GakubuData関数実行")
  //gakubu_info = gakubu_array
  let gakubu_info = i[0];
  const ssId_kamokuItiran = SpreadsheetApp.openById("1ZktPKxYWmSwW89Jl_Ir5FS3QxkpeDJgJ16UzaBRDF1g");
  
  //departmentCategory = zk_A(法文)・・に相当
  for (const departmentCategory of gakubu_info) {
    //行数
    let itiran_countRow = departmentCategory.length;
    console.log("要素数："+itiran_countRow) 
    let sh2_write = '';

    //TODO：6分でタイムアウトする←4行の'教育学'ファイルをあえて適宜選択し処理を軽くする必要あり
    if(itiran_countRow == 260){
      sh2_write = ssId_kamokuItiran.getSheetByName('法文');
      console.log('法文')
    }else if(itiran_countRow ==351) {
      sh2_write = ssId_kamokuItiran.getSheetByName('教育');
      console.log('教育')
    }else if (itiran_countRow ==449) {
      sh2_write = ssId_kamokuItiran.getSheetByName('総合理工');
      console.log('総合理工')
    }else if(itiran_countRow ==178) {
      sh2_write = ssId_kamokuItiran.getSheetByName('生物資源');
      console.log('生物資源')
    }else if(itiran_countRow ==86) {
      sh2_write = ssId_kamokuItiran.getSheetByName('人間科学');
      console.log('人間科学')
    }else if (itiran_countRow ==385) {
      sh2_write = ssId_kamokuItiran.getSheetByName('教養教育');
      console.log('教養教育')
    }else if(itiran_countRow == 70) {
      sh2_write = ssId_kamokuItiran.getSheetByName('人文科学');
      console.log('人文科学')
    }else if(itiran_countRow == 26) {
      sh2_write = ssId_kamokuItiran.getSheetByName('総合理工（博士後期）');
      console.log('総合理工（博士後期）')
    }else if(itiran_countRow == 29) {
      sh2_write = ssId_kamokuItiran.getSheetByName('教育学（教職）');
      console.log('教育学（教職）')
    }else if (itiran_countRow == 277) {
      sh2_write = ssId_kamokuItiran.getSheetByName('自然科学');
      console.log('自然科学')
    }else if(itiran_countRow == 95) {
      sh2_write = ssId_kamokuItiran.getSheetByName('人間社会科学');
      console.log('人間社会科学')
    }else if(itiran_countRow == 3){
      sh2_write = ssId_kamokuItiran.getSheetByName('教育学');
      console.log('教育学')
    }

    for (let step = 0; step < itiran_countRow; step++) {
      let classData = departmentCategory[step]; 
      //曜日・時限
      let j_youbi = classData[0]; 
      //科目名
      let j_kamoku = classData[1]; 
      //担当
      let j_tantou = classData[2]; 
      //行数
      let j_gyou = classData[3]; 
      //時間割コード
      let j_zikanwariCode = classData[4]; 
      
      for (const iter of haitou_data_array) {
        //曜日・時限
        let k_youbi = iter[0];
        //科目名
        let k_kamoku = iter[1];
        //担当
        let k_tantou = iter[2];
        //練名
        let k_ren = iter[3];
        //教室名
        let k_class=iter[4];
        //時間割コード
        let k_zikanwariCode = iter[5];

        //時間割コード&&曜日・時限 もしくは　時間割コード&&担当 の一致
        if(((j_zikanwariCode == k_zikanwariCode) && (j_youbi== k_youbi))
            ||((j_zikanwariCode == k_zikanwariCode) &&(j_tantou==k_tantou))) {
            let w_ren_cell = sh2_write.getRange(j_gyou,8,1,1);
            w_ren_cell.setValue(k_ren);
            let w_kamoku_cell = sh2_write.getRange(j_gyou,9,1,1);
            w_kamoku_cell.setValue(k_class);
            departmentCategory.slice(step,1)
        }else{
          //授業科目の一致
          if(j_kamoku == k_kamoku && j_youbi==k_youbi) {
            let w_ren_cell = sh2_write.getRange(j_gyou,8,1,1);
            w_ren_cell.setValue(k_ren);
            let w_kamoku_cell = sh2_write.getRange(j_gyou,9,1,1);
            w_kamoku_cell.setValue(k_class);
            departmentCategory.slice(step,1)
          }else{
            //担当名 && 曜日
            if(j_tantou == k_tantou && j_youbi==k_youbi){
              let w_ren_cell = sh2_write.getRange(j_gyou,8,1,1);
              w_ren_cell.setValue(k_ren);
              let w_kamoku_cell = sh2_write.getRange(j_gyou,9,1,1);
              w_kamoku_cell.setValue(k_class);
              departmentCategory.slice(step,1)
            }
          }
        }
      }
    }
  }
}