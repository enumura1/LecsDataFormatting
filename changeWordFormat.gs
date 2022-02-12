//全角(英数字)→半角に変換
function wordFormatFullTohalf (word) {
  //半角
  let retval_halfWord = word.replace(/[！-～]/g,
    function(word) {
      //コード値を0xFEE0シフト
      return String.fromCharCode( word.charCodeAt(0)-0xFEE0);
    }
  );
  return retval_halfWord;
}

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

//文字末尾(186),(62)等の消去
function checkLastNumber (word) {
  word=wordFormatFullTohalf(word);
  let wordNameIdou = word.search('移動');
  let wordNameKotei = word.search('固定');
  let wordNameKai = word.search('階');

  //後ろから５文字
  let lastFiveword = word.slice(-5);
  //数字３文字　例(186)
  let threeNumbers = lastFiveword.slice(1,4);
  //数字２文字　例(62)
  let twoNumbers = lastFiveword.slice(2,4);
  //数字１文字チェック  例(8)
  let oneNumbers = lastFiveword.slice(3,4);
  let checkThreeNumbers = threeNumbers.match(/^[0-9]+$/);
  let checkTwoNumbers = twoNumbers.match(/^[0-9]+$/);
  let checkOneNumers = oneNumbers.match(/^[0-9]+$/);
  let retval_word='';

  if(checkThreeNumbers != null){
    if(wordNameIdou!=-1){
      retval_word = word.replace('移動','');
    }else{
      retval_word = word;
    }
    if(wordNameKotei!=-1){
      retval_word = retval_word.replace('固定','');
    }else{
      retval_word = retval_word;
    }
    if(wordNameKai!=-1){
      retval_word=retval_word;
    }else{
      retval_word = retval_word.slice(0,-5);
    }
    return retval_word
  }else if (checkTwoNumbers != null) {
    if(wordNameIdou!=-1){
      retval_word = word.replace('移動','');
    }else{
      retval_word = word;
    }
    if(wordNameKotei!=-1){
      retval_word = retval_word.replace('固定','');
    }else{
      retval_word = retval_word;
    }
    if(wordNameKai!=-1){
      retval_word=retval_word;
    }else{
      retval_word=retval_word.slice(0,-4);
    }
    console.log(retval_word)
    return retval_word
  }else if(checkOneNumers!= null){
    if(wordNameIdou!=-1){
      retval_word = word.replace('移動','');
    }else{
      retval_word = word;
    }
    if(wordNameKotei!=-1){
      retval_word = retval_word.replace('固定','');
    }else{
      retval_word = retval_word;
    }
    if(wordNameKai!=-1){
      retval_word=retval_word;
    }else{
      retval_word=retval_word.slice(0,-3);
    }
    console.log(retval_word)
    return retval_word
  }else{
    retval_word=word;
    return retval_word
  }
}

//Ⅰ,Ⅱ,Ⅲ など→1,2,3に変換
function changeSymbolToNumber (word) {
  let retval_1 = word.search('Ⅰ');
  let retval_1_1 = word.search('I');
  let retval_1_2 = word.search('Ｉ');
  let retval_2 = word.search('Ⅱ');
  let retval_2_1 = word.search('II');
  let retval_3 = word.search('Ⅲ');
  let retval_3_1 = word.search('III');
  let retval_4 = word.search('IV');
  let retval_4_1 = word.search('Ⅳ');
  let retval_5 = word.search('Ⅴ');
  let retval_6 ='';
  
  if(retval_5 != -1) {
    retval_6 = word.replace('Ⅴ','5');
    return retval_6
  }else if(retval_4 != -1){
    retval_6 = word.replace('IV','4');
    return retval_6
  }else if(retval_4_1 != -1){
    retval_6 = word.replace('Ⅳ','4');
    return retval_6
  }else if(retval_3 != -1) {
    retval_6 = word.replace('Ⅲ','3');
    return retval_6
  }else if(retval_3_1 != -1) {
    retval_6 = word.replace('III','3');
    return retval_6
  }else if(retval_2 != -1) {
    retval_6 = word.replace('Ⅱ','2');
    return retval_6
  }else if(retval_2_1 != -1) {
    retval_6 = word.replace('II','2');
    return retval_6
  }else if(retval_1 != -1) {
    retval_6 = word.replace('Ⅰ','1');
    return retval_6
  }else if(retval_1_1 != -1) {
    retval_6 = word.replace('I','1');
    return retval_6
  }else if(retval_1_2 != -1) {
    retval_6 = word.replace('Ｉ','1');
    return retval_6
  }else{
    retval_6 = word;
    return retval_6
  }
}


//教室配当表
function classTable_changeSmbol() {
  const spreadSheet_id_haitou = SpreadsheetApp.openById("1ReU89JFjy6PKBhH9NNW6FMaCxUPtGzCTJQhsroP0CPU");
  const sheetName = spreadSheet_id_haitou.getSheetByName("データ一覧");
  let countRow = sheetName.getLastRow();

  for (let step = 1170; step < countRow+1; step++) {
    //科目
    let is_subjectBlank = sheetName.getRange(step,2).isBlank();
    let subjectCell = sheetName.getSheetValues(step,2,1,1);
    let subjectValue_0 =subjectCell[0][0];
    let subjectValue_1 = '';
    if(is_subjectBlank==false){
      subjectValue_1 = subjectValue_0;
    }

    //日本語チェック
    let japaneseFormat=checkJapaneseFormat(subjectValue_1);
    //大文字英語チェック
    let upperEnglishWord = checkUpperEnglishWord(subjectValue_1);

    //『、「、英語文字あり
    let subjectValue_2 = '';
    //日本語の有無
    if(japaneseFormat != 0 ) {
      //先頭が大文字英語→先頭文字以外を取り出し
      if(upperEnglishWord != -1){
        subjectValue_2 = subjectValue_1.slice(1);
      //先頭が「、『 →　先頭と最後以外を取り出し
      }else{
        let ii = subjectValue_1.slice(1);
        subjectValue_2 = ii.slice(0,-1);
      }
    }else{
      subjectValue_2 = subjectValue_1;
    }

    //Ⅰ,Ⅱ,Ⅲ → 1,2,3
    let subjectValue_3 = changeSymbolToNumber(subjectValue_2);
    //全角→半角
    let subject = wordFormatFullTohalf(subjectValue_3);

    //棟
    let buildingCell = sheetName.getSheetValues(step,12,1,1);
    let tmp_buildingName =buildingCell[0][0];
    let buildingName=checkLastNumber(tmp_buildingName);

    //教室
    let classroomCell = sheetName.getSheetValues(step,13,1,1);
    let tmp_classroomNameValue =classroomCell[0][0];
    let classroomNameValue=checkLastNumber(tmp_classroomNameValue);
    console.log(step+'行：'+classroomNameValue)

    let writeNameCell = sheetName.getRange(step,2);
    writeNameCell.setValue(subject);
    let writebuildingCell = sheetName.getRange(step,6);
    writebuildingCell.setValue(buildingName);
    let writeclassroomCell = sheetName.getRange(step,7);
    writeclassroomCell.setValue(classroomNameValue);
  }
}


//授業科目一覧
function courceList_changeSymbol() {
  const spreadSheet_id_kamokuItiran = SpreadsheetApp.openById("1ZktPKxYWmSwW89Jl_Ir5FS3QxkpeDJgJ16UzaBRDF1g");
  const gakubuNameArray = ['法文','教育','総合理工','生物資源','人間科学','教養教育','人文科学','総合理工（博士後期）',
  '教育学（教職）','自然科学','人間社会科学', '教育学'];

  for (const gakubu of gakubuNameArray) {
    const sheetNameGakubu = spreadSheet_id_kamokuItiran.getSheetByName(gakubu);
    let countRow_itiran = sheetNameGakubu.getLastRow();
    console.log("シート名：  "+gakubu+' 行数：  '+countRow_itiran)

    for (let step = 2; step < countRow_itiran+1; step++){
      //科目
      let subjectCell_cource = sheetNameGakubu.getSheetValues(step,6,1,1);
      let subject_cource_0 = subjectCell_cource[0][0];

      //Ⅰ,Ⅱ,Ⅲ → 1,2,3
      let subject_cource_1 = changeSymbolToNumber(subject_cource_0); 
      //全角→半角
      let subject_cource = wordFormatFullTohalf(subject_cource_1);

      //学部判別
      if(gakubu == '法文') {
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if(gakubu == '教育'){
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if(gakubu == '総合理工'){
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if(gakubu == '生物資源'){
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if(gakubu == '人間科学'){
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if (gakubu =='教養教育'){
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if (gakubu == '人文科学'){
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if (gakubu == '教育学'){
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if (gakubu == '教育学（教職）'){
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if (gakubu == '総合理工（博士後期）'){
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else if (gakubu == '自然科学') {
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);
      }else {
        //人間社会科学
        let writeNameCell = sheetNameGakubu.getRange(step,6);
        writeNameCell.setValue(subject_cource);     
      }
  　}
  }
}

