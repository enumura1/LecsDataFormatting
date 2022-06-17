//シート別授業科目一覧の棟・教室の書き込み率評価(%)
function evaluationWriteRate () {
  const spreadSheet_id_kamokuItiran = SpreadsheetApp.openById("14Tu3h4hfHlT1Db8DaFzgVyQ4bmpuLmLzeAs30QyNCUU");
  const gakubuNameArray = ['法文','教育','総合理工','生物資源','人間科学','教養教育','人文科学','総合理工（博士後期）',
  '教育学（教職）','自然科学','人間社会科学', '教育学'];

  for (const gakubu of gakubuNameArray) {
    console.log("シート名：  "+gakubu)
    const sheetNameGakubu = spreadSheet_id_kamokuItiran.getSheetByName(gakubu);
    let countRow_itiran = sheetNameGakubu.getLastRow();
    let countSubject = 0;
    let countclassRoom = 0;
    let countWritedSubject = 0;
    let countWritedRoom = 0;

    for (let step = 2; step < countRow_itiran+1; step++){
      let subjectCell_cource = sheetNameGakubu.getSheetValues(step,8,1,1);
      let subjectValue_cource = subjectCell_cource[0][0];
      let classRoomCell_cource = sheetNameGakubu.getSheetValues(step,9,1,1);
      let classRoomValue_cource = classRoomCell_cource[0][0];
      if(subjectValue_cource!=''){
        countWritedSubject++;
      }
      if(classRoomValue_cource!=''){
        countWritedRoom++;
      }
      countSubject++;
      countclassRoom++;
    }
    let resultSubject = (countWritedSubject/countSubject)*100;
    let resultclassRoom = (countWritedRoom/countclassRoom)*100;
    console.log('棟：'+resultSubject+'%')
    console.log('教室：'+resultclassRoom+'%')
  }
}