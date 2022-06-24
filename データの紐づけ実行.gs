//教室配当表データ格納配列
let haitou_data_array = [];

//授業科目一覧の全データ格納先
let kamokuItiranData_array = [];

//練、教室の書き込み
function writeRenAndClassData(sh2_write,departmentCategory,j_gyou,haitouRen,haitouClass,step) {
  let w_ren_cell = sh2_write.getRange(j_gyou,8,1,1);
  w_ren_cell.setValue(haitouRen);
  let w_kamoku_cell = sh2_write.getRange(j_gyou,9,1,1);
  w_kamoku_cell.setValue(haitouClass);
  departmentCategory.slice(step,1)
}

//教室配当表データ関数
function read_haitoudata (faclty) {
  const spreadSheet_id_haitou = SpreadsheetApp.openById("10imou14gogxT5Vx0Om_Y26ZQf_T6v0kU_saH6u4uEc4");
  const sheetName = spreadSheet_id_haitou.getSheetByName("データ一覧");
  let countRow = sheetName.getLastRow();
  
  for (let step =1; step < 1300; step++) {
    //曜日・時限
    let day_periodTimeCell = sheetName.getSheetValues(step,1,1,1);
    let day_periodTime = day_periodTimeCell[0][0];

    //科目名
    let is_subjectBlank = sheetName.getRange(step,2).isBlank();
    let subjectCell = sheetName.getSheetValues(step,2,1,1);
    let subjectValue_0 =subjectCell[0][0];
    let subjectValue_1;
    is_subjectBlank==false ? subjectValue_1 = subjectValue_0:subjectValue_1='';

    //I、IIなど→１、２に変換
    let toNumber = changeSymbolToNumber(subjectValue_1);
    //全角中点のチェック
    let tyutenExistence = checkTyuten(toNumber)
    //全角コロンのチェック
    let koronExistence = checkTyuten(toNumber)

    let removedTyuten;
    let removedKoron;
    
    //中点、全角コロンを除く処理
    tyutenExistence != -1 ? removedTyuten = toNumber.replace(/・/g, '･'):removedTyuten = toNumber;
    koronExistence != -1 ? removedKoron = toNumber.replace(/：/g, ':'):removedKoron = removedTyuten;

    //空白チェック
    let blankExistence =checkBlank(removedKoron);
    //日本語チェック
    let japaneseFormat=checkJapaneseFormat(removedKoron);
    //大文字英語チェック
    let upperEnglishWord = checkUpperEnglishWord(removedKoron);

    //『、「、英語文字あり
    let subjectValue_2 = '';
    let subjectValue_3 = '';
    //日本語の有無
    if(japaneseFormat != 0 ) {
      //先頭が大文字英語→先頭文字以外を取り出し
      if(upperEnglishWord != -1){
        subjectValue_2 = removedKoron.slice(1);
        //空白チェック
        if(blankExistence != -1) {
          subjectValue_3=subjectValue_2.replace(/\s+/g, '');
        }else{
          subjectValue_3=subjectValue_2;
        }
      //先頭が「、『 →　先頭と最後以外を取り出し
      }else{
        let ii = removedKoron.slice(1);
        subjectValue_2 = ii.slice(0,-1);
        //空白チェック
        if(blankExistence != -1) {
          subjectValue_3=subjectValue_2.replace(/\s+/g, '');
        }else{
          subjectValue_3=subjectValue_2;
        }
      }
    }else{
      subjectValue_2 = removedKoron;
      if(blankExistence != -1) {
        subjectValue_3=subjectValue_2.replace(/\s+/g, '');
      }else{
        subjectValue_3=subjectValue_2;
      }
    }

    //全角英語,数字→半角に統一
    let unifiedStyle = wordFormatFullTohalf(subjectValue_3);
    //Ⅰ,Ⅱ,Ⅲ → 1,2,3で入れ替え
    let subject = changeSymbolToNumber(unifiedStyle)

    //担当
    let is_tantouBlank = sheetName.getRange(step,3).isBlank();
    let tantouCell = sheetName.getSheetValues(step,3,1,1);
    let tantouValue_0 = tantouCell[0][0];
    let tantouValue_1 = '';

    //空白セルかどうか
    is_tantouBlank==false　? tantouValue_1 = tantouValue_0:false;
    //空白(全角半角)チェック
    let full_half_blank = checkBlank(tantouValue_1);
    //カンマチェック
    let comma = tantouValue_1.search(/，/);
    //日本語チェック
    let japaneseFormat_tantou=checkJapaneseFormat(tantouValue_1);

    let firstCharacter = '';
    let removedSpace = '';
    let deletedComma= ''
    let tantou = '';

    //先頭大文字英語、〇、＊(全角)、*(全角)チェック
    if (japaneseFormat_tantou != 1) {
       firstCharacter = tantouValue_1.slice(1);
      //全角半角空白あり
      if (full_half_blank != -1){
        removedSpace = firstCharacter.replace(/\s+/g, '');
        // , あり
        if(comma != -1) {
          deletedComma = removedSpace.replace(/，/g,'');
          //半角カタカナの有無チェック
          isHankakuKana(deletedComma) == true ? tantou = katakanaSizeHalfToFull(deletedComma):tantou =deletedComma;
        }else {
          //半角カタカナの有無チェック
          isHankakuKana(deletedComma) == true ? tantou = katakanaSizeHalfToFull(removedSpace):tantou =removedSpace;
        }
      //全角半角空白無し
      }else{
        removedSpace = firstCharacter;
        // , あり
        if(comma != -1) {
          deletedComma = removedSpace.replace(/，/g,'');
          //半角カタカナの有無チェック
          isHankakuKana(deletedComma) == true ? tantou = katakanaSizeHalfToFull(deletedComma):tantou =deletedComma;
        }else {
          //半角カタカナの有無チェック
          isHankakuKana(deletedComma) == true ? tantou = katakanaSizeHalfToFull(removedSpace):tantou =removedSpace;
        }
      }
    }else{
      firstCharacter = tantouValue_1;
      //全角半角空白あり
      if (full_half_blank != -1){
         removedSpace = firstCharacter.replace(/\s+/g, '');
        // ,あり
        if(comma != -1) {
          deletedComma = removedSpace.replace(/，/g,'');
          //半角カタカナの有無チェック
          isHankakuKana(deletedComma) == true ? tantou = katakanaSizeHalfToFull(deletedComma):tantou =deletedComma;
        }else {
          //半角カタカナの有無チェック
          isHankakuKana(deletedComma) == true ? tantou = katakanaSizeHalfToFull(removedSpace):tantou =removedSpace;
        }
      //全角半角空白無し
      }else{
         removedSpace = firstCharacter;
        // , あり
        if(comma != -1) {
          deletedComma = removedSpace.replace(/，/g,'');
          //半角カタカナの有無チェック
          isHankakuKana(deletedComma) == true ? tantou = katakanaSizeHalfToFull(deletedComma):tantou =deletedComma;
        }else {
          //半角カタカナの有無チェック
          isHankakuKana(deletedComma) == true ? tantou = katakanaSizeHalfToFull(removedSpace):tantou =removedSpace;
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
  }

  //関数read_courseItiran_data実行
  read_courseItiran_data(faclty)
}

//授業科目一覧データ関数
function read_courseItiran_data (faclty) {
  const spreadSheet_id_kamokuItiran = SpreadsheetApp.openById("14Tu3h4hfHlT1Db8DaFzgVyQ4bmpuLmLzeAs30QyNCUU");
  const gakubuNameArray = [faclty];

  //授業科目一覧:zk_●=[[曜日・時限],[科目名],[担当],[行数]]
  let zk_A = []; //法文

  for (const gakubu of gakubuNameArray) {
    const sheetNameGakubu = spreadSheet_id_kamokuItiran.getSheetByName(gakubu);
    let countRow_itiran = sheetNameGakubu.getLastRow();
    console.log("シート名：  "+gakubu+' 行数：  '+countRow_itiran)

    for (let step = 2; step < countRow_itiran+1; step++){
      //曜日・時限
      let day_periodTimeCell_course = sheetNameGakubu.getSheetValues(step,4,1,1);
      let day_periodTime_course_0 = day_periodTimeCell_course[0][0]
      let blank_course = checkBlank(day_periodTime_course_0);
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
      //全角中点、コロンのチェック
      let is_tyuten = checkTyuten(subject_cource_0)
      let is_koron = checkTyuten(subject_cource_0)

      let chekcedTyuten;
      let chekcedKoron;
      //全角中点、コロンを除く処理
      is_tyuten != -1 ? chekcedTyuten = subject_cource_0.replace(/・/g, '･'):chekcedTyuten = subject_cource_0;
      is_koron != -1 ? chekcedKoron = subject_cource_0.replace(/：/g, ':'):chekcedKoron = chekcedTyuten;

      //全角英語,数字→半角に統一
      let checkedHankaku = wordFormatFullTohalf(chekcedKoron);
      let subject_cource = changeSymbolToNumber(checkedHankaku);

      //担当
      let tantouCell_cource = sheetNameGakubu.getSheetValues(step,7,1,1);
      let tantouCourceValue = tantouCell_cource[0][0];
      let resizedKatakana = '';

      //半角カタカナの有無チェック
      isHankakuKana(tantouCourceValue) == true ? resizedKatakana = katakanaSizeHalfToFull(tantouCourceValue):resizedKatakana =tantouCourceValue;

      //空白チェック
      let fullHalf_blank_cource = checkBlank(resizedKatakana);

      //カンマ(全角)
      let fullFormatComma = resizedKatakana.search(/，/);
      let tantouValue_cource_1 = '';
      let tantou_cource = '';

      if(fullHalf_blank_cource != -1) {
        //空白を削除
        tantouValue_cource_1 = resizedKatakana.replace(/\s+/g,'');
        // , チェック
        if(fullFormatComma != -1) {
          tantou_cource = tantouValue_cource_1.replace(/，/g,'');
        }else{
          tantou_cource = tantouValue_cource_1
        }
      } else {
        tantouValue_cource_1 = resizedKatakana;
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

      zk_A.push(add_itiran_array);
  　}
  }

  let gakubu_array = [zk_A];
  kamokuItiranData_array.push(gakubu_array)
  //writing_GakubuData関数の実行
  writing_GakubuData(kamokuItiranData_array,faclty)
}

//データの書き込み関数
function writing_GakubuData (i,faclty) {
  console.log("writing_GakubuData関数実行")
  //gakubu_info = gakubu_array
  let gakubu_info = i[0];
  const ssId_kamokuItiran = SpreadsheetApp.openById("14Tu3h4hfHlT1Db8DaFzgVyQ4bmpuLmLzeAs30QyNCUU");
  
  //departmentCategory = zk_A(法文)・・に相当
  for (const departmentCategory of gakubu_info) {
    //行数
    let itiran_countRow = departmentCategory.length;
    let sh2_write = ssId_kamokuItiran.getSheetByName(faclty);

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
        let haitouYoubi = iter[0];
        //科目名
        let haitouKamoku = iter[1];
        //担当
        let haitouTantou = iter[2];
        //練名
        let haitouRen = iter[3];
        //教室名
        let haitouClass=iter[4];
        //時間割コード
        let haitouZikanwariCode = iter[5];

        //第二外国語科目の一致
        let is_foreign = foreignLanguage(sh2_write,departmentCategory,j_youbi,haitouYoubi,j_gyou,j_kamoku,haitouKamoku,haitouRen,
        haitouClass,j_tantou,haitouTantou,step);

        //TODO:汎用性がゼロ
        j_kamoku=='機械・電気電子工学実験1' && haitouKamoku == '機械・電気電子工学実験1' ? 
        writeRenAndClassData(sh2_write,departmentCategory,j_gyou,haitouRen,haitouClass,step):false;
        
        //第二外国語でない場合
        if(is_foreign == false) {
          //講義データに担当者名がない場合
          if(j_tantou == ''||j_tantou ==undefined || j_tantou==null ){
            if(j_youbi==haitouYoubi && j_kamoku == haitouKamoku) { writeRenAndClassData(sh2_write,departmentCategory,j_gyou,haitouRen,
            haitouClass,step)}
          }else{
            //時間割コードの一致
            if(j_zikanwariCode == haitouZikanwariCode){
              writeRenAndClassData(sh2_write,departmentCategory,j_gyou,haitouRen,haitouClass,step)
              //書き込んだ講義の時間割コードが一致しているかを確認
              checkTimetableCode(j_zikanwariCode,haitouZikanwariCode)
            }else{
              //(担当名 && 曜日) &&　(授業科目&& 曜日))　の一致
              if((j_tantou == haitouTantou && j_youbi==haitouYoubi) && (j_kamoku == haitouKamoku && j_youbi==haitouYoubi)) {
                writeRenAndClassData(sh2_write,departmentCategory,j_gyou,haitouRen,haitouClass,step)
                //書き込んだ講義の時間割コードが一致しているかを確認
                checkTimetableCode(j_zikanwariCode,haitouZikanwariCode)
              }else{
                //授業科目の一致 && 曜日の一致　←TODO：教養を実行する際は担当者も追加(英語○○の区別のため)
                if((j_kamoku == haitouKamoku) &&(j_youbi==haitouYoubi)&&(j_tantou == haitouTantou)){
                  writeRenAndClassData(sh2_write,departmentCategory,j_gyou,haitouRen,haitouClass,step)
                  //書き込んだ講義の時間割コードが一致しているかを確認
                  checkTimetableCode(j_zikanwariCode,haitouZikanwariCode)
                }else{
                  //失敗
                }
              }
            }
          }
        }        
      }
    }
  }
}